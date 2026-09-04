import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Jemputan Wakaf oleh Ustaz Ts. Faezal Husni Hj. Arshad",
  description:
    "Saya mengajak sahabat dan para jemaah bersama-sama menjayakan Wakaf Pembinaan Sekolah Menengah Seri Setia. Wakaf serendah RM10.",
  alternates: {
    canonical: "/faezal",
  },
  openGraph: {
    title: "Jemputan Wakaf oleh Ustaz Ts. Faezal Husni Hj. Arshad",
    description:
      "Pengerusi Persatuan Alumni SRI-SMI Seremban mengajak sahabat dan para jemaah bersama menjayakan pembinaan Sekolah Menengah Seri Setia.",
    url: "/faezal",
    siteName: "Sekolah Menengah Seri Setia",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "/faezal/opengraph-image.jpg?v=5",
        width: 1200,
        height: 630,
        alt: "Jemputan Wakaf oleh Ustaz Ts. Faezal Husni Hj. Arshad",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jemputan Wakaf oleh Ustaz Ts. Faezal Husni Hj. Arshad",
    description:
      "Bersama menjayakan Wakaf Pembinaan Sekolah Menengah Seri Setia.",
    images: ["/faezal/twitter-image.jpg?v=5"],
  },
};

export default function FaezalSharePage() {
  return <Home />;
}
