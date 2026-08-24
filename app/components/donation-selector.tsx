"use client";

import { useMemo, useState } from "react";
import { trackMetaEvent } from "../../lib/meta-pixel";

const quickAmounts = [10, 50, 100, 200, 500, 1000];
const currencyFormatter = new Intl.NumberFormat("ms-MY", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function DonationSelector() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const amount = useMemo(() => {
    if (!showCustomAmount) return selectedAmount;
    if (customAmount.trim() === "") return null;

    const parsedAmount = Number(customAmount);
    return Number.isFinite(parsedAmount) ? parsedAmount : null;
  }, [customAmount, selectedAmount, showCustomAmount]);

  const isValidAmount =
    amount !== null &&
    amount >= 1 &&
    amount <= 30000 &&
    Math.round(amount * 100) === amount * 100;
  const hasValidDonorDetails =
    donorName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.trim()) &&
    /^[+\d][\d\s-]{7,19}$/.test(donorPhone.trim());
  const canSubmit =
    isValidAmount && hasValidDonorDetails && hasAgreed && !isSubmitting;

  function selectQuickAmount(value: number) {
    setSelectedAmount(value);
    setShowCustomAmount(false);
    setCustomAmount("");
    setError("");
  }

  async function proceedToPayment() {
    if (!canSubmit || amount === null) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/create-wakaf-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim(),
        }),
      });
      const result = (await response.json()) as {
        paymentUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.paymentUrl) {
        throw new Error(
          result.error ?? "Bil pembayaran tidak dapat disediakan ketika ini.",
        );
      }

      window.sessionStorage.setItem("wss-pending-wakaf-amount", String(amount));
      trackMetaEvent({
        name: "InitiateCheckout",
        parameters: { value: amount, currency: "MYR" },
      });
      window.location.assign(result.paymentUrl);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Bil pembayaran tidak dapat disediakan ketika ini.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div id="sumbang" className="mt-6 scroll-mt-6">
      <fieldset>
        <legend className="text-base font-semibold text-slate-900">
          1. Pilih jumlah wakaf
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {quickAmounts.map((quickAmount) => {
            const isSelected =
              !showCustomAmount && selectedAmount === quickAmount;

            return (
              <button
                key={quickAmount}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectQuickAmount(quickAmount)}
                className={`rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-100 ring-2 ring-emerald-600"
                    : "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50"
                }`}
              >
                <span className="block text-sm text-slate-500">
                  Cadangan wakaf
                </span>
                <span className="block text-xl font-bold text-slate-900">
                  RM {quickAmount.toLocaleString("ms-MY")}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            aria-pressed={showCustomAmount}
            onClick={() => {
              setShowCustomAmount(true);
              setSelectedAmount(null);
              setError("");
            }}
            className={`col-span-2 rounded-2xl border border-dashed px-4 py-4 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
              showCustomAmount
                ? "border-emerald-600 bg-emerald-100 ring-2 ring-emerald-600"
                : "border-emerald-300 bg-emerald-50 hover:border-emerald-500 hover:bg-emerald-100"
            }`}
          >
            <span className="block text-sm text-emerald-700">Jumlah pilihan</span>
            <span className="block text-xl font-bold text-emerald-900">
              Lain-lain amaun
            </span>
          </button>
        </div>
      </fieldset>

      {showCustomAmount && (
        <div className="mt-4">
          <label
            htmlFor="custom-wakaf-amount"
            className="block text-sm font-semibold text-slate-700"
          >
            Masukkan jumlah wakaf (RM)
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600">
            <span className="pl-4 font-semibold text-slate-600">RM</span>
            <input
              id="custom-wakaf-amount"
              type="number"
              min="1"
              max="30000"
              step="0.01"
              inputMode="decimal"
              value={customAmount}
              onChange={(event) => {
                setCustomAmount(event.target.value);
                setError("");
              }}
              placeholder="Contoh: 25.00"
              className="w-full rounded-xl bg-transparent px-3 py-3 outline-none"
            />
          </div>
          {customAmount !== "" && !isValidAmount && (
            <p className="mt-2 text-sm text-red-700">
              Masukkan amaun antara RM1.00 hingga RM30,000.00, maksimum dua
              tempat perpuluhan.
            </p>
          )}
        </div>
      )}

      <div className="mt-5 rounded-2xl bg-slate-100 p-4">
        <p className="text-sm text-slate-600">Jumlah wakaf anda</p>
        <p className="mt-1 text-2xl font-bold text-emerald-800" aria-live="polite">
          {isValidAmount && amount !== null
            ? `RM ${currencyFormatter.format(amount)}`
            : "Belum dipilih"}
        </p>
      </div>

      <fieldset className="mt-5 space-y-4">
        <legend className="text-base font-semibold text-slate-900">
          2. Maklumat penyumbang
        </legend>
        <p className="text-sm leading-6 text-slate-600">
          Maklumat ini diperlukan untuk resit dan mesej pengesahan transaksi.
        </p>
        <div>
          <label htmlFor="donor-name" className="text-sm font-semibold text-slate-700">
            Nama penuh
          </label>
          <input
            id="donor-name"
            type="text"
            autoComplete="name"
            value={donorName}
            onChange={(event) => setDonorName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div>
          <label htmlFor="donor-email" className="text-sm font-semibold text-slate-700">
            E-mel
          </label>
          <input
            id="donor-email"
            type="email"
            autoComplete="email"
            value={donorEmail}
            onChange={(event) => setDonorEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div>
          <label htmlFor="donor-phone" className="text-sm font-semibold text-slate-700">
            No. telefon
          </label>
          <input
            id="donor-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Contoh: 0123456789"
            value={donorPhone}
            onChange={(event) => setDonorPhone(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
      </fieldset>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="checkbox"
          checked={hasAgreed}
          onChange={(event) => setHasAgreed(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-emerald-700"
        />
        <span className="text-sm leading-6 text-slate-700">
          Saya mengesahkan jumlah wakaf yang dipilih dan bersetuju bahawa
          sumbangan ini akan digunakan bagi Projek Pembinaan Sekolah Menengah
          Seri Setia. Saya juga telah membaca{" "}
          <a href="#privasi" className="font-semibold text-emerald-700 underline">
            Notis Privasi
          </a>
          .
        </span>
      </label>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={proceedToPayment}
        className="mt-5 w-full rounded-2xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {isSubmitting ? "Menyediakan pembayaran…" : "Wakaf Sekarang"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        Jumlah pilihan anda akan diproses melalui sistem pembayaran yang
        selamat. Tiada caj transaksi FPX dikenakan.
      </p>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 p-3 text-center text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
