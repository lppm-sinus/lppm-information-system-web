import { FaRegThumbsUp } from "react-icons/fa6";
import Button from "../components/atoms/Button";
import { Card } from "../components/molecules/Card";
import Banner from "../components/molecules/Banner";
import News from "../components/molecules/News";
import { Link } from "react-router-dom";
import { DataBeranda } from "../assets/DataBeranda";

const Beranda = () => {
  return (
    <div className="font-pop ">
      <Banner />
      {DataBeranda.map((item, index) => (
        <div className="w-full h-full">
          <div className="w-full p-4 mt-5 grid grid-rows-1">
            <div className="flex justify-center items-center">
              <div
                key={index}
                className="flex flex-wrap flex-col justify-center gap-10 md:flex-row"
              >
                {item.CardItems.map((item, index) => (
                  <div key={index}>
                    <div className="w-56 h-auto lg:w-72">
                      <Card
                        icon={<FaRegThumbsUp className="size-7 lg:size-10" />}
                        title={item.title}
                        desc={
                          item.deskripsi.length > 200
                            ? `${item.deskripsi.substring(0, 200)}...`
                            : item.deskripsi
                        }
                      />
                    </div>
                    <div className="w-56 lg:w-72 mt-5">
                      <Link to={item.link}>
                        <Button
                          bgcolor="bg-lppm"
                          txtcolor="text-white"
                          text="See Details"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {item.KegiatanCategory.map((kegiatan, index) => (
            <div key={index}>
              <div className="p-4 md:px-10 lg:px-20 my-10">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h1 className="font-semibold text-2xl mb-2 lg:mb-0">
                    {kegiatan.TitleKegiatan}
                  </h1>
                  <p className="text-sm text-slate-600">
                    {kegiatan.DescKegiatan}
                  </p>
                </div>
              </div>

              <div className="relative md:ml-8 lg:ml-16 flex items-center overflow-x-scroll">
                {kegiatan.DataKegiatan?.map((data) => (
                  <div key={data.id} className="inline-block p-4">
                    <div className="w-52 lg:w-64 hover:scale-100 ease-in-out duration-100 transition-all cursor-pointer">
                      <Card
                        title={data.title}
                        desc={
                          data.desc.length > 200
                            ? `${data.desc.substring(0, 200)}...`
                            : data.desc
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {item.Berita.map((news, index) => (
            <div key={index} className="mt-5 p-4 md:px-10 lg:px-20">
              <h1 className="font-semibold text-2xl">{news.NewsTitle}</h1>
              {news.NewsData?.map((data) => (
                <div key={data.id}>
                  <News
                    img={data.img}
                    title={data.title}
                    desc={data.deskripsi}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Beranda;
