import { Card } from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import { FaAngleRight, FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Layanan = () => {
  const layananCard = [
    {
      title: "Penelitian",
      link: "/layanan/layanan-penelitian",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam malesuada laoreet orci. Mauris ornare vitae mauris et interdum. Donec sed efficitur ipsum,",
    },
    {
      title: "Pengabdian",
      link: "/layanan/layanan-pengabdian",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam malesuada laoreet orci. Mauris ornare vitae mauris et interdum. Donec sed efficitur ipsum,",
    },
    {
      title: "Kerjasama",
      link: "/layanan/kerjasama",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam malesuada laoreet orci. Mauris ornare vitae mauris et interdum. Donec sed efficitur ipsum,",
    },
  ];

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 container m-auto">
        <h1 className="font-semibold text-2xl text-center mb-5">Layanan</h1>
        <div className="w-full p-4 mt-10 grid grid-rows-1">
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center flex-col gap-20 md:gap-10 md:flex-row">
              {layananCard.map((item, index) => (
                <div key={index} className="mb-10">
                  <div className="w-56 lg:w-72">
                    <Card
                      title={item.title}
                      desc={
                        item.desc.length > 150
                          ? `${item.desc.substring(0, 150)}...`
                          : item.desc
                      }
                    />
                    <div className="mt-5">
                      <div className="w-56 lg:w-72 mb-2">
                        <Button
                          bgcolor="bg-blue-700"
                          txtcolor="text-white"
                          position="flex"
                          justify="justify-between"
                          item="items-center"
                          text="Unduh Panduan"
                          icon={<FaDownload />}
                        />
                      </div>
                      <div className="w-56 lg:w-72 absolute border border-blue-700 rounded-lg">
                        <Link to={item.link}>
                          <Button
                            bgcolor="bg-white"
                            txtcolor="text-blue-700"
                            position="flex"
                            justify="justify-between"
                            item="items-center"
                            text="Read More"
                            icon={<FaAngleRight />}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
