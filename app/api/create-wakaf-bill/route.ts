import { createHash, randomUUID } from "node:crypto";
import {
  checkWakafRateLimit,
  isSupabaseConfigured,
  recordBill,
} from "../../../lib/supabase-admin";

export const runtime = "nodejs";

const TOYYIBPAY_CREATE_BILL_URL =
  "https://toyyibpay.com/index.php/api/createBill";
const MIN_AMOUNT_CENTS = 100;
const MAX_AMOUNT_CENTS = 3_000_000;

const donorMessage = `Jazakumullahu khairan kathira

Terima kasih atas sumbangan wakaf anda untuk pembinaan Sekolah Menengah Seri Setia.

Semoga setiap ilmu yang dipelajari, setiap ayat al-Quran yang dibaca dan setiap kebaikan yang lahir daripada sekolah ini menjadi pahala yang terus mengalir buat anda.

Semoga Allah menerima dan memberkati wakaf ini.

Amin`;

export async function POST(request: Request) {
  const secretKey = process.env.TOYYIBPAY_SECRET_KEY;
  const categoryCode = process.env.TOYYIBPAY_CATEGORY_CODE;

  if (!secretKey || !categoryCode) {
    console.error("ToyyibPay environment variables are not configured.");
    return Response.json(
      { error: "Sistem pembayaran sedang dikonfigurasi. Sila cuba lagi nanti." },
      { status: 503 },
    );
  }

  if (isSupabaseConfigured()) {
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
    const clientAddress =
      forwardedFor?.trim() || request.headers.get("x-real-ip") || "unknown";
    const ipHash = createHash("sha256")
      .update(`${secretKey}:${clientAddress}`)
      .digest("hex");
    const isAllowed = await checkWakafRateLimit(ipHash);
    if (!isAllowed) {
      return Response.json(
        { error: "Terlalu banyak percubaan. Sila cuba semula dalam 10 minit." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }
  }

  let amount: unknown;
  let donorName: unknown;
  let donorEmail: unknown;
  let donorPhone: unknown;
  try {
    ({ amount, donorName, donorEmail, donorPhone } = (await request.json()) as {
      amount?: unknown;
      donorName?: unknown;
      donorEmail?: unknown;
      donorPhone?: unknown;
    });
  } catch {
    return Response.json({ error: "Permintaan tidak sah." }, { status: 400 });
  }

  if (
    typeof donorName !== "string" ||
    donorName.trim().length < 2 ||
    donorName.trim().length > 100 ||
    typeof donorEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.trim()) ||
    donorEmail.trim().length > 150 ||
    typeof donorPhone !== "string" ||
    !/^[+\d][\d\s-]{7,19}$/.test(donorPhone.trim())
  ) {
    return Response.json(
      { error: "Maklumat penyumbang tidak lengkap atau tidak sah." },
      { status: 400 },
    );
  }

  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return Response.json({ error: "Jumlah wakaf tidak sah." }, { status: 400 });
  }

  const amountCents = Math.round(amount * 100);
  if (
    amountCents < MIN_AMOUNT_CENTS ||
    amountCents > MAX_AMOUNT_CENTS ||
    Math.abs(amount * 100 - amountCents) > Number.EPSILON
  ) {
    return Response.json(
      {
        error:
          "Jumlah wakaf mestilah antara RM1.00 hingga RM30,000.00 dan maksimum dua tempat perpuluhan.",
      },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || origin).replace(/\/$/, "");
  const externalReference = `WSS${Date.now()}${randomUUID().replaceAll("-", "").slice(0, 8)}`;

  const form = new URLSearchParams({
    userSecretKey: secretKey,
    categoryCode,
    billName: "Wakaf Seri Setia",
    billDescription: "Wakaf pembinaan Sekolah Menengah Seri Setia",
    billPriceSetting: "1",
    billPayorInfo: "1",
    billAmount: String(amountCents),
    billReturnUrl: `${siteUrl}/?payment=complete`,
    billCallbackUrl: `${siteUrl}/api/toyyibpay/callback`,
    billExternalReferenceNo: externalReference,
    billTo: donorName.trim(),
    billEmail: donorEmail.trim(),
    billPhone: donorPhone.trim(),
    billSplitPayment: "0",
    billSplitPaymentArgs: "",
    billPaymentChannel: "0",
    billContentEmail: donorMessage,
  });

  try {
    const response = await fetch(TOYYIBPAY_CREATE_BILL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`ToyyibPay responded with status ${response.status}.`);
    }

    const result = (await response.json()) as Array<{ BillCode?: unknown }>;
    const billCode = result?.[0]?.BillCode;
    if (typeof billCode !== "string" || !/^[A-Za-z0-9_-]+$/.test(billCode)) {
      throw new Error("ToyyibPay did not return a valid bill code.");
    }

    if (isSupabaseConfigured()) {
      await recordBill({
        external_reference: externalReference,
        bill_code: billCode,
        amount_cents: amountCents,
      });
    }

    return Response.json({ paymentUrl: `https://toyyibpay.com/${billCode}` });
  } catch (error) {
    console.error("Unable to create ToyyibPay bill:", error);
    return Response.json(
      { error: "Pembayaran tidak dapat disediakan ketika ini. Sila cuba lagi." },
      { status: 502 },
    );
  }
}
