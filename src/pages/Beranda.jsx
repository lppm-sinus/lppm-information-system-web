import { FaRegThumbsUp } from "react-icons/fa6";
import Button from "../components/atoms/Button";
import { Card } from "../components/molecules/Card";
import { DataKegiatan } from "../assets/DataKegiatan";
import Banner from "../components/molecules/Banner";
import { DataBerita } from "../assets/DataBerita";
import News from "../components/molecules/News";

const Beranda = () => {
  const cardItems = [
    {
      title: "Penelitian",
      deskripsi:
        "Non qui occaecat minim irure duis qui magna anim cillumullamco. Veniam duis aliquip consectetur irure ut voluptate etnulla minim aute ex laborum. Ea adipisicing laborum ut duiscillum non elit magna. Enim nostrud consectetur consectetur",
    },
    {
      title: "Pengabdian",
      deskripsi:
        "Non qui occaecat minim irure duis qui magna anim cillumullamco. Veniam duis aliquip consectetur irure ut voluptate etnulla minim aute ex laborum. Ea adipisicing laborum ut duiscillum non elit magna. Enim nostrud consectetur consectetur",
    },
    {
      title: "Kerjasama",
      deskripsi:
        "Non qui occaecat minim irure duis qui magna anim cillumullamco. Veniam duis aliquip consectetur irure ut voluptate etnulla minim aute ex laborum. Ea adipisicing laborum ut duiscillum non elit magna. Enim nostrud consectetur consectetur",
    },
  ];
  return (
    <div className="font-pop">
      <div className="w-full h-full">
        <Banner />
        <div className="w-full p-4 grid grid-rows-1">
          <div className="flex flex-wrap flex-col gap-10 md:flex-row justify-center items-center">
            {cardItems.map((item, index) => (
              <div key={index}>
                <div className="w-56 h-64 lg:w-72 lg:h-80">
                  <Card
                    icon={<FaRegThumbsUp className="size-7 lg:size-10" />}
                    title={item.title}
                    desc={item.deskripsi}
                  />
                </div>
                <div className="w-56 lg:w-72">
                  <Button button="See Details" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 my-5">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="font-semibold text-2xl mb-2 lg:mb-0">Kegiatan LPPM</p>
            <p className="text-sm">
              Kegiatan LPPM yang berada di <br /> STIMIK Sinar Nusantara
              Surakarta
            </p>
          </div>
        </div>

        <div className="relative flex items-center overflow-x-scroll">
          {DataKegiatan.map((item, index) => (
            <div key={index} className="inline-block p-4 ">
              <div className="w-52 lg:w-64 hover:scale-100 ease-in-out duration-100 transition-all cursor-pointer">
                <Card title={item.title} desc={item.desc} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4">
          <h1 className="font-semibold text-2xl">Berita Hari Ini</h1>

          {DataBerita.map((item, index) => (
            <div key={index}>
              <News img={item.img} title={item.title} desc={item.deskripsi} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beranda;
