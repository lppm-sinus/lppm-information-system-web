import DownLayanan from "@/components/atoms/DownLayanan";
import SkeletonText from "@/components/molecules/SkeletonText";
import axios from "axios";
import { useEffect, useState } from "react";

const LPenelitian = () => {
  const [penelitian, setPenelitian] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPenelitian = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/penelitian");
      setPenelitian(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPenelitian();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonText />
      ) : (
        <>
          {penelitian.length <= 0 ? (
            <div className="w-full min-h-screen flex justify-center items-center text-slate-400">
              <h1>Maaf Halaman Ini Masih Kosong</h1>
            </div>
          ) : (
            penelitian.map((item) => (
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

export default LPenelitian;
