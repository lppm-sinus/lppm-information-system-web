import DownLayanan from "@/components/atoms/DownLayanan";

const LPengabdian = () => {
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
        <h1 className="font-semibold text-2xl text-center">Pengabdian</h1>
        <div className="flex flex-col gap-2 my-10 lg:px-20">
          <h2 className="font-semibold text-xl mb-2">
            Tujuan Pengabdian kepada Masyarakat
          </h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
            quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
            risus vel viverra. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer hendrerit massa ut sapien rhoncus, in
            aliquet elit tristique. Morbi quis ipsum placerat nunc vehicula
            faucibus.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <h3 className="font-semibold">
              1. Pemberdayaan dan Peningkatan Kesejahteraan Masyarakat:
            </h3>
            <p className="ml-4 text-justify">
              Program pengabdian bertujuan untuk memberdayakan masyarakat dengan
              memberikan pengetahuan, keterampilan, dan sumber daya yang
              diperlukan untuk meningkatkan kesejahteraan dan kemandirian
              mereka.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              2. Penerapan Ilmu Pengetahuan dan Teknologi:
            </h3>
            <p className="ml-4 text-justify">
              Program pengabdian bertujuan untuk memberdayakan masyarakat dengan
              memberikan pengetahuan, keterampilan, dan sumber daya yang
              diperlukan untuk meningkatkan kesejahteraan dan kemandirian
              mereka.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">3. Pengembangan Potensi Lokal:</h3>
            <p className="ml-4 text-justify">
              Program ini bertujuan untuk mengidentifikasi dan mengembangkan
              potensi lokal, seperti sumber daya alam, budaya, dan ekonomi,
              sehingga masyarakat dapat memanfaatkan kekayaan lokal secara
              optimal untuk meningkatkan taraf hidup mereka.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              4. Meningkatkan Akses terhadap Pendidikan dan Pelatihan:
            </h3>
            <p className="ml-4 text-justify">
              Melalui program pengabdian, lembaga bertujuan untuk meningkatkan
              akses masyarakat terhadap pendidikan, pelatihan, dan informasi
              yang relevanyang pada akhirnya akan meningkatkan kualitas hidup
              dan peluang ekonomi mereka.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              5. Peningkatan Kesehatan dan Lingkungan:
            </h3>
            <p className="ml-4 text-justify">
              Program ini juga bertujuan untuk meningkatkan kesehatan dan
              kualitas lingkungan masyarakat melalui edukasi kesehatan, kampanye
              kebersihan, dan inisiatif pelestarian lingkungan yang melibatkan
              partisipasi aktif dari masyarakat.
            </p>
          </div>
        </div>
      </div>
      <DownLayanan data={MenuPenelitian} />
    </div>
  );
};

export default LPengabdian;
