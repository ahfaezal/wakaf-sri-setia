"use client";

import { useEffect, useState } from "react";

const TARGET_AMOUNT = 18_004_725.4;
const moneyFormatter = new Intl.NumberFormat("ms-MY", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type Stats = {
  totalAmountCents: number;
  donorCount: number;
};

export default function WakafStats() {
  const [stats, setStats] = useState<Stats>({
    totalAmountCents: 0,
    donorCount: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/wakaf-stats", { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: Stats) => setStats(data))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const totalAmount = stats.totalAmountCents / 100;
  const progress = Math.min((totalAmount / TARGET_AMOUNT) * 100, 100);
  const progressLabel = `${progress.toFixed(progress >= 1 ? 1 : 3)}%`;

  return (
    <>
      <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="text-2xl font-bold">RM {moneyFormatter.format(totalAmount)}</div>
          <div className="mt-1 text-emerald-50">Jumlah Terkumpul</div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="text-2xl font-bold">{progressLabel}</div>
          <div className="mt-1 text-emerald-50">Sasaran Dicapai</div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="text-2xl font-bold">{stats.donorCount.toLocaleString("ms-MY")}</div>
          <div className="mt-1 text-emerald-50">Penyumbang</div>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>Progress Kutipan</span>
          <span>{progressLabel}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-200">
          <div
            className="h-4 rounded-full bg-emerald-600 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
}
