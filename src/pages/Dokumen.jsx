import { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import axios from "axios";
import { useEffect } from "react";
import SkeletonText from "@/components/molecules/SkeletonText";

const Dokumen = () => {
  const [dokumen, setDokumen] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataDokumen = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/dokumen");
      setDokumen(res.data.data);
    } catch (err) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDokumen();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonText />
      ) : (
        <>
          {dokumen.length <= 0 ? (
            <div className="w-full min-h-screen flex justify-center items-center text-slate-400">
              <h1>Maaf Halaman Ini Masih Kosong</h1>
            </div>
          ) : (
            <div className="w-full h-full p-4 lg:px-20">
              <h1 className="font-semibold text-2xl text-center mb-5">
                {dokumen[0]?.page_title}
              </h1>
              <div className="my-10">
                <div className="mt-4 p-4 flex flex-col gap-10">
                  {dokumen.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex md:w-1/2 lg:w-1/3 justify-between items-center border border-slate-500 rounded-lg text-slate-500 hover:text-black ease-in-out duration-200 transition-all cursor-pointer p-2"
                    >
                      <a
                        href={`/api/storage/${item.file_url}`}
                        download
                        className="flex gap-2 w-full"
                      >
                        <div className="flex gap-2 text-start w-full">
                          <p>{index + 1}</p>
                          <p>{item.title}</p>
                        </div>
                      </a>
                      <FaDownload />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dokumen;
