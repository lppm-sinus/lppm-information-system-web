import { useEffect, useState } from "react";
import SkeletonText from "@/components/molecules/SkeletonText";
import axios from "axios";

const PusatStdy = () => {
  const [pusatStudi, setPusatStudi] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDataPusatStudi = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/pusat-studi");
      setPusatStudi(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPusatStudi();
  }, []);
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <h2 className="font-semibold text-2xl text-center">
        {pusatStudi[0]?.title}
      </h2>
      {loading ? (
        <SkeletonText />
      ) : (
        pusatStudi.map((item) => (
          <div className="w-full h-full p-4" key={item.id}>
            <div className="lg:px-20">
              <div
                className="my-5 flex flex-col gap-4 custom-html-styles"
                dangerouslySetInnerHTML={{ __html: item.container }}
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PusatStdy;
