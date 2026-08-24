"use client";

import { useEffect, useState } from "react";
import { trackMetaEvent } from "../../lib/meta-pixel";

type PaymentState = "success" | "pending" | "failed" | null;

export default function PaymentStatusBanner() {
  const [paymentState, setPaymentState] = useState<PaymentState>(null);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.get("payment") !== "complete") return;

    const status = parameters.get("status_id");
    const transactionId = parameters.get("transaction_id");
    if (status === "1" && transactionId) {
      const dedupeKey = `wss-meta-purchase-${transactionId}`;
      const storedAmount = Number(
        window.sessionStorage.getItem("wss-pending-wakaf-amount"),
      );
      if (
        !window.localStorage.getItem(dedupeKey) &&
        Number.isFinite(storedAmount) &&
        storedAmount > 0
      ) {
        trackMetaEvent({
          name: "Purchase",
          parameters: {
            value: storedAmount,
            currency: "MYR",
            transaction_id: transactionId,
          },
        });
        window.localStorage.setItem(dedupeKey, "1");
      }
      window.sessionStorage.removeItem("wss-pending-wakaf-amount");
    }
    queueMicrotask(() =>
      setPaymentState(
        status === "1" ? "success" : status === "2" ? "pending" : "failed",
      ),
    );
    window.history.replaceState({}, "", window.location.pathname);
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
      title: "Pembayaran sedang diproses",
      message:
        "Status transaksi masih tertangguh. Jumlah kutipan akan dikemas kini selepas pembayaran disahkan.",
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
    </div>
  );
}
