"use client";

import { useEffect, useState } from "react";

const META_PIXEL_ID = "2041650522714273";
const CONSENT_KEY = "wss-meta-marketing-consent-v1";

type Consent = "granted" | "denied" | null;

function initialisePixel() {
  if (window.fbq) {
    window.fbq("consent", "grant");
    return;
  }

  type QueuedFbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    loaded: boolean;
    version: string;
  };

  const fbq: QueuedFbq = (...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("consent", "grant");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  for (const event of window.__metaEventQueue ?? []) {
    window.fbq("track", event.name, event.parameters ?? {});
  }
  window.__metaEventQueue = [];
}

export default function MetaPixelConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "granted" || savedConsent === "denied") {
      queueMicrotask(() => setConsent(savedConsent));
    } else {
      queueMicrotask(() => setIsOpen(true));
    }

    const openConsent = () => setIsOpen(true);
    window.addEventListener("wss:open-cookie-settings", openConsent);
    return () =>
      window.removeEventListener("wss:open-cookie-settings", openConsent);
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      initialisePixel();
      window.dispatchEvent(new Event("wss:marketing-consent-granted"));
    }
  }, [consent]);

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setIsOpen(false);
    if (value === "denied") {
      window.__metaEventQueue = [];
      window.fbq?.("consent", "revoke");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
    >
      <h2 id="cookie-consent-title" className="text-lg font-bold text-slate-900">
        Pilihan privasi anda
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Kami menggunakan kuki pemasaran Meta untuk mengukur keberkesanan kempen
        wakaf. Tiada nama, e-mel, nombor telefon atau butiran perbankan dihantar
        melalui Pixel. Anda boleh menolak tanpa menjejaskan proses wakaf.
      </p>
      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => saveConsent("denied")}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Tolak
        </button>
        <button
          type="button"
          onClick={() => saveConsent("granted")}
          className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
        >
          Benarkan analitik &amp; pemasaran
        </button>
      </div>
    </div>
  );
}
