import { getPaymentReceipt } from "../../../lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400, headers });
  }
  const { orderId, billCode, transactionId } = body ?? {};
  if (
    typeof orderId !== "string" || !/^WSS[A-Za-z0-9]{1,80}$/.test(orderId) ||
    typeof billCode !== "string" || !/^[A-Za-z0-9_-]{1,80}$/.test(billCode) ||
    typeof transactionId !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(transactionId)
  ) {
    return Response.json({ error: "Invalid reference" }, { status: 400, headers });
  }
  try {
    const receipt = await getPaymentReceipt(orderId, billCode, transactionId);
    if (!receipt) return Response.json({ state: "pending" }, { headers });
    if (receipt.status !== 1) {
      return Response.json({ state: receipt.status === 3 ? "failed" : "pending" }, { headers });
    }
    if (!Number.isSafeInteger(receipt.amount_cents) || receipt.amount_cents <= 0) {
      throw new Error("Invalid receipt amount");
    }
    const certificateParameters = new URLSearchParams({
      order_id: orderId,
      billcode: billCode,
      transaction_id: transactionId,
    });
    return Response.json(
      {
        state: "success",
        amount: receipt.amount_cents / 100,
        transactionId,
        certificateUrl: `/api/wakaf-certificate?${certificateParameters}`,
      },
      { headers },
    );
  } catch {
    return Response.json({ state: "pending" }, { status: 503, headers });
  }
}
