type BillRecord = {
  external_reference: string;
  bill_code: string;
  amount_cents: number;
  donor_name: string;
  donor_email: string;
};

type CallbackRecord = {
  refno: string;
  bill_code: string;
  external_reference: string;
  amount_cents: number;
  status: number;
  reason: string;
  transaction_time: string | null;
};

export type WakafStats = {
  totalAmountCents: number;
  donorCount: number;
};

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && serviceRoleKey ? { url, serviceRoleKey } : null;
}

export function isSupabaseConfigured() {
  return getConfig() !== null;
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const config = getConfig();
  if (!config) throw new Error("Supabase is not configured.");

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.serviceRoleKey,
      ...(config.serviceRoleKey.startsWith("sb_secret_")
        ? {}
        : { Authorization: `Bearer ${config.serviceRoleKey}` }),
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${details}`);
  }

  return response;
}

export async function recordBill(record: BillRecord) {
  await supabaseFetch("wakaf_bills", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(record),
  });
}

export async function getBill(externalReference: string) {
  const query = new URLSearchParams({
    select: "external_reference,bill_code,amount_cents,donor_name,donor_email",
    external_reference: `eq.${externalReference}`,
    limit: "1",
  });
  const response = await supabaseFetch(`wakaf_bills?${query}`);
  const rows = (await response.json()) as BillRecord[];
  return rows[0] ?? null;
}

export type CertificateReceipt = {
  refno: string;
  amount_cents: number;
  transaction_time: string | null;
  received_at: string;
  donor_name: string | null;
};

export async function getCertificateReceipt(
  orderId: string,
  billCode: string,
  refno: string,
): Promise<CertificateReceipt | null> {
  const transactionQuery = new URLSearchParams({
    select: "refno,status,amount_cents,transaction_time,received_at",
    external_reference: `eq.${orderId}`,
    bill_code: `eq.${billCode}`,
    refno: `eq.${refno}`,
    limit: "1",
  });
  const transactionResponse = await supabaseFetch(
    `wakaf_transactions?${transactionQuery}`,
  );
  const transactions = (await transactionResponse.json()) as Array<{
    refno: string;
    status: number;
    amount_cents: number;
    transaction_time: string | null;
    received_at: string;
  }>;
  const transaction = transactions[0];
  if (!transaction || transaction.status !== 1) return null;

  const billQuery = new URLSearchParams({
    select: "donor_name",
    external_reference: `eq.${orderId}`,
    bill_code: `eq.${billCode}`,
    limit: "1",
  });
  const billResponse = await supabaseFetch(`wakaf_bills?${billQuery}`);
  const bills = (await billResponse.json()) as Array<{
    donor_name: string | null;
  }>;

  return {
    refno: transaction.refno,
    amount_cents: transaction.amount_cents,
    transaction_time: transaction.transaction_time,
    received_at: transaction.received_at,
    donor_name: bills[0]?.donor_name ?? null,
  };
}

export async function recordCallback(record: CallbackRecord) {
  await supabaseFetch("rpc/record_wakaf_callback", {
    method: "POST",
    body: JSON.stringify({
      p_refno: record.refno,
      p_bill_code: record.bill_code,
      p_external_reference: record.external_reference,
      p_amount_cents: record.amount_cents,
      p_status: record.status,
      p_reason: record.reason,
      p_transaction_time: record.transaction_time,
    }),
  });
}

// Return only receipt fields; never expose donor details or service credentials.
export async function getPaymentReceipt(orderId: string, billCode: string, refno: string) {
  const query = new URLSearchParams({
    select: "status,amount_cents",
    external_reference: `eq.${orderId}`,
    bill_code: `eq.${billCode}`,
    refno: `eq.${refno}`,
    limit: "1",
  });
  const response = await supabaseFetch(`wakaf_transactions?${query}`);
  const rows = (await response.json()) as Array<{ status: number; amount_cents: number }>;
  return rows[0] ?? null;
}

export async function getWakafStats(): Promise<WakafStats> {
  if (!isSupabaseConfigured()) return { totalAmountCents: 0, donorCount: 0 };

  const response = await supabaseFetch("rpc/get_wakaf_stats", {
    method: "POST",
    body: "{}",
  });
  const rows = (await response.json()) as Array<{
    total_amount_cents: number | string;
    donor_count: number | string;
  }>;
  const stats = rows[0];
  return {
    totalAmountCents: Number(stats?.total_amount_cents ?? 0),
    donorCount: Number(stats?.donor_count ?? 0),
  };
}

export async function checkWakafRateLimit(ipHash: string) {
  const response = await supabaseFetch("rpc/check_wakaf_rate_limit", {
    method: "POST",
    body: JSON.stringify({ p_ip_hash: ipHash, p_limit: 5, p_window_minutes: 10 }),
  });
  return (await response.json()) === true;
}
