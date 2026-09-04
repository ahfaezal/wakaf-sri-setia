import { createHash } from "node:crypto";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export type WakafCertificateData = {
  donorName: string;
  amountCents: number;
  transactionId: string;
  transactionTime: string | null;
  receivedAt: string;
  verificationUrl: string;
};

const green = rgb(0.02, 0.32, 0.23);
const gold = rgb(0.82, 0.62, 0.12);
const ink = rgb(0.06, 0.1, 0.18);
const muted = rgb(0.35, 0.39, 0.45);
const cream = rgb(0.98, 0.97, 0.91);

function certificateNumber(transactionId: string, year: number) {
  const digest = createHash("sha256")
    .update(transactionId)
    .digest("hex")
    .slice(0, 10)
    .toUpperCase();
  return `WSS-${year}-${digest}`;
}

function parseTransactionDate(value: string | null, fallback: string) {
  const candidates = [value, fallback].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.getTime())) return parsed;

    const match = candidate.match(
      /^(\d{1,2})[-/]([01]?\d)[-/](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/,
    );
    if (match) {
      const [, day, month, year, hour = "0", minute = "0", second = "0"] =
        match;
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
      );
    }
  }
  return new Date();
}

function fitTextSize(
  text: string,
  font: { widthOfTextAtSize(value: string, size: number): number },
  maximumWidth: number,
  preferredSize: number,
  minimumSize: number,
) {
  let size = preferredSize;
  while (size > minimumSize && font.widthOfTextAtSize(text, size) > maximumWidth) {
    size -= 0.5;
  }
  return size;
}

export async function createWakafCertificatePdf(data: WakafCertificateData) {
  const document = await PDFDocument.create();
  document.setTitle("Sijil Wakaf Pembinaan Sekolah Menengah Seri Setia");
  document.setAuthor("Projek Wakaf JHEAINS");
  document.setSubject("Pengesahan sumbangan wakaf");
  document.setCreator("www.smserisetia.com");

  const page = document.addPage([841.89, 595.28]);
  const { width, height } = page.getSize();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const italic = await document.embedFont(StandardFonts.HelveticaOblique);

  page.drawRectangle({ x: 0, y: 0, width, height, color: cream });
  page.drawRectangle({ x: 18, y: 18, width: width - 36, height: height - 36, borderColor: green, borderWidth: 5 });
  page.drawRectangle({ x: 27, y: 27, width: width - 54, height: height - 54, borderColor: gold, borderWidth: 1.5 });
  page.drawRectangle({ x: 42, y: height - 118, width: width - 84, height: 68, color: green });

  const heading = "SIJIL WAKAF";
  page.drawText(heading, {
    x: (width - bold.widthOfTextAtSize(heading, 30)) / 2,
    y: height - 88,
    size: 30,
    font: bold,
    color: rgb(1, 1, 1),
  });

  const project = "PEMBINAAN SEKOLAH MENENGAH SERI SETIA";
  page.drawText(project, {
    x: (width - bold.widthOfTextAtSize(project, 14)) / 2,
    y: height - 142,
    size: 14,
    font: bold,
    color: green,
  });

  const intro = "Dengan penuh penghargaan, sijil ini dianugerahkan kepada";
  page.drawText(intro, {
    x: (width - regular.widthOfTextAtSize(intro, 13)) / 2,
    y: height - 190,
    size: 13,
    font: regular,
    color: muted,
  });

  const donorName = data.donorName.trim() || "Pewakaf yang dihormati";
  const donorSize = fitTextSize(donorName, bold, width - 180, 26, 16);
  page.drawText(donorName, {
    x: (width - bold.widthOfTextAtSize(donorName, donorSize)) / 2,
    y: height - 236,
    size: donorSize,
    font: bold,
    color: ink,
  });
  page.drawLine({ start: { x: 110, y: height - 248 }, end: { x: width - 110, y: height - 248 }, thickness: 1, color: gold });

  const amount = new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
  }).format(data.amountCents / 100);
  const recognition = `atas sumbangan wakaf berjumlah ${amount}`;
  page.drawText(recognition, {
    x: (width - regular.widthOfTextAtSize(recognition, 15)) / 2,
    y: height - 284,
    size: 15,
    font: regular,
    color: ink,
  });

  const prayerLines = [
    "Semoga wakaf ini menjadi amal jariah yang berpanjangan,",
    "menyuburkan ilmu dan membina generasi yang beriman serta berakhlak.",
  ];
  prayerLines.forEach((line, index) => {
    page.drawText(line, {
      x: (width - italic.widthOfTextAtSize(line, 12)) / 2,
      y: height - 327 - index * 19,
      size: 12,
      font: italic,
      color: muted,
    });
  });

  const transactionDate = parseTransactionDate(
    data.transactionTime,
    data.receivedAt,
  );
  const dateText = new Intl.DateTimeFormat("ms-MY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(transactionDate);
  const year = Number(
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      timeZone: "Asia/Kuala_Lumpur",
    }).format(transactionDate),
  );
  const number = certificateNumber(data.transactionId, year);

  const qrDataUrl = await QRCode.toDataURL(data.verificationUrl, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 220,
    color: { dark: "#05523B", light: "#FFFDF4" },
  });
  const qrImage = await document.embedPng(
    Uint8Array.from(Buffer.from(qrDataUrl.split(",")[1], "base64")),
  );
  page.drawImage(qrImage, { x: width - 164, y: 69, width: 88, height: 88 });
  page.drawText("Imbas untuk pengesahan", {
    x: width - 174,
    y: 54,
    size: 8,
    font: regular,
    color: muted,
  });

  const details = [
    `No. sijil: ${number}`,
    `Tarikh wakaf: ${dateText}`,
    `Rujukan transaksi: ${data.transactionId}`,
  ];
  details.forEach((line, index) => {
    page.drawText(line, {
      x: 72,
      y: 138 - index * 20,
      size: 10.5,
      font: index === 0 ? bold : regular,
      color: index === 0 ? green : muted,
    });
  });

  page.drawText("PROJEK WAKAF JABATAN HAL EHWAL AGAMA ISLAM NEGERI SEMBILAN (JHEAINS)", {
    x: 72,
    y: 54,
    size: 8.5,
    font: bold,
    color: green,
  });
  page.drawText("www.smserisetia.com", {
    x: 72,
    y: 39,
    size: 8.5,
    font: regular,
    color: muted,
  });

  return { bytes: await document.save(), certificateNumber: number };
}
