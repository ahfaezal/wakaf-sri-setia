import Image from "next/image";

const quickAmounts = [50, 100, 200, 500];

const facilities = [
  [
    "15 Bilik Darjah",
    "Menyediakan ruang pembelajaran yang mencukupi, selesa dan kondusif untuk para pelajar.",
  ],
  [
    "Kemudahan Berkaitan",
    "Termasuk kemudahan asas yang menyokong proses pendidikan, pentadbiran dan pembangunan pelajar.",
  ],
  [
    "Pembangunan Tapak",
    "Dibina di atas Lot 29470 dan Lot 3649 di Kampung Panchor, Mukim Ampangan, Seremban.",
  ],
  [
    "Manfaat Ummah",
    "Menjadi medan amal jariah berterusan dalam membangunkan generasi berilmu dan berakhlak.",
  ],
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
    alt: "Lokasi tapak Sekolah Menengah Sri Setia Seremban",
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                Wakaf Pembinaan Sekolah Menengah Sri (SMI) Seremban
              </span>

              <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                WAKAF PEMBINAAN SEKOLAH MENENGAH SRI (SMI) SEREMBAN:
                <span className="block mt-2">
                  SEKOLAH WAKAF PERTAMA DI NEGERI SEMBILAN DARUL KHUSUS
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50 md:text-lg">
                Di atas Lot 29470 &amp; Lot 3649, Kampung Panchor, Mukim
                Ampangan, Daerah Seremban, Negeri Sembilan Darul Khusus.
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

              <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-2xl font-bold">RM 0</div>
                  <div className="mt-1 text-emerald-50">Jumlah Terkumpul</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-2xl font-bold">0%</div>
                  <div className="mt-1 text-emerald-50">Sasaran Dicapai</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-2xl font-bold">0</div>
                  <div className="mt-1 text-emerald-50">Penyumbang</div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] bg-white p-6 text-slate-800 shadow-2xl">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                    Sasaran Kutipan
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                    RM 18,000,000
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sasaran awal bagi menampung kos pembinaan 15 bilik darjah
                    dan kemudahan berkaitan untuk pembangunan Sekolah Menengah
                    Sri (SMI) Seremban.
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm font-medium">
                    <span>Progress Kutipan</span>
                    <span>0%</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-slate-200">
                    <div className="h-4 w-[12%] rounded-full bg-emerald-600" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      className="rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50"
                    >
                      <div className="text-sm text-slate-500">Wakaf</div>
                      <div className="text-xl font-bold text-slate-900">
                        RM {amount}
                      </div>
                    </button>
                  ))}
                </div>

                <div
                  id="sumbang"
                  className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5"
                >
                  <p className="text-lg font-semibold text-emerald-900">
                    Kaedah Sumbangan
                  </p>

                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                    <p>
                      <span className="font-semibold">Nama Akaun:</span>{" "}
                      SRI SBN BESTARI SDN BHD
                    </p>
                    <p>
                      <span className="font-semibold">Bank:</span> Maybank
                    </p>
                    <p>
                      <span className="font-semibold">No. Akaun:</span> 5551 3500
                      5435
                    </p>
                    <p>
                      <span className="font-semibold">Rujukan:</span> WAKAF SMI
                      SEREMBAN
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

                  <button className="mt-5 w-full rounded-2xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-800">
                    Saya Ingin Menyumbang
                  </button>
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
              Pembangunan Sekolah Menengah Sri (SMI) Seremban
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Projek wakaf ini bertujuan membangunkan Sekolah Menengah Sri (SMI)
              Seremban yang merangkumi 15 bilik darjah dan kemudahan berkaitan
              di atas Lot 29470 dan Lot 3649, Kampung Panchor, Mukim Ampangan,
              Daerah Seremban, Negeri Sembilan Darul Khusus. Pembangunan ini
              bukan sekadar mendirikan bangunan, tetapi membina masa depan ummah
              melalui pendidikan, sahsiah dan tarbiah.
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
              reka bentuk pembangunan Sekolah Menengah Sri (SMI) Seremban.
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

{/* 🔥 LAWATAN MENTERI BESAR */}
<section className="bg-emerald-50 py-16">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Tajuk */}
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Sokongan Rasmi Kerajaan Negeri
      </p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        Lawatan Menteri Besar Negeri Sembilan ke Tapak Projek
      </h2>
    </div>

    {/* Ucapan MB */}
    <div className="mt-6 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
      <p className="text-lg leading-8 text-slate-700 italic">
        “Pagi ini saya berkesempatan melawat tapak projek pembinaan Sekolah Menengah Seri Setia serta menyempurnakan serahan sumbangan projek daripada Pejabat Menteri Besar Negeri Sembilan dan Yayasan Negeri Sembilan.
        <br /><br />
        Bangunan sedia ada kini tidak lagi mampu menampung jumlah pelajar yang semakin bertambah setiap tahun. Justeru, pembinaan kompleks baharu amat diperlukan bagi menyediakan ruang pembelajaran yang lebih selesa dan kondusif.
        <br /><br />
        Saya ingin mengajak orang ramai untuk turut sama menyumbang dalam bentuk wakaf bagi menjayakan pembinaan Kompleks Baharu Sekolah Menengah Seri Setia.”
      </p>

      <p className="mt-4 font-semibold text-emerald-800">
        — YAB Dato' Seri Utama Haji Aminuddin bin Harun, Menteri Besar Negeri Sembilan
      </p>

      {/* Maklumat Sumbangan (reinforce trust) */}
      <div className="mt-6 border-t pt-4 text-sm text-slate-700 space-y-2">
        <p><span className="font-semibold">Tabung:</span> Tabung Pembangunan Sekolah Sri Seremban</p>
        <p><span className="font-semibold">Nama Akaun:</span> SRI SBN BESTARI SDN. BHD.</p>
        <p><span className="font-semibold">Bank:</span> Maybank</p>
        <p><span className="font-semibold">No. Akaun:</span> 5551 3500 5435</p>
      </div>
    </div>

    {/* Galeri Gambar MB */}
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {[
        "/mb-1.png",
        "/mb-2.png",
        "/mb-3.png",
        "/mb-4.png",
        "/mb-5.png",
        "/mb-6.png",
        "/mb-7.png",
        "/mb-8.png",
        "/mb-9.png",
      ].map((img, index) => (
        <div key={index} className="overflow-hidden rounded-xl bg-white shadow">
          <Image
            src={img}
            alt={`Lawatan Menteri Besar ${index + 1}`}
            width={800}
            height={500}
            className="w-full object-cover"
          />
        </div>
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
                <span className="font-semibold">Projek:</span> Wakaf Pembinaan
                Sekolah Menengah Sri (SMI) Seremban
              </p>
              <p>
                <span className="font-semibold">Tapak:</span> Lot 29470 &amp;
                Lot 3649, Kampung Panchor, Mukim Ampangan, Daerah Seremban,
                Negeri Sembilan Darul Khusus
              </p>
              <p>
                <span className="font-semibold">Telefon:</span> 06-763 3777
              </p>
              <p>
                <span className="font-semibold">Email:</span> sriseremban@srisbn.edu.my
              </p>
              <p>
                <span className="font-semibold">Maklumat Bayaran:</span>{" "}
                Maybank 5551 3500 5435
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
              Wakaf Sekarang
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
    </div>
  );
}