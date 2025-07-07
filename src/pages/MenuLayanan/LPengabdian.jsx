import DownLayanan from "@/components/atoms/DownLayanan";
import SkeletonText from "@/components/molecules/SkeletonText";
import axios from "axios";
import { useEffect, useState } from "react";

const LPengabdian = () => {
  const [pengabdian, setPengabdian] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPengabdian = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/pengabdian");
      setPengabdian(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPengabdian();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonText />
      ) : (
        <>
          {pengabdian.length <= 0 ? (
            <div className="w-full min-h-screen flex justify-center items-center text-slate-400">
              <h1>Maaf Halaman Ini Masih Kosong</h1>
            </div>
          ) : (
            pengabdian.map((item) => (
              <div className="w-full h-full p-4" key={item.id}>
                <div className="lg:px-20">
                  <div className="flex flex-col gap-4 my-10">
                    <h2 className="font-semibold text-2xl text-center">
                      {item.title}
                    </h2>
                  </div>
                  <div
                    className="my-5 flex flex-col gap-4"
                    dangerouslySetInnerHTML={{ __html: item.container }}
                  ></div>
                </div>

                <DownLayanan url={`/api/storage/${item.file_url}`} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default LPengabdian;
