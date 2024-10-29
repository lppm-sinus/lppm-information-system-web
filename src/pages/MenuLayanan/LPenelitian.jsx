import DownLayanan from "@/components/atoms/DownLayanan";

const LPenelitian = () => {
  const MenuPenelitian = [
    {
      title: "Unduh Template",
      url: "https://www.youtube.com/@stmiksinarnusantaraofficia141",
    },
    { title: "Data Penelitian", url: "https://www.tiktok.com/@stmiksinus" },
  ];

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4">
        <h1 className="font-semibold text-2xl text-center">Penelitian</h1>
        <div className="lg:px-20">
          <div className="flex flex-col gap-4 my-10">
            <h2 className="font-semibold text-xl">Kebijakan</h2>
            <p className="text-justify">
              Penelitian Berbasis Masyarakat: Mengembangkan penelitian yang
              berorientasi pada solusi praktis dan dapat diimplementasikan
              langsung di lapangan. Pengabdian kepada Masyarakat: Program
              pengabdian yang melibatkan partisipasi aktif masyarakat dalam
              rangka pemberdayaan dan peningkatan kualitas hidup.Kemitraan dan
              Kolaborasi: Bekerja sama dengan berbagai organisasi, baik lokal
              maupun internasional, untuk memperluas jangkauan dan dampak
              program
            </p>
          </div>
          <div className="my-5 flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Program Unggulan</h2>
            <div className="flex flex-col gap-2 border-b border-slate-400 pb-4">
              <h3>1. Penelitian Berbasis Komunitas</h3>
              <p className="ml-4 text-justify">
                Program ini melibatkan masyarakat secara langsung dalam proses
                penelitian, mulai dari identifikasi masalah hingga pengembangan
                solusi. Penelitian ini difokuskan pada isu-isu lokal yang
                relevan, seperti kesehatan, pendidikan, dan lingkungan.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-b border-slate-400 pb-4">
              <h3>2. Program Pemberdayaan Ekonomi Masyarakat</h3>
              <p className="ml-4 text-justify">
                Melalui program ini, LPPM membantu komunitas lokal untuk
                mengembangkan potensi ekonomi mereka, misalnya melalui pelatihan
                kewirausahaan, pengelolaan sumber daya alam, dan pengembangan
                usaha kecil.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-b border-slate-400 pb-4">
              <h3>3. Kolaborasi Multi-stakeholder</h3>
              <p className="ml-4 text-justify">
                Program ini bertujuan untuk membangun jaringan kolaborasi antara
                berbagai pihak, termasuk akademisi, pemerintah, industri, dan
                masyarakat, guna menciptakan solusi bersama untuk tantangan yang
                dihadapi masyarakat.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-b border-slate-400 pb-4">
              <h3>4. Inovasi Sosial dan Teknologi</h3>
              <p className="ml-4 text-justify">
                LPPM berfokus pada pengembangan inovasi sosial dan teknologi
                yang dapat diterapkan untuk meningkatkan kualitas hidup
                masyarakat, seperti teknologi ramah lingkungan, pendidikan
                berbasis digital, dan solusi kesehatan berbasis teknologi.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-b border-slate-400 pb-4">
              <h3>5. Program Pengembangan Lingkungan Berkelanjutan</h3>
              <p className="ml-4 text-justify">
                Program ini dirancang untuk mendukung inisiatif pelestarian
                lingkungan dan pengelolaan sumber daya alam yang berkelanjutan.
                LPPM bekerja sama dengan komunitas lokal untuk
                mengimplementasikan praktik-praktik ramah lingkungan yang dapat
                dipertahankan dalam jangka panjang.
              </p>
            </div>
          </div>
          <div className="my-5 flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Tujuan</h2>
            <div className="flex flex-col gap-2">
              <p>Mendorong Inovasi dan Penerapan Ilmu Pengetahuan:</p>
              <ul className="flex flex-col gap-2 p-2 text-justify">
                <li>
                  1. LPPM bertujuan untuk mengembangkan dan menerapkan ilmu
                  pengetahuan yang inovatif melalui penelitian yang aplikatif,
                  yang dapat memberikan solusi nyata bagi permasalahan di
                  masyarakat. Pemberdayaan Masyarakat melalui Pengabdian:
                </li>
                <li>
                  2. LPPM bertujuan untuk mengembangkan dan menerapkan ilmu
                  pengetahuan yang inovatif melalui penelitian yang aplikatif,
                  yang dapat memberikan solusi nyata bagi permasalahan di
                  masyarakat. Pemberdayaan Masyarakat melalui Pengabdian:
                </li>
                <li>
                  3. LPPM bertujuan untuk mengembangkan dan menerapkan ilmu
                  pengetahuan yang inovatif melalui penelitian yang aplikatif,
                  yang dapat memberikan solusi nyata bagi permasalahan di
                  masyarakat. Pemberdayaan Masyarakat melalui Pengabdian:
                </li>
                <li>
                  4. LPPM bertujuan untuk mengembangkan dan menerapkan ilmu
                  pengetahuan yang inovatif melalui penelitian yang aplikatif,
                  yang dapat memberikan solusi nyata bagi permasalahan di
                  masyarakat. Pemberdayaan Masyarakat melalui Pengabdian:
                </li>
                <li>
                  5. LPPM bertujuan untuk mengembangkan dan menerapkan ilmu
                  pengetahuan yang inovatif melalui penelitian yang aplikatif,
                  yang dapat memberikan solusi nyata bagi permasalahan di
                  masyarakat. Pemberdayaan Masyarakat melalui Pengabdian:
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DownLayanan data={MenuPenelitian} />
    </div>
  );
};

export default LPenelitian;
