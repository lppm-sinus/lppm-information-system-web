import { ProKebItems } from "../../assets/DataTentang";

const ProKeb = () => {
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center">
          Program & Kebijakan
        </h1>
        <div className="mt-6">
          <h2 className="mb-4 font-semibold text-xl">Program Unggulan</h2>
          <p className="text-justify">{ProKebItems[0].Program}</p>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 font-semibold text-xl">Kebijakan</h2>
          {ProKebItems[1].Kebijakan.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-3 font-semibold">
                <h3>{item.id}</h3>
                <h3>{item.title}</h3>
              </div>
              <p className="text-justify p-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProKeb;
