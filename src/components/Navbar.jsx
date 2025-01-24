import { useEffect, useState } from "react";
import { MdDehaze, MdClose } from "react-icons/md";
import Logo from "../../src/assets/logo.png";
import { ButtonUpDrop } from "./atoms/DropDown";
import LayananMenu from "./molecules/LayananMenu";
import { Navitems } from "./molecules/NavItems";
import TentangMenu from "./molecules/TentangMenu";
import axios from "axios";

const Navbar = () => {
  const [sosialMedia, setSosialMedia] = useState([]);
  const [logo, setLogo] = useState([]);

  const fetchDataSosmed = async () => {
    try {
      const res = await axios.get("/api/settings/by-category/social_media");
      // console.log(res);
      setSosialMedia(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataLogo = async () => {
    try {
      // console.log(res);
      const res = await axios.get("/api/settings/by-category/logo_header");
      setLogo(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenAbout, setIsOpenAbout] = useState(false);
  const handleOpenAbout = () => {
    setIsOpenAbout(!isOpenAbout);
    setIsOpenService(false);
  };

  const [isOpenService, setIsOpenService] = useState(false);
  const handleOpenService = () => {
    setIsOpenService(!isOpenService);
    setIsOpenAbout(false);
  };

  const handleReset = () => {
    setIsOpenAbout(false);
    setIsOpenService(false);
  };

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

  useEffect(() => {
    fetchDataSosmed();
    fetchDataLogo();
  }, []);

  return (
    <header className="w-full h-20 lg:h-28 lg:sticky lg:top-0 z-50">
      <nav className="w-full pt-4 pb-4 lg:pb-0 gap-2 items-center bg-lppm_premier lg:bg-white">
        <div className="flex relative justify-between bg-lppm lg:bg-white w-full h-full">
          <div className="mt-3 mr-2 ml-4 md:ml-8 lg:hidden text-white">
            <button onClick={handleOpen}>
              {isOpen ? <MdClose size={"32px"} /> : <MdDehaze size={"32px"} />}
            </button>
          </div>
          <div className="w-full font-pop">
            <div className="flex w-full lg:px-16 items-center justify-between">
              {logo.map((item) => (
                <div
                  key={item.id}
                  className="flex lg:w-3/4 items-center ml-2 gap-2"
                >
                  <img
                    src={`/api/storage/${item?.image_path}`}
                    alt="Logo STIMIK Sinar Nusantara"
                    className="size-10"
                  />
                  <div className="text-white font-bold lg:text-black">
                    <p className="text-[12px] md:text-base">
                      {item?.description}
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-base">
                      {item?.name}
                    </p>
                  </div>
                </div>
              ))}
              <div className="hidden lg:flex">
                {sosialMedia.map((item) => (
                  <div className="w-full flex justify-center" key={item.id}>
                    <a
                      href={item.link_url}
                      target="_blank"
                      className="mr-2 group w-10 h-10 flex justify-center items-center rounded-full border text-lppm_premier border-lppm_premier hover:text-white hover:bg-lppm_premier transition-all duration-150 overflow-hidden"
                    >
                      <span className="w-10 h-10 p-2.5 bg-white group-hover:bg-lppm_sekunder group-hover:text-lppm_premier transition delay-100 rounded-full text-black">
                        <img
                          src={`/api/storage/${item.image_path}`}
                          alt="Sosial Media Logo"
                        />
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full pb-4 px-20 pt-1 hidden lg:block border-t border-slate-600 mt-4 text-white bg-lppm_premier">
              <div className="mt-2 flex justify-center items-center">
                <div className="mx-7">
                  <Navitems link="/" OnClick={handleReset} title="Beranda" />
                </div>

                <div className="mx-7">
                  <div className="flex relative gap-2">
                    <Navitems
                      link="/tentang"
                      OnClick={handleReset}
                      title="Tentang Kami"
                    />
                    <ButtonUpDrop
                      action={handleOpenAbout}
                      state={isOpenAbout}
                    />
                    {isOpenAbout && (
                      <div className="fixed mt-11 w-40 h-auto bg-slate-50 rounded-lg">
                        <TentangMenu
                          state={isOpenAbout}
                          action={handleOpenAbout}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mx-7">
                  <div className="flex relative gap-2">
                    <Navitems
                      link="/layanan"
                      OnClick={handleReset}
                      title="Layanan"
                    />
                    <ButtonUpDrop
                      action={handleOpenService}
                      state={isOpenService}
                    />
                    {isOpenService && (
                      <div className="fixed mt-11 w-40 h-auto bg-slate-50 rounded-lg">
                        <LayananMenu
                          state={isOpenService}
                          action={handleOpenService}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mx-7">
                  <Navitems
                    link="/pusat-studi"
                    OnClick={handleReset}
                    title="Pusat Studi"
                  />
                </div>

                <div className="mx-7">
                  <div className="flex relative gap-2">
                    <Navitems
                      link="/publikasi"
                      OnClick={handleReset}
                      title="Publikasi"
                    />
                  </div>
                </div>

                <div className="mx-7">
                  <div className="flex relatice gap-2">
                    <Navitems
                      link="/kinerja-penelitian"
                      OnClick={handleReset}
                      title="Kinerja"
                    />
                  </div>
                </div>

                <div className="mx-7">
                  <Navitems
                    link="/dokumen"
                    OnClick={handleReset}
                    title="Dokumen"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="w-full h-full bg-white absolute z-10 font-pop">
          <div className="px-4 py-3 bg-white container mx-auto">
            <div className="p-2 border-b border-slate-400">
              <Navitems link="/" OnClick={handleOpen} title="Beranda" />
            </div>

            <div className="flex justify-between p-2 border-b border-slate-400">
              <Navitems link="/tentang" OnClick={handleOpen} title="Tentang" />
              <ButtonUpDrop action={handleOpenAbout} state={isOpenAbout} />
            </div>
            <TentangMenu
              state={isOpenAbout}
              action={handleOpenAbout}
              OnClick={handleOpen}
            />

            <div className="flex justify-between p-2 border-b border-slate-400">
              <Navitems link="/layanan" OnClick={handleOpen} title="Layanan" />
              <ButtonUpDrop action={handleOpenService} state={isOpenService} />
            </div>
            <LayananMenu
              state={isOpenService}
              action={handleOpenService}
              OnClick={handleOpen}
            />

            <div className="p-2 border-b border-slate-400">
              <Navitems
                link="/pusat-studi"
                OnClick={handleOpen}
                title="Pusat Studi"
              />
            </div>

            <div className="flex justify-between p-2 border-b border-slate-400">
              <Navitems
                link="/publikasi"
                OnClick={handleOpen}
                title="Publikasi"
              />
            </div>

            <div className="flex justify-between p-2 border-b border-slate-400">
              <Navitems
                link="/kinerja-penelitian"
                OnClick={handleOpen}
                title="Kinerja"
              />
            </div>

            <div className="p-2 border-b border-slate-400">
              <Navitems link="/dokumen" OnClick={handleOpen} title="Dokumen" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
