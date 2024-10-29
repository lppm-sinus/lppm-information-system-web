import { useEffect } from "react";
import { useState } from "react";
import { TentangItems } from "../assets/DataTentang";

const Tentang = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://192.168.1.5:8000/api/posts/tentang-kami"
      );
      const result = await response.json();
      setAbout(result.data);
    };
    fetchData();
    setLoading(false);
    console.log(about);
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {about.map((item, index) => (
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

export default Tentang;
