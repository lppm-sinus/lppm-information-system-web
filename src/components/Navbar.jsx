import { useState } from "react";
import { MdDehaze, MdClose } from "react-icons/md";
import Logo from "../../src/assets/logo.png";
import { ButtonDropRight, ButtonUpDrop } from "./atoms/DropDown";
import { SearchBar } from "./atoms/SearchBar";
import KinerjaMenu from "./molecules/KinerjaMenu";
import LayananMenu from "./molecules/LayananMenu";
import { Navitems } from "./molecules/NavItems";
import PublikasiMenu from "./molecules/PublikasiMenu";
import TentangMenu from "./molecules/TentangMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenAbout, setIsOpenAbout] = useState(false);
  const handleOpenAbout = () => {
    setIsOpenAbout(!isOpenAbout);
    setIsOpenService(false);
    setIsOpenPub(false);
    setIsOpenKin(false);
    setIsOpenInt(false);
  };

  const [isOpenService, setIsOpenService] = useState(false);
  const handleOpenService = () => {
    setIsOpenService(!isOpenService);
    setIsOpenAbout(false);
    setIsOpenPub(false);
    setIsOpenKin(false);
    setIsOpenInt(false);
  };

  const [isOpenPub, setIsOpenPub] = useState(false);
  const handleOpenPub = () => {
    setIsOpenPub(!isOpenPub);
    setIsOpenAbout(false);
    setIsOpenService(false);
    setIsOpenKin(false);
    setIsOpenInt(false);
  };
  const [isOpenKin, setIsOpenKin] = useState(false);
  const handleOpenKin = () => {
    setIsOpenKin(!isOpenKin);
    setIsOpenAbout(false);
    setIsOpenService(false);
    setIsOpenPub(false);
    setIsOpenInt(false);
  };
  const [isOpenInt, setIsOpenInt] = useState(false);
  const handleOpenInt = () => {
    setIsOpenInt(!isOpenInt);
  };

  const handleReset = () => {
    setIsOpenAbout(false);
    setIsOpenService(false);
    setIsOpenPub(false);
    setIsOpenKin(false);
    setIsOpenInt(false);
  };

  return (
    <header className="w-full h-20 lg:mb-4 lg:h-28 lg:sticky lg:top-0">
      <nav className="w-full p-4 gap-2 items-center bg-blue-600">
        <div className="flex relative justify-between">
          <div className="mt-3 mr-2 lg:hidden">
            <button onClick={handleOpen}>
              {isOpen ? <MdClose size={"32px"} /> : <MdDehaze size={"32px"} />}
            </button>
          </div>
          <div className="w-full font-pop">
            <div className="flex items-center justify-between">
              <div className="flex items-center ml-2 gap-2">
                <img
                  src={Logo}
                  alt="Logo STIMIK Sinar Nusantara"
                  className="size-12"
                />
                <div className="text-white">
                  <p className="text-[12px] md:text-base lg:text-lg">
                    LEMBAGA PENELITIAN DAN PENGABDIAN MASYARAKAT
                  </p>
                  <p className="text-[10px] md:text-sm lg:text-base">
                    STIMIK SINAR NUSANTARA SURAKARTA
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <SearchBar />
              </div>
            </div>
            <div className="w-full hidden lg:block border-t border-slate-600 mt-4 text-white">
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
                      <div className="fixed mt-10 w-40 h-auto bg-slate-50 rounded-b-lg">
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
                      <div className="fixed mt-10 w-36 h-auto bg-slate-50 rounded-b-lg">
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
                    <ButtonUpDrop action={handleOpenPub} state={isOpenPub} />
                    {isOpenPub && (
                      <div className="fixed mt-10 w-40 h-auto bg-slate-50 rounded-b-lg">
                        <PublikasiMenu
                          state={isOpenPub}
                          action={handleOpenPub}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mx-7">
                  <div className="flex relatice gap-2">
                    <Navitems
                      link="/kinerja"
                      OnClick={handleReset}
                      title="Kinerja"
                    />
                    <ButtonUpDrop action={handleOpenKin} state={isOpenKin} />
                    {isOpenKin && (
                      <div className="fixed mt-10 w-56 h-auto bg-slate-50 rounded-b-lg">
                        <KinerjaMenu action={handleOpenKin} />
                        <div className="flex justify-between p-2 border-b border-slate-400 text-black">
                          <div onClick={handleOpenKin}>
                            <Navitems
                              link="/kinerja/kekayaan-intelektual"
                              title="Kekayaan Intelektual"
                            />
                          </div>
                          <ButtonDropRight
                            action={handleOpenInt}
                            state={isOpenInt}
                          />
                        </div>
                        {isOpenInt && (
                          <div
                            onClick={handleReset}
                            className="fixed right-2 w-36 top-[252px] bg-slate-50 rounded-lg"
                          >
                            <div className="w-full p-2 border-b border-slate-400 text-black">
                              <Navitems
                                link="/kinerja/hak-cipta"
                                title="Hak Cipta"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
            <SearchBar />

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
              <ButtonUpDrop action={handleOpenPub} state={isOpenPub} />
            </div>
            <PublikasiMenu
              state={isOpenPub}
              action={handleOpenPub}
              OnClick={handleOpen}
            />

            <div className="flex justify-between p-2 border-b border-slate-400">
              <Navitems link="/kinerja" OnClick={handleOpen} title="Kinerja" />
              <ButtonUpDrop action={handleOpenKin} state={isOpenKin} />
            </div>
            {isOpenKin && (
              <div className="w-full p-2">
                <KinerjaMenu action={handleOpenKin} OnClick={handleOpen} />
                <div className="flex justify-between p-2 border-b border-slate-400">
                  <Navitems
                    link="/kinerja/kekayaan-intelektual"
                    OnClick={handleOpen}
                    title="Kekayaan Intelektual"
                  />
                  <ButtonUpDrop action={handleOpenInt} state={isOpenInt} />
                </div>
                {isOpenInt && (
                  <div className="w-full p-2 ml-2">
                    <div className="border-b border-slate-400">
                      <Navitems
                        link="/kinerja/hak-cipta"
                        OnClick={handleOpen}
                        title="Hak Cipta"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

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
