import KinerjaMenu from "../../components/molecules/KinerjaMenu";
import { Link } from "react-router-dom";
import { DataKinerjaPublikasi } from "@/assets/DataKinerjaPublikasi";
import { useState } from "react";
import DropdownKin from "../../components/molecules/DropdownKin";
import TableKin from "@/components/molecules/TableKin";
import ChartKin from "@/components/molecules/ChartKin";

const KPublikasi = () => {
  const [valueProdi, setValueProdi] = useState("Informatika");
  const [valueYear, setValueYear] = useState("2024");
  const DataProdi = [
    "Informatika",
    "Sistem Informasi",
    "Teknik Informatika",
    "Sistem Informasi D3",
    "Sistem Informasi Akuntansi",
  ];
  const Year = ["2020", "2021", "2022", "2023", "2024"];

  const handleValueProdi = (item) => {
    setValueProdi(item);
  };
  const handleValueYear = (item) => {
    setValueYear(item);
  };

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <Link to={"/kinerja"} className="font-semibold text-2xl">
          <h1 className="text-center">Kinerja</h1>
        </Link>
        <div className="flex flex-wrap justify-center gap-5 items-center mt-5">
          <KinerjaMenu />
        </div>
        <div className="mt-10">
          <DropdownKin
            placeholder="Informatika"
            data={DataProdi}
            value={handleValueProdi}
          />
          <div className="border border-black max-h-96 relative mt-5 overflow-y-scroll">
            <div className="p-2">
              <p className="font-semibold text-xl mt-5 text-center">
                {valueProdi}
              </p>
              <div className="mt-5 p-1 md:p-2 inline-block w-full">
                <TableKin data={DataKinerjaPublikasi} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <DropdownKin placeholder="2024" data={Year} value={handleValueYear} />
          <div className="border border-black max-h-60 md:max-h-96 relative mt-5 overflow-y-scroll">
            <div className="p-2">
              <p className="font-semibold text-xl mt-5 text-center">
                {valueYear}
              </p>
              <div className="inline-block w-full">
                <ChartKin
                  data={DataKinerjaPublikasi}
                  dataKey="total"
                  label="prodi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPublikasi;
