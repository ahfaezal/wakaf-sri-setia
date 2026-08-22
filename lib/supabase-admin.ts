type BillRecord = {
  external_reference: string;
  bill_code: string;
  amount_cents: number;
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
    select: "external_reference,bill_code,amount_cents",
    external_reference: `eq.${externalReference}`,
    limit: "1",
  });
  const response = await supabaseFetch(`wakaf_bills?${query}`);
  const rows = (await response.json()) as BillRecord[];
  return rows[0] ?? null;
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
