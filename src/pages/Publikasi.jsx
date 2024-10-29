import { DataPub } from "../assets/DataPub";
import News from "../components/molecules/News";

const Publikasi = () => {
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center mb-5">Publikasi</h1>
        <div className="w-full mt-5 flex flex-col gap-5">
          {DataPub.map((item, index) => (
            <div key={index} className="relative">
              <News
                img={item.img}
                title={item.judul}
                desc={
                  item.desc.length > 150
                    ? `${item.desc.substring(0, 150)}...`
                    : item.desc
                }
                button="Detail Jurnal"
                widthsm="w-full"
                widthlg="w-1/4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publikasi;
