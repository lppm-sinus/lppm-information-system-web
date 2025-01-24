import { useEffect, useState } from "react";
import { DataPub } from "../assets/DataPub";
import News from "../components/molecules/News";
import axios from "axios";
import SkeletonMedia from "@/components/molecules/SkeletonMedia";

const Publikasi = () => {
  const [publikasi, setPublikasi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPublikasi = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/publikasi");
      setPublikasi(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPublikasi();
  }, []);

  console.log(publikasi);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonMedia />
      ) : (
        <div className="w-full h-full p-4 lg:px-20">
          <h1 className="font-semibold text-2xl text-center mb-5">
            {publikasi[0]?.page_title}
          </h1>
          <div className="w-full mt-5 flex flex-col gap-5">
            {publikasi.map((item) => (
              <div key={item.id} className="relative">
                <News
                  img={`/api/storage/${item.image_url}`}
                  title={item.title}
                  container={
                    item.container.length > 150
                      ? `${item.container.substring(0, 150)}...`
                      : item.container
                  }
                  button="Detail Jurnal"
                  url={item.link_url}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Publikasi;
