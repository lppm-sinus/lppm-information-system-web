import SkeletonText from "@/components/molecules/SkeletonText";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Tentang = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/tentang-kami");
      // console.log(res);
      setAbout(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonText />
      ) : (
        <>
          {about.map((item) => (
            <div key={item.id} className="w-full h-full p-4 lg:px-20">
              <h1 className="font-semibold text-2xl text-center">
                {item.title}
              </h1>
              <div
                className="text-justify mt-5 custom-html-styles"
                dangerouslySetInnerHTML={{ __html: item.container }}
              ></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tentang;
