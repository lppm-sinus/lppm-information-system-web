import { useEffect, useState } from "react";
import Logo from "../../src/assets/logo.png";
import Icon from "./atoms/Icon";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  const [logo, setLogo] = useState([]);
  const [address, setAddress] = useState([]);
  const [contact, setContact] = useState([]);
  const [sosialMedia, setSosialMedia] = useState([]);
  const [isLoadingLogo, setIsLoadingLogo] = useState(true);

  const fetchDataLogo = async () => {
    try {
      const res = await axios.get("/api/settings/by-category/logo_footer");
      // console.log(res);
      setLogo(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingLogo(false);
    }
  };

  const fetchDataAddress = async () => {
    try {
      const res = await axios.get("/api/settings/by-category/address");
      // console.log(res);
      setAddress(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataContact = async () => {
    try {
      const res = await axios.get("/api/settings/by-category/contact");
      // console.log(res);
      setContact(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataSosmed = async () => {
    try {
      const res = await axios.get("/api/settings/by-category/social_media");
      // console.log(res);
      setSosialMedia(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataLogo();
    fetchDataAddress();
    fetchDataContact();
    fetchDataSosmed();
  }, []);

  return (
    <footer>
      <div className="mt-5 bg-lppm_premier font-pop">
        <div className="flex flex-wrap justify-center p-4 lg:px-20 ">
          {isLoadingLogo ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
              <Skeleton className="w-[80%] h-20 mx-auto" />
              <Skeleton className="w-[80%] h-5 mx-auto" />
              <Skeleton className="w-[80%] h-5 mx-auto" />
              <Skeleton className="w-[80%] h-5 mx-auto" />
              <Skeleton className="w-[80%] h-5 mx-auto" />
              <Skeleton className="w-[80%] h-5 mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-10 md:space-y-2">
              {logo.map((item) => (
                <div
                  key={item.id}
                  className="p-2 mb-10 md:col-span-2 lg:col-span-1 text-white font-medium flex flex-col items-center"
                >
                  <div className="h-32 mb-5 flex self-center">
                    <img
                      src={`/api/storage/${item?.image_path}`}
                      alt="Logo Univeristas Tiga Serangkai"
                      className="size-full"
                    />
                  </div>
                  <h2 className="text-xs mb-2">{item?.name}</h2>
                  <h2 className="font-bold text-lg md:text-xl mb-5 text-lppm_sekunder">
                    {item?.description}
                  </h2>
                </div>
              ))}

              <div className=" p-2 mb-10 text-white font-medium">
                {address.map((item) => (
                  <div key={item.id} className="mb-5">
                    <h2 className="font-bold text-xl md:text-xl mb-5">
                      {item?.name}
                    </h2>
                    <div className="text-sm">{item?.description}</div>
                  </div>
                ))}
                <h2 className="font-bold text-xl md:text-xl mb-5">
                  {contact[0]?.name}
                </h2>
                {contact.map((item) => (
                  <div key={item.id}>
                    <div className="text-sm">{item?.description}</div>
                  </div>
                ))}
              </div>

              <div className=" p-2 text-white font-medium">
                <h2 className="font-bold text-xl md:text-xl mb-5">
                  Media Sosial
                </h2>
                {sosialMedia.map((item) => (
                  <div key={item.id} className="flex flex-wrap ">
                    <div className="gap-2 mb-3">
                      <a
                        href={item.link_url}
                        target="_blank"
                        className="flex items-center group"
                      >
                        <span className="mr-2 w-10 h-10 p-2.5 flex justify-center items-center bg-white group-hover:bg-lppm_sekunder group-hover:text-lppm_premier transition delay-100 rounded-full text-black">
                          <img
                            src={`/api/storage/${item.image_path}`}
                            alt="Sosial Media Logo"
                          />
                        </span>
                        <h2 className="group-hover:text-lppm_sekunder transition delay-100">
                          {item.name}
                        </h2>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full p-4 mb-2 text-white mt-10 flex justify-center items-center border-t border-lppm_sekunder space-x-2">
            <FaRegCopyright />
            <h3>copyright lppmsinus.ac.id</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
