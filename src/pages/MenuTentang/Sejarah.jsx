import { useEffect } from "react";
import { useState } from "react";
import { SejarahItems } from "../../assets/DataTentang";

const Sejarah = () => {
  const [sejarah, setSejarah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.5:8000/api/posts/sejarah");
      const result = await res.json();
      setSejarah(result.data);
    };
    fetchData();
    setLoading(false);
    console.log(sejarah);
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {sejarah.map((item, index) => (
            <div key={index} className="w-full h-full p-4 lg:px-20">
              <h1 className="font-semibold text-2xl text-center">
                {item.title}
              </h1>
              <p className="text-justify mt-5">{item.container}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Sejarah;
