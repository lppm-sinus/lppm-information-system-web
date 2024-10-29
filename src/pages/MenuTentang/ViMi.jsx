import { useEffect } from "react";
import { useState } from "react";
import { ViMiItems } from "../../assets/DataTentang";

const ViMi = () => {
  const [vimi, setVimi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.5:8000/api/posts/visi-misi");
      const response = await res.json();
      setVimi(response.data);
    };
    fetchData();
    setLoading(false);
    console.log(vimi);
  }, []);

  const PageTitle = vimi.length ? vimi[0].page_title : "";

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {vimi.map((item, index) => (
              <div key={index}>
                <div className="my-5">
                  <h1 className="font-semibold text-2xl text-center">
                    {item.title}
                  </h1>
                  <p className="mt-4 text-justify">{item.container}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViMi;
