import SkeletonText from "@/components/molecules/SkeletonText";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DownLayanan from "@/components/atoms/DownLayanan";

const LKerjasama = () => {
  const [kerjasama, setKerjasama] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataKerjasama = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/kerjasama");
      setKerjasama(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataKerjasama();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonText />
      ) : (
        kerjasama.map((item) => (
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
    </div>
  );
};

export default LKerjasama;
