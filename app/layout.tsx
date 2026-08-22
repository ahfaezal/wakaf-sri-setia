import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smserisetia.com"),
  title: "Wakaf Pembinaan Sekolah Menengah Seri Setia",
  description:
    "Bersama menjayakan Wakaf Pembinaan Sekolah Menengah Seri Setia. Wakaf serendah RM10 untuk membina sekolah dan mengalirkan pahala.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wakaf Pembinaan Sekolah Menengah Seri Setia",
    description:
      "Bersama membina sekolah, menyuburkan ilmu dan mengalirkan pahala. Wakaf serendah RM10.",
    url: "/",
    siteName: "Sekolah Menengah Seri Setia",
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wakaf Pembinaan Sekolah Menengah Seri Setia",
    description:
      "Bersama membina sekolah, menyuburkan ilmu dan mengalirkan pahala. Wakaf serendah RM10.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
