import KinerjaMenu from "../../components/molecules/KinerjaMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TableKin from "@/components/molecules/TableKin";
import ChartKin from "@/components/molecules/ChartKin";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Loader from "@/admin/components/atoms/Loader";

const KPenelitian = () => {
  const [dataPenelitian, setDataPenelitian] = useState([]);
  const [studyProgram, setStudyProgram] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState({ id: 0, name: "All" });
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [dataChart, setDataChart] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [isOpenProdi, setIsOpenProdi] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);

  const handleSelectedYear = (item) => {
    setIsLoadingChart(true);
    setSelectedYear(item);
  };

  const handleSelected = (item) => {
    setIsLoadingTable(true);
    setSelectedProdi(item);
  };

  const fetchDataPenelitian = async (
    url = "/api/researches/grouped-by-scheme",
    filter = ""
  ) => {
    const newUrl = filter ? url + `?study_program_id=${filter}` : url;
    try {
      const res = await axios.get(newUrl);
      // console.log(res);
      setDataPenelitian(res.data.data);
    } catch (err) {
      console.log();
    } finally {
      setIsLoadingTable(false);
    }
  };

  const fetchDataStudyPrograms = async () => {
    try {
      const res = await axios.get("/api/study-programs/list");
      const data = [{ id: 0, name: "All" }, ...res.data.data];
      setStudyProgram(data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataYear = async () => {
    try {
      const res = await axios.get("/api/researches/years");
      // console.log(res);
      const newYear = ["All", ...res.data.data];
      setYear(newYear);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChartData = async (
    url = "/api/researches/chart-data",
    year = ""
  ) => {
    const newUrl = year ? url + `?year=${year}` : url;
    try {
      const res = await axios.get(newUrl);
      console.log(res);
      setDataChart(res.data.data.study_programs);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingChart(false);
    }
  };

  useEffect(() => {
    fetchDataPenelitian();
    fetchDataStudyPrograms();
    fetchDataYear();
    fetchChartData();
  }, []);

  useEffect(() => {
    const filter = selectedProdi.id !== 0 ? selectedProdi.id : "";
    fetchDataPenelitian("/api/researches/grouped-by-scheme", filter);
  }, [selectedProdi]);

  useEffect(() => {
    const year = selectedYear !== "All" ? selectedYear : "";
    fetchChartData("/api/researches/chart-data", year);
  }, [selectedYear]);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <Link to={"/kinerja"} className="font-semibold text-2xl">
          <h1 className="text-center">Kinerja</h1>
        </Link>
        <div className="flex flex-wrap justify-center gap-5 items-center text-sm md:text-base mt-5">
          <KinerjaMenu />
        </div>
        <div className="mt-10">
          {/* <DropdownKin
            data={studyProgram}
            selectedProdi={selectedProdi}
            onSelect={handleSelected}
          /> */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setIsOpenProdi(!isOpenProdi)}
                className="inline-flex items-center justify-between w-56 md:w-64 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-400 rounded-md shadow-sm hover:bg-white focus:outline-none"
              >
                <p className="w-full text-start">{selectedProdi.name}</p>
                <span className="flex justify-end">
                  {isOpenProdi ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </button>
            </div>

            {isOpenProdi && (
              <div className="absolute right-0 z-10 w-52 md:w-64 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  {studyProgram.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleSelected(item);
                        setIsOpenProdi(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="border border-black max-h-96 relative mt-5 overflow-y-auto">
            <div className="p-2">
              <p className="font-semibold text-xl mt-5 text-center">
                {selectedProdi.name}
              </p>
              <div className="mt-5 p-1 md:p-2 inline-block w-full">
                {isLoadingTable ? (
                  <div className=" h-40 w-full flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <TableKin data={dataPenelitian} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          {/* <DropdownKin placeholder="2024" data={Year} value={handleValueYear} /> */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setIsOpenYear(!isOpenYear)}
                className="inline-flex items-center justify-between w-56 md:w-64 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-400 rounded-md shadow-sm hover:bg-white focus:outline-none"
              >
                <p className="w-full text-start">{selectedYear}</p>
                <span className="flex justify-end">
                  {isOpenYear ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </button>
            </div>

            {isOpenYear && (
              <div className="absolute right-0 z-10 w-52 md:w-64 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  {year.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSelectedYear(item);
                        setIsOpenYear(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="border border-black max-h-fit relative mt-5 overflow-y-auto">
            <div className="p-2">
              <p className="font-semibold text-xl mt-5 text-center">
                {selectedYear}
              </p>
              <div className="inline-block w-full">
                {isLoadingChart ? (
                  <div className=" h-40 w-full flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <ChartKin data={dataChart} dataKey="total" label="name" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPenelitian;
