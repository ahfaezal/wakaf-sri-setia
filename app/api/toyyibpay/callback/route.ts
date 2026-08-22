import { createHash, timingSafeEqual } from "node:crypto";
import { getBill, recordCallback } from "../../../../lib/supabase-admin";

export const runtime = "nodejs";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left.toLowerCase());
  const rightBuffer = Buffer.from(right.toLowerCase());
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export async function POST(request: Request) {
  const secretKey = process.env.TOYYIBPAY_SECRET_KEY;
  if (!secretKey) return new Response("Configuration error", { status: 503 });

  try {
    const form = await request.formData();
    const refno = String(form.get("refno") ?? "");
    const statusValue = String(form.get("status") ?? form.get("status_id") ?? "");
    const orderId = String(form.get("order_id") ?? "");
    const billCode = String(form.get("billcode") ?? "");
    const amountValue = String(form.get("amount") ?? "");
    const reason = String(form.get("reason") ?? "");
    const transactionTime = String(form.get("transaction_time") ?? "") || null;
    const receivedHash = String(form.get("hash") ?? "");

    if (
      !refno ||
      !/^[123]$/.test(statusValue) ||
      !/^WSS[A-Za-z0-9]+$/.test(orderId) ||
      !/^[A-Za-z0-9_-]+$/.test(billCode) ||
      !receivedHash
    ) {
      return new Response("Invalid callback", { status: 400 });
    }

    const expectedHash = createHash("md5")
      .update(`${secretKey}${statusValue}${orderId}${refno}ok`)
      .digest("hex");
    if (!safeEqual(expectedHash, receivedHash)) {
      return new Response("Invalid hash", { status: 401 });
    }

    const amountCents = Math.round(Number(amountValue) * 100);
    const bill = await getBill(orderId);
    if (
      !bill ||
      bill.bill_code !== billCode ||
      !Number.isSafeInteger(amountCents) ||
      amountCents !== bill.amount_cents
    ) {
      return new Response("Bill verification failed", { status: 400 });
    }

    await recordCallback({
      refno,
      bill_code: billCode,
      external_reference: orderId,
      amount_cents: amountCents,
      status: Number(statusValue),
      reason,
      transaction_time: transactionTime,
    });

    return new Response("OK");
  } catch (error) {
    console.error("ToyyibPay callback failed:", error);
    return new Response("Callback failed", { status: 500 });
  }
}
