import { DataPusatStdy } from "../assets/DataPusatStdy";

const PusatStdy = () => {
  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center mb-5">Pusat Studi</h1>
        <div className="my-10">
          <ul>
            {DataPusatStdy.map((item, index) => (
              <li key={index}>
                {index + 1}. {item.doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PusatStdy;
