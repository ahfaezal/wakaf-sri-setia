export type MetaEvent = {
  name: "InitiateCheckout" | "Purchase";
  parameters?: Record<string, string | number>;
};

declare global {
  interface Window {
    __metaEventQueue?: MetaEvent[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(event: MetaEvent) {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem("wss-meta-marketing-consent-v1") !== "granted") return false;
  } catch {
    return false;
  }

  if (window.fbq) {
    window.fbq("track", event.name, event.parameters ?? {});
    return true;
  }

  window.__metaEventQueue = [...(window.__metaEventQueue ?? []), event];
  return true;
}
