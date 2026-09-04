import { getCertificateReceipt } from "../../../lib/supabase-admin";
import { createWakafCertificatePdf } from "../../../lib/wakaf-certificate";

export const runtime = "nodejs";

const referencePattern = /^[A-Za-z0-9_-]{1,100}$/;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order_id") ?? "";
  const billCode = url.searchParams.get("billcode") ?? "";
  const transactionId = url.searchParams.get("transaction_id") ?? "";

  if (
    !/^WSS[A-Za-z0-9]{1,80}$/.test(orderId) ||
    !referencePattern.test(billCode) ||
    !referencePattern.test(transactionId)
  ) {
    return new Response("Rujukan sijil tidak sah.", { status: 400 });
  }

  try {
    const receipt = await getCertificateReceipt(
      orderId,
      billCode,
      transactionId,
    );
    if (!receipt) {
      return new Response("Sijil belum tersedia atau pembayaran belum disahkan.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const verificationUrl = new URL("/api/wakaf-certificate", url.origin);
    verificationUrl.search = url.searchParams.toString();
    const certificate = await createWakafCertificatePdf({
      donorName: receipt.donor_name ?? "Pewakaf yang dihormati",
      amountCents: receipt.amount_cents,
      transactionId: receipt.refno,
      transactionTime: receipt.transaction_time,
      receivedAt: receipt.received_at,
      verificationUrl: verificationUrl.toString(),
    });

    return new Response(Buffer.from(certificate.bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Sijil-Wakaf-${certificate.certificateNumber}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Unable to generate wakaf certificate:", error);
    return new Response("Sijil tidak dapat dijana ketika ini.", { status: 503 });
  }
}
