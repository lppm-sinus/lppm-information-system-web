import { useState } from "react";
import {
  FaDatabase,
  FaUserGraduate,
  FaMicroscope,
  FaHome,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsPersonVideo2 } from "react-icons/bs";
import { RiServiceFill, RiCopyrightFill } from "react-icons/ri";
import { IoNewspaper, IoFileTrayFull, IoDocumentsSharp } from "react-icons/io5";
import { GiLovers } from "react-icons/gi";

import NavItems from "./NavItems";
import {
  FaAngleDown,
  FaAngleUp,
  FaBook,
  FaChartLine,
  FaUsers,
} from "react-icons/fa6";

const SidebarItems = ({ onClose }) => {
  const [openManajemen, setOpenManajemen] = useState(false);
  const [openKinerja, setOpenKinerja] = useState(false);

  const handleOpenManajemen = () => setOpenManajemen(!openManajemen);
  const handleOpenKinerja = () => setOpenKinerja(!openKinerja);

  return (
    <nav className="w-64 h-[calc(100vh-4rem)] bg-white text-lppm_black shadow-lg py-4 px-4 fixed">
      <div className="flex flex-col h-full" onClick={onClose}>
        {/* Master Data Section */}
        <div className="mb-5 flex flex-col justify-start text-sm">
          <NavItems
            link="/admin/dashboard"
            title="Dashboard"
            icon={<FaHome />}
          />
          <div
            className="flex justify-between mt-2 items-center py-2 px-2 w-full text-lppm_black hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={handleOpenManajemen}
          >
            <span className="flex items-center">
              <FaDatabase className="mr-2" />
              Master Data
            </span>
            {openManajemen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {openManajemen && (
            <div className="flex flex-col gap-2 ml-2 mt-2">
              {localStorage.getItem("role") === "superadmin" && (
                <NavItems
                  link="/admin/manajemen-user"
                  title="Manajemen User"
                  icon={<FaUsers />}
                />
              )}
              <NavItems
                link="/admin/manajemen-setting"
                title="Manajemen Setting"
                icon={<FaCog />}
              />
              <NavItems
                link="/admin/manajemen-author"
                title="Author"
                icon={<FaUserGraduate />}
              />
              <NavItems
                link="/admin/manajemen-prodi"
                title="Program Studi"
                icon={<PiListStarFill />}
              />
            </div>
          )}
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Scrollable Pages Section */}
        <div className="mt-4 flex flex-col justify-start gap-2 flex-1 overflow-y-auto">
          <h3 className="text-slate-400 font-medium mb-2 text-sm">Pages</h3>
          <div className="ml-4 flex flex-col gap-2 items-start text-sm">
            <NavItems
              link="/admin/pages-beranda"
              title="Beranda"
              icon={<SiHomeassistantcommunitystore />}
            />
            <NavItems
              link="/admin/pages-tentang"
              title="Tentang Kami"
              icon={<BsPersonVideo2 />}
            />
            <NavItems
              link="/admin/pages-layanan"
              title="Layanan"
              icon={<RiServiceFill />}
            />
            <NavItems
              link="/admin/pages-pusat-studi"
              title="Pusat Studi"
              icon={<IoNewspaper />}
            />
            <NavItems
              link="/admin/pages-publikasi"
              title="Publikasi"
              icon={<FaFileAlt />}
            />

            {/* Kinerja Dropdown */}
            <div
              className="flex justify-between items-center py-2 px-2 w-full text-lppm_black hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={handleOpenKinerja}
            >
              <span className="flex items-center">
                <FaChartLine className="mr-2" />
                Kinerja
              </span>
              {openKinerja ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {openKinerja && (
              <div className="flex flex-col gap-2 ml-3 mt-2">
                <NavItems
                  link="/admin/pages-kinerja/penelitian"
                  title="Penelitian"
                  icon={<FaMicroscope />}
                />
                <NavItems
                  link="/admin/pages-kinerja/pengabdian"
                  title="Pengabdian"
                  icon={<GiLovers />}
                />
                <NavItems
                  link="/admin/pages-kinerja/publikasi"
                  title="Publikasi"
                  icon={<IoFileTrayFull />}
                />
                <NavItems
                  link="/admin/pages-kinerja/hki"
                  title="HKI"
                  icon={<RiCopyrightFill />}
                />
                <NavItems
                  link="/admin/pages-kinerja/buku"
                  title="Buku"
                  icon={<FaBook />}
                />
              </div>
            )}

            {/* Dokumen Menu */}
            <NavItems
              link="/admin/pages-dokumen"
              title="Dokumen"
              icon={<IoDocumentsSharp />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SidebarItems;
