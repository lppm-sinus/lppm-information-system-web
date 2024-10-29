import { DataDokument } from "../assets/DataDokument";
import { FaDownload } from "react-icons/fa6";

const Dokumen = () => {
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center mb-5">Dokumen</h1>
        <div className="my-10">
          <h2>Beberapa panduan mahasiswa dalam melakukan Publikasi :</h2>
          <div className="mt-4 p-4 flex flex-col gap-10">
            {DataDokument.map((item, index) => (
              <div
                key={index}
                className="flex md:w-1/2 lg:w-1/3 justify-between items-center border border-slate-500 rounded-lg text-slate-500 hover:text-black ease-in-out duration-200 transition-all cursor-pointer p-2"
              >
                <div className="flex gap-2">
                  <p>{index + 1}</p>
                  <p>{item.title}</p>
                </div>
                <FaDownload />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dokumen;
