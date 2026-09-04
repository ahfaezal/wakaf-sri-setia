"use client";

import { useEffect, useState } from "react";
import { trackMetaEvent } from "../../lib/meta-pixel";

type PaymentState = "success" | "pending" | "failed" | null;

export default function PaymentStatusBanner() {
  const [paymentState, setPaymentState] = useState<PaymentState>(null);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.get("payment") !== "complete") return;

    const transactionId = parameters.get("transaction_id");
    const orderId = parameters.get("order_id");
    const billCode = parameters.get("billcode");
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let verifiedAmount: number | null = null;
    let sent = false;
    const controller = new AbortController();
    const sendPurchase = () => {
      if (cancelled || sent || verifiedAmount === null || !transactionId) return;
      // Fail closed when persistent deduplication storage is unavailable.
      try {
        const key = `wss-meta-purchase-${transactionId}`;
        if (window.localStorage.getItem(key)) return;
        if (trackMetaEvent({
          name: "Purchase",
          parameters: {
            value: verifiedAmount,
            currency: "MYR",
            transaction_id: transactionId,
          },
        })) {
          sent = true;
          window.localStorage.setItem(key, "1");
        }
      } catch { /* Payment confirmation must work even with storage disabled. */ }
    };
    const verify = async (attempt = 0) => {
      if (cancelled) return;
      setPaymentState("pending");
      try {
        const response = await fetch("/api/payment-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, billCode, transactionId }),
          cache: "no-store",
          signal: controller.signal,
        });
        const receipt = await response.json();
        if (cancelled) return;
        if (response.ok && receipt.state === "success" && receipt.transactionId === transactionId &&
            typeof receipt.amount === "number" && Number.isFinite(receipt.amount) && receipt.amount > 0) {
          verifiedAmount = receipt.amount;
          if (typeof receipt.certificateUrl === "string") {
            setCertificateUrl(receipt.certificateUrl);
          }
          setPaymentState("success");
          sendPurchase();
          return;
        }
        if (response.ok && receipt.state === "failed") {
          setPaymentState("failed");
          return;
        }
        if (response.status === 400) return;
      } catch { /* Keep an unverified transaction pending, not successful. */ }
      if (!cancelled && attempt < 10) timer = setTimeout(() => void verify(attempt + 1), 3000);
    };
    window.addEventListener("wss:marketing-consent-granted", sendPurchase);
    void verify();
    // Keep references for refresh/retry; never trust the return URL as proof of payment.
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
      window.removeEventListener("wss:marketing-consent-granted", sendPurchase);
    };
  }, []);

  if (!paymentState) return null;

  const content = {
    success: {
      title: "Wakaf anda berjaya diterima",
      message:
        "Terima kasih atas sumbangan anda. Resit akan dihantar melalui e-mel dan jumlah kutipan akan dikemas kini secara automatik.",
      style: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    pending: {
      title: "Pembayaran sedang disahkan",
      message:
        "Kami sedang menunggu pengesahan pembayaran. Jika wang telah ditolak, jangan bayar semula. Muat semula halaman kemudian atau hubungi pihak sekolah dengan rujukan transaksi anda.",
      style: "border-amber-200 bg-amber-50 text-amber-900",
    },
    failed: {
      title: "Pembayaran tidak berjaya",
      message:
        "Tiada sumbangan direkodkan. Sila cuba lagi atau hubungi pihak sekolah jika wang telah ditolak daripada akaun anda.",
      style: "border-red-200 bg-red-50 text-red-900",
    },
  }[paymentState];

  return (
    <div
      role="status"
      className={`mx-auto mb-6 max-w-7xl rounded-2xl border px-5 py-4 shadow-sm ${content.style}`}
    >
      <p className="font-bold">{content.title}</p>
      <p className="mt-1 text-sm leading-6">{content.message}</p>
      {paymentState === "success" && certificateUrl && (
        <a
          href={certificateUrl}
          className="mt-3 inline-flex rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        >
          Muat turun Sijil Wakaf (PDF)
        </a>
      )}
    </div>
  );
}
