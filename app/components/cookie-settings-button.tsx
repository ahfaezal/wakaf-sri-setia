"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("wss:open-cookie-settings"))}
      className="font-semibold text-emerald-700 underline"
    >
      Tetapan kuki
    </button>
  );
}
