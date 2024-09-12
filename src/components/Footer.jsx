import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="mt-5 bg-blue-600 font-pop">
        <div className="container p-4 mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full p-2 mb-7 text-white font-medium md:w-1/2 lg:w-1/4">
              <h2 className="font-bold text-2xl mb-5">
                STIMIK Sinar Nusantara
              </h2>
              <p>Kampus Terpadu</p>
              <p>Jl KH Samanhudi 84-86, Laweyan, Surakarta.</p>
              <p>Telp : 00000000</p>
              <p>Email : abc@sinus.ac.id</p>
            </div>

            <div className="w-full p-2 mb-7 text-white font-medium md:w-1/2 lg:w-1/4">
              <h2 className="font-bold text-2xl mb-5">LPPM Office</h2>
              <p>Gedung A Lantai 4 STMIK SINAR NUSANTARA</p>
              <p>Jl KH Samanhudi 84-86</p>
              <p>Laweyan, Surakarta</p>
            </div>

            <div className="w-full p-2 mb-7 text-white font-medium md:w-1/2 lg:w-1/4">
              <h2 className="font-bold text-2xl mb-5">Pintasan</h2>
              <div className="flex flex-col">
                <Link to="/tentang">Tentang Kami</Link>
                <Link to="/publikasi">Publikasi</Link>
                <Link to="/kinerja">Kinerja</Link>
                <Link to="/dokumen">Dokumen</Link>
              </div>
            </div>

            <div className="w-full p-2 mb-7 text-white font-medium md:w-1/2 lg:w-1/4">
              <h2 className="font-bold text-2xl mb-5">Media Sosial</h2>
              <div className="flex flex-wrap">
                <a
                  href="https://www.instagram.com/stmik_sinarnusantara/"
                  className="mr-2 w-10 h-10 flex justify-center items-center bg-white rounded-full text-black hover:bg-[#C13584] hover:text-white transition delay-150"
                >
                  <FaInstagram className="fill-current" />
                </a>
                <a
                  href=""
                  className="mr-2 w-10 h-10 flex justify-center items-center bg-white rounded-full text-black hover:bg-blue-400 hover:text-white transition delay-150"
                >
                  <FaXTwitter className="fill-current" />
                </a>
                <a
                  href="https://www.tiktok.com/@stmiksinus"
                  className="mr-2 w-10 h-10 flex justify-center items-center bg-white rounded-full text-black hover:bg-black hover:text-white transition delay-150"
                >
                  <FaTiktok className="fill-current" />
                </a>
                <a
                  href="https://www.youtube.com/@stmiksinarnusantaraofficia141"
                  className="mr-2 w-10 h-10 flex justify-center items-center bg-white rounded-full text-black hover:bg-red-600 hover:text-white transition delay-150"
                >
                  <FaYoutube className="fill-current" />
                </a>
              </div>
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
