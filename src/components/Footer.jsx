import { Link } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import Medsos from "./atoms/Medsos";

const Footer = () => {
  const DataMedia = [
    {
      id: 1,
      url: "https://www.instagram.com/stmik_sinarnusantara/",
      icon: "FaInstagram",
      title: "@stmik_sinarnusantara",
    },
    {
      id: 2,
      url: "https://www.tiktok.com/@stmiksinus",
      icon: "FaTiktok",
      title: "@stmiksinus",
    },
    {
      id: 3,
      url: "https://www.youtube.com/@stmiksinarnusantaraofficia141",
      icon: "FaYoutube",
      title: "@stmiksinarnusantaraofficia141",
    },
  ];

  return (
    <footer>
      <div className="mt-5 bg-lppm font-pop">
        <div className="p-4 ">
          <div className="flex justify-center md:space-x-10 md:space-y-2  lg:px-20 flex-wrap">
            <div className=" p-2 mb-10  text-white font-medium flex flex-col items-center">
              <div className="size-32 mb-5 flex self-center">
                <img
                  src={Logo}
                  alt="Logo Univeristas Tiga Serangkai"
                  className="size-full grayscale"
                />
              </div>
              <h2 className="text-xs mb-2">
                LEMBAGA PENELITIAN DAN PENGABDIAN MASYARAKAT
              </h2>
              <h2 className="font-bold text-lg md:text-xl mb-5">
                Universitas Tiga Serangkai
              </h2>
            </div>

            <div className=" p-2 mb-10 text-white font-medium">
              <div className="mb-5">
                <h2 className="font-bold text-xl md:text-xl mb-5">
                  LPPM Office
                </h2>
                <div className="text-sm">
                  <p>Gedung A Lantai 4</p>
                  <p>Universitas Tiga Serangkai</p>
                  <p>Jl KH Samanhudi 84-86, Laweyan, Surakarta</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl md:text-xl mb-5">Kontak</h2>
                <div className="text-sm">
                  <p>Telp : 00000000</p>
                  <p>Email : abc@sinus.ac.id</p>
                </div>
              </div>
            </div>

            <div className=" p-2 text-white font-medium">
              <h2 className="font-bold text-xl md:text-xl mb-5">
                Media Sosial
              </h2>
              {DataMedia.map((item) => (
                <div key={item.id} className="flex flex-wrap">
                  <div className="flex gap-2 mb-3 items-center">
                    <a
                      href={item.url}
                      target="_blank"
                      className="mr-2 w-10 h-10 flex justify-center items-center bg-white rounded-full text-black"
                    >
                      <Medsos iconName={item.icon} />
                    </a>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full p-4 mb-2 text-white mt-10 flex justify-center border-t border-slate-700">
              <h3>@copyright lppmsinus.ac.id</h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
