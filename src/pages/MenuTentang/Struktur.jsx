import { useEffect } from "react";
import { useState } from "react";
import News from "../../components/molecules/News";
import axios from "axios";
import SkeletonMedia from "@/components/molecules/SkeletonMedia";

const Struktur = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/struktur");
      setStruktur(res.data.data);
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
      <h1 className="font-semibold text-2xl text-center">
        {struktur[0]?.page_title}
      </h1>
      {loading ? (
        <SkeletonMedia />
      ) : (
        <>
          {struktur.length <= 0 ? (
            <div className="w-full min-h-screen flex justify-center items-center text-slate-400">
              <h1>Maaf Halaman Ini Masih Kosong</h1>
            </div>
          ) : (
            struktur.map((item) => (
              <div key={item.id} className="w-full h-full p-4 lg:px-20">
                <div key={item.id}>
                  <News
                    img={`/api/storage/${item.image_url}`}
                    title={item.title}
                    desc={item.container}
                  />
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Struktur;

{
}
