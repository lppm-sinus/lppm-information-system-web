import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import {
  MdDehaze,
  MdClose,
  MdArrowDropDown,
  MdArrowDropUp,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import SidebarItems from "./molecules/SidebarItems";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { FaCircleUser } from "react-icons/fa6";

const BASE_URL = import.meta.env.VITE_API_URL;

const Sidebar = () => {
  const { user, loading, error } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const role = useState(localStorage.getItem("role"));

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogout = () => {
    setOpenProfile(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin";
  };

  return (
    <header className="font-pop fixed top-0 z-50 w-full">
      <div className="py-2 px-4 flex justify-between items-center h-[70px] bg-lppm_premier">
        <div className=" lg:hidden text-white">
          <button onClick={handleSidebar}>
            {isOpen ? <MdClose size={"28px"} /> : <MdDehaze size={"28px"} />}
          </button>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex lg:w-3/4 items-center ml-2 gap-2">
            <img
              src={Logo}
              alt="Universitas Tiga Serangkai"
              className="size-9"
            />
            <div className="font-semibold">
              <h1 className="text-sm text-lppm_sekunder">
                Tiga Serangkai University
              </h1>
              <h2 className="text-sm text-lppm_white font-medium">
                Lembaga Penelitian dan Pengabdian Masyarakat
              </h2>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="flex items-center gap-2" onClick={handleProfile}>
            {user.image_path ? (
              <>
                <img
                  src={`/api/storage/${user.image_path}`}
                  alt="Profile"
                  className="size-10 rounded-full object-cover"
                />
              </>
            ) : (
              <>
                <div className="size-8 text-white">
                  <FaCircleUser size={"100%"} />
                </div>
              </>
            )}
            <span className="text-white">
              {openProfile ? (
                <MdArrowDropUp size={"20px"} />
              ) : (
                <MdArrowDropDown size={"20px"} />
              )}
            </span>
          </button>
        </div>
      </div>
      {isOpen && <SidebarItems onClose={() => setIsOpen(false)} />}
      <div className="hidden lg:block">
        <SidebarItems />
      </div>
      {openProfile && (
        <div className=" right-0 lg:right-4 md:w-60 fixed inset-auto z-50">
          <div
            className="fixed inset-0 bg-black opacity-10"
            onClick={() => setOpenProfile(false)}
          ></div>
          <div className="relative mt-1 lg:right-3 bg-lppm_premier rounded-md p-4 w-52  md:w-60 mx-4">
            <div className="flex items-center gap-2 mb-5">
              {user.image_path ? (
                <>
                  <img
                    src={`/api/storage/${user.image_path}`}
                    alt="Profile"
                    className="size-10 rounded-full object-cover"
                  />
                </>
              ) : (
                <>
                  <div className="size-8 text-white">
                    <FaCircleUser size={"100%"} />
                  </div>
                </>
              )}
              <div className="text-white">
                <h1 className="text-sm md:text-lg mb-1">{user.name}</h1>
                <h1 className="text-[10px] md:text-xs p-1 bg-lppm_sekunder rounded-md text-lppm_premier">
                  {user.role}
                </h1>
              </div>
            </div>
            <hr />
            <div className="my-5 relative text-white text-sm md:text-base group ">
              <Link to="/admin/setting-account">
                <button
                  onClick={handleProfile}
                  className="flex items-center gap-2 pb-1"
                >
                  <MdSettings size={"24px"} />
                  Setting
                </button>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
              </Link>
            </div>
            <div className="mb-2 text-white text-sm md:text-base relative group">
              <button
                className="flex items-center gap-2 w-full pb-1"
                onClick={handleLogout}
              >
                <MdOutlineLogout size={"24px"} />
                Logout
              </button>
              <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Sidebar;
