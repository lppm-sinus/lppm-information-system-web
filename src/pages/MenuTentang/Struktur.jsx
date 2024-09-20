import News from "../../components/molecules/News";

const Struktur = () => {
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
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 container m-auto">
        <h1 className="font-semibold text-2xl text-center">Struktur</h1>
        <div className="mt-5 p-2">
          {orgItems.map((item, index) => (
            <div key={index}>
              <News img={item.img} title={item.title} desc={item.desc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Struktur;
