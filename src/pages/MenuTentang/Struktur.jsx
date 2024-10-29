import { useEffect } from "react";
import { useState } from "react";
import News from "../../components/molecules/News";

const Struktur = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.5:8000/api/posts/struktur");
      const response = await res.json();
      setStruktur(response.data);
    };
    fetchData();
    setLoading(false);
    console.log(struktur);
  }, []);

  const orgItems = [
    {
      img: "",
      title: "Ketua LPPM",
      desc: "abcsas",
    },
    {
      img: "",
      title: "Wakil Ketua LPPM",
      desc: "abcsas",
    },
    {
      img: "",
      title: "Sekretaris",
      desc: "abcsas",
    },
    {
      img: "",
      title: "Bendahara",
      desc: "abcsas",
    },
  ];

  const PageTitle = struktur.length ? struktur[0].page_title : "";

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center">{PageTitle}</h1>
        <div className="w-full mt-5 p-2">
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {struktur.map((item, index) => (
                <div key={index}>
                  <News
                    img={item.image_url}
                    title={item.title}
                    desc={item.container.substring(0, 100)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Struktur;
