import Image from "next/image";
import DonationSelector from "./components/donation-selector";
import PaymentStatusBanner from "./components/payment-status-banner";
import WakafStats from "./components/wakaf-stats";

const facilities = [
  [
    "15 Bilik Darjah",
    "Menyediakan ruang pembelajaran yang mencukupi, selesa dan kondusif untuk para pelajar.",
  ],
  [
    "Kemudahan Berkaitan",
    "Termasuk asrama lelaki dan perempuan serta kemudahan asas yang menyokong pendidikan, pentadbiran dan pembangunan pelajar.",
  ],
  [
    "Pembangunan Tapak",
    "Dibangunkan di atas Lot 66062 dan Lot 3649 dengan keluasan keseluruhan 5.212 ekar di Ampangan, Seremban.",
  ],
  [
    "Manfaat Ummah",
    "Menjadi medan amal jariah berterusan dalam membangunkan generasi berilmu dan berakhlak.",
  ],
];

const chronologyGroups = [
  {
    id: "februari-2021",
    period: "Februari 2021",
    description: "Kerja-kerja meratakan tanah dan persediaan awal tapak.",
    images: Array.from(
      { length: 2 },
      (_, index) => `/kronologi/2021-02-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
  {
    id: "november-2023",
    period: "November 2023",
    description: "Penyediaan akses, kawasan tapak dan kerja asas pembinaan.",
    images: Array.from(
      { length: 7 },
      (_, index) => `/kronologi/2023-11-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
  {
    id: "april-2024",
    period: "April 2024",
    description: "Kemajuan kerja tanah, asas dan struktur awal projek.",
    images: Array.from(
      { length: 4 },
      (_, index) => `/kronologi/2024-04-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
  {
    id: "jun-2026",
    period: "Jun 2026",
    description: "Pembinaan struktur utama kompleks sekolah.",
    images: Array.from(
      { length: 18 },
      (_, index) => `/kronologi/2026-06-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
  {
    id: "julai-2026",
    period: "Julai 2026",
    description: "Perkembangan terkini struktur dan ruang dalaman bangunan.",
    images: Array.from(
      { length: 11 },
      (_, index) => `/kronologi/2026-07-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
];

const impactItems = [
  [
    "Wakaf RM50",
    "Menyumbang kepada bahan binaan asas dan keperluan awal pembangunan sekolah.",
  ],
  [
    "Wakaf RM100",
    "Membantu penyediaan kemudahan pendidikan dan keperluan pembelajaran pelajar.",
  ],
  [
    "Wakaf RM500",
    "Menyokong pembangunan ruang akademik dan kemudahan berkaitan secara lebih menyeluruh.",
  ],
];

const galleryItems = [
  {
    title: "Lokasi Tapak",
    image: "/lokasi-tapak.png",
    alt: "Lokasi tapak Sekolah Menengah Seri Setia Seremban",
  },
  {
    title: "Pelan Cadangan Keseluruhan",
    image: "/pelan-tapak.png",
    alt: "Pelan cadangan keseluruhan tapak sekolah",
  },
  {
    title: "Reka Bentuk 3D Sekolah",
    image: "/3d-view.png",
    alt: "Reka bentuk 3D sekolah",
  },
  {
    title: "Pandangan Hadapan Bangunan",
    image: "/bangunan.png",
    alt: "Pandangan hadapan bangunan sekolah",
  },
  {
    title: "Cadangan Rekabentuk",
    image: "/cadangan-rekabentuk.png",
    alt: "Cadangan rekabentuk sekolah",
  },
  {
    title: "Gambar Terkini Tapak",
    image: "/gambar-terkini.png",
    alt: "Keadaan semasa tapak pembinaan",
  },
  {
    title: "Pelan Lantai Aras Bawah",
    image: "/pelan-lantai-aras-bawah.png",
    alt: "Pelan lantai aras bawah",
  },
  {
    title: "Pelan Lantai Aras 1",
    image: "/pelan-lantai-aras-1.png",
    alt: "Pelan lantai aras 1",
  },
  {
    title: "Pelan Lantai Aras 2",
    image: "/pelan-lantai-aras-2.png",
    alt: "Pelan lantai aras 2",
  },
  {
    title: "Pelan Lantai Aras 3",
    image: "/pelan-lantai-aras-3.png",
    alt: "Pelan lantai aras 3",
  },
];

const videoItems = [
  {
    title: "Kempen Wakaf oleh Guru Besar",
    file: "/video_sumbangan.mp4",
  },
  {
    title: "Video Projek 1",
    file: "/video-1.mp4",
  },
  {
    title: "Video Projek 2",
    file: "/video-2.mp4",
  },
  {
    title: "Video Projek 3",
    file: "/video-3.mp4",
  },
  {
    title: "Video Projek 4",
    file: "/video-4.mp4",
  },
  {
    title: "Video Projek 5",
    file: "/video-5.mp4",
  },
  {
    title: "Video Projek 6",
    file: "/video-6.mp4",
  },
];

export default function WakafSriSetiaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="fixed inset-x-4 top-4 z-50">
        <PaymentStatusBanner />
      </div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                Projek Wakaf JHEAINS · Pembinaan Sekolah Menengah Seri Setia
              </span>

              <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                PEMBINAAN SEKOLAH MENENGAH SERI SETIA
                <span className="block mt-2">
                  PROJEK WAKAF JABATAN HAL EHWAL AGAMA ISLAM NEGERI SEMBILAN
                  (JHEAINS)
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50 md:text-lg">
                Di atas Lot 66062 dan Lot 3649, Ampangan, Daerah Seremban,
                Negeri Sembilan Darul Khusus.
                Setiap sumbangan tuan puan adalah saham akhirat dalam usaha
                membangunkan institusi pendidikan yang akan melahirkan generasi
                berilmu, berakhlak dan berdaya maju.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#sumbang"
                  className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-emerald-800 shadow-lg transition hover:scale-[1.02]"
                >
                  Sumbang Sekarang
                </a>
                <a
                  href="#tentang"
                  className="rounded-2xl border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Lihat Maklumat Projek
                </a>
              </div>

              <WakafStats />
            </div>

            <div>
              <div className="rounded-[2rem] bg-white p-6 text-slate-800 shadow-2xl">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                    Sasaran Kutipan
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                    RM 18,004,725.40
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sasaran awal bagi menampung kos pembinaan 15 bilik darjah
                    dan kemudahan berkaitan untuk pembangunan Sekolah Menengah
                    Seri Setia.
                  </p>
                </div>

                <DonationSelector />

                <div
                  className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5"
                >
                  <p className="text-lg font-semibold text-emerald-900">
                    Kaedah Sumbangan
                  </p>

                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                    <p>
                      <span className="font-semibold">Nama Akaun:</span>{" "}
                      SEKOLAH MENENGAH SERI SETIA
                    </p>
                    <p>
                      <span className="font-semibold">Bank:</span> Maybank
                    </p>
                    <p>
                      <span className="font-semibold">No. Akaun:</span> 5551 3516 1454
                    </p>
                    <p>
                      <span className="font-semibold">Rujukan:</span> WAKAF SERI
                      SETIA
                    </p>
                  </div>

                  <div className="mt-5 text-center">
                    <p className="mb-3 text-sm font-semibold text-emerald-700">
                      Salurkan sumbangan anda ke akaun berikut
                    </p>
                    <Image
                      src="/akaun.png"
                      alt="Maklumat akaun sumbangan wakaf"
                      width={1200}
                      height={240}
                      className="mx-auto rounded-xl shadow-lg"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG PROJEK */}
      <section id="tentang" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Tentang Projek
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Sekolah Menengah Seri Setia
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Memandangkan kepesatan pembangunan semasa dan kecenderungan ibu
              bapa menghantar anak-anak ke sekolah bersepadu yang menawarkan
              aliran agama dan perdana secara serentak, Sekolah Sri Seremban
              sedia ada di Jalan Dato&apos; Kelana Maamur yang menempatkan sekolah
              rendah dan menengah tidak lagi dapat menampung permohonan
              kemasukan yang semakin bertambah.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Justeru, Ahli Lembaga Pengelola Sekolah telah mengambil keputusan
              untuk mendapatkan tapak baharu bagi membina kompleks sekolah
              menengah, manakala sekolah rendah dan prasekolah dikekalkan di
              tapak sedia ada. Hasrat ini diperkukuh dengan persetujuan Wakaf
              Negeri Sembilan Muamalat, sebuah entiti wakaf hasil kerjasama
              antara MAINS dan Bank Muamalat Malaysia Berhad, untuk membantu
              merealisasikan perancangan tersebut dan menjadikan projek ini
              sekolah pertama di Negeri Sembilan yang dibina berasaskan konsep
              wakaf.
            </p>

            <div className="mt-6 space-y-4 text-slate-700">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                Menyediakan ruang pembelajaran yang tersusun, selesa dan
                mencukupi untuk para pelajar.
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                Membantu melahirkan generasi berilmu, berakhlak dan berdaya
                saing melalui pendidikan yang berkualiti.
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                Memberi peluang kepada masyarakat untuk menyertai amal jariah
                yang berterusan melalui wakaf pendidikan.
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {facilities.map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATAR BELAKANG TAPAK */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Latar Belakang
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Tapak Baharu Kompleks Sekolah
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <div className="text-2xl font-bold text-emerald-900">5.212 ekar</div>
                  <div className="mt-1 text-sm text-emerald-700">Jumlah keluasan tapak</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-xl font-bold text-slate-900">Lot 66062</div>
                  <div className="mt-1 text-sm text-slate-600">Dahulunya Lot PT 18544 · 2.047 ekar</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-xl font-bold text-slate-900">Lot 3649</div>
                  <div className="mt-1 text-sm text-slate-600">Keluasan 3.165 ekar</div>
                </div>
              </div>
            </div>

            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Tapak cadangan sekolah terletak di dua lot, iaitu Lot PT 18544
                yang kini dikenali sebagai Lot 66062 dengan keluasan 2.047 ekar,
                dan Lot 3649 dengan keluasan 3.165 ekar. Kedua-duanya menjadikan
                keseluruhan kawasan seluas 5.212 ekar.
              </p>
              <p>
                Tapak ini berhadapan dengan Taman Jemerlang, Ampangan,
                bersebelahan Lebuhraya Kajang–Seremban dan berada di kawasan
                berbukit yang melebihi 30 meter dari Taman Jemerlang. Akses ke
                tapak adalah melalui Jalan Taman Ampangan/Margosa dan Jalan
                Kampung Panchor.
              </p>
              <p>
                Lot 3649 telah dibeli oleh pihak sekolah, manakala Lot 66062
                telah diwakafkan oleh seorang Ahli Lembaga Pengelola Sekolah.
                Kedua-dua lot kemudiannya diwakafkan kepada Majlis Agama Islam
                Negeri Sembilan. Kedua-duanya berstatus tanah pertanian dan
                berada dalam zon perumahan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI PROJEK */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Gambaran Projek
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Pelan dan Reka Bentuk Sekolah
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Berikut ialah lokasi tapak, pelan cadangan, gambaran semasa dan
              reka bentuk pembangunan Sekolah Menengah Seri Setia.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1400}
                  height={800}
                  className="w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO PROJEK */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Video Projek
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Video Berkaitan Wakaf dan Pembangunan Sekolah
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Saksikan video berkaitan projek wakaf, tapak semasa dan cadangan
              pembangunan sekolah bagi memberi gambaran yang lebih jelas kepada
              para penyumbang.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videoItems.map((video) => (
              <div
                key={video.file}
                className="overflow-hidden rounded-2xl bg-slate-50 p-4 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  {video.title}
                </h3>
                <video
                  controls
                  className="w-full rounded-xl"
                  preload="metadata"
                >
                  <source src={video.file} type="video/mp4" />
                  Browser anda tidak menyokong paparan video.
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KRONOLOGI PROJEK */}
      <section className="bg-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Perkembangan Pembinaan
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Kronologi Projek Pembinaan Sekolah Menengah Seri Setia
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Dokumentasi kemajuan projek dari kerja penyediaan tapak sehingga
              pembinaan struktur utama kompleks sekolah.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {chronologyGroups.map((group) => (
              <section key={group.id} aria-labelledby={`kronologi-${group.id}`}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-emerald-200 pb-4">
                  <div>
                    <h3
                      id={`kronologi-${group.id}`}
                      className="text-2xl font-bold text-slate-900"
                    >
                      {group.period}
                    </h3>
                    <p className="mt-1 text-slate-600">{group.description}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700">
                    {group.images.length} rekod
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.images.map((image, index) => (
                    <figure
                      key={image}
                      className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-emerald-100"
                    >
                      <Image
                        src={image}
                        alt={`Kemajuan pembinaan pada ${group.period}, rekod ${index + 1}`}
                        width={1320}
                        height={1020}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-auto w-full rounded-xl"
                      />
                      <figcaption className="px-1 pb-1 pt-3 text-sm text-slate-500">
                        {group.period} · Rekod {index + 1}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* KESAN WAKAF */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Kesan Wakaf Anda
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Sumbangan kecil, manfaat besar dan berpanjangan
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {impactItems.map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KETELUSAN DAN HUBUNGI */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-emerald-700 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
              Ketelusan
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Keyakinan penyumbang adalah amanah kami
            </h2>
            <ul className="mt-6 space-y-3 text-emerald-50">
              <li>• Paparan jumlah kutipan semasa secara berkala</li>
              <li>• Laporan perkembangan pembinaan</li>
              <li>• Maklumat pengurusan projek</li>
              <li>• Rekod dan pengesahan sumbangan</li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Hubungi Kami
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Perlukan maklumat lanjut?
            </h2>

            <div className="mt-6 space-y-4 leading-7 text-slate-700">
              <p>
                <span className="font-semibold">Projek:</span> Projek Pembinaan
                Sekolah Menengah Seri Setia
              </p>
              <p>
                <span className="font-semibold">Tapak:</span> Lot 66062 &amp;
                Lot 3649, Ampangan, Daerah Seremban, Negeri Sembilan Darul
                Khusus
              </p>
              <p>
                <span className="font-semibold">Telefon:</span> 06-763 3777
              </p>
              <p>
                <span className="font-semibold">Email:</span> sriseremban@srisbn.edu.my
              </p>
              <p>
                <span className="font-semibold">Maklumat Bayaran:</span>{" "}
                Maybank 5551 3516 1454
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">
            Jom Rebut Peluang Wakaf untuk Pembinaan Sekolah Ini
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Mudah-mudahan setiap ringgit yang disumbangkan menjadi amal jariah
            yang berterusan, memberi manfaat kepada para pelajar, guru dan
            masyarakat.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#sumbang"
              className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-emerald-500"
            >
              Pilih Amaun Wakaf
            </a>
            <a
              href="#tentang"
              className="rounded-2xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Lihat Butiran Projek
            </a>
          </div>
        </div>
      </section>

      <section id="privasi" className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Notis Privasi</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              Nama, alamat e-mel dan nombor telefon penyumbang dikumpulkan
              hanya untuk menyediakan bil, memproses pembayaran, menghantar
              resit dan mengurus rekod sumbangan wakaf melalui ToyyibPay.
            </p>
            <p>
              Maklumat pembayaran diproses oleh ToyyibPay. Pihak sekolah tidak
              menyimpan butiran akaun bank atau kelayakan perbankan internet
              penyumbang. Maklumat peribadi tidak akan digunakan bagi tujuan
              pemasaran tanpa persetujuan berasingan.
            </p>
            <p>
              Untuk pertanyaan, pembetulan atau permintaan berkaitan data
              peribadi, hubungi sriseremban@srisbn.edu.my atau 06-763 3777.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
