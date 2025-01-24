import { useUser } from "@/context/UserContext";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import research from "@/assets/research.png";
import service from "@/assets/service.png";
import publication from "@/assets/publication.png";
import book from "@/assets/books.png";
import hki from "@/assets/hki.png";
import total from "@/assets/total.png";
import dashboard from "@/assets/dashboard.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loader from "../components/atoms/Loader";

const Dashboard = () => {
  const { user } = useUser();
  const [dashboardkinerja, setDashboardKinerja] = useState();
  const [selectedItem, setSelectedItem] = useState("kegiatan");
  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("Leading innovation through research");

  const quotes = [
    "Leading innovation through research",
    "Transforming ideas into impact",
    "Advancing knowledge, empowering change",
    "Research excellence starts here",
    "Building tomorrow through research today",

    // Cybersecurity Warnings
    "Remember: A strong password is your first line of defense",
    "Think twice before clicking - phishing emails are getting smarter",
    "Your data is valuable - protect it like your most precious asset",
    "Security isn't expensive, it's priceless",
    "Stay alert: Cyber threats evolve every day",

    // Technology Insights
    "Innovation distinguishes between a leader and a follower",
    "Technology is best when it brings people together",
    "The best way to predict the future is to create it",
    "In the digital world, every millisecond counts",
    "Code is poetry written in logic",

    // Motivation
    "Small progress is still progress",
    "Your potential is unlimited. Your opportunities are endless",
    "Excellence is not a skill, it's an attitude",
    "Dream big, start small, but most of all, start",
    "Success is built one line of code at a time",

    // Mixed
    "Secure today, successful tomorrow",
    "Innovation meets security - that's where excellence begins",
    "Transform challenges into opportunities",
    "Building the future, one secure connection at a time",
    "Your dedication today shapes tomorrow's technology",
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/dashboard/total-kinerja", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDashboardKinerja(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchDataId = async () => {
    try {
      const res = await axios.get(`/api/posts/by-page/${selectedItem}`);
      setDashboardData(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataId();
  }, []);

  useEffect(() => {
    fetchDataId(`/api/posts/by-page/${selectedItem}`);
  }, [selectedItem]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 10000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <AdminPageLayout>
      <div className="my-4 bg-white w-full mt-10 px-7 py-8 relative rounded-xl shadow-lg">
        <div className="space-y-1">
          <h1 className="font-bold text-xl">Hello, {user.name} 👋</h1>
          <p className="text-gray-600">{quote}</p>
        </div>
        <img src={dashboard} className="absolute -top-10 right-4 h-44" />
      </div>
      <div className="flex w-full h-fit gap-5">
        <div className="w-1/2 flex flex-col flex-wrap gap-5">
          <div className="w-full h-fit bg-white text-lppm_black relative rounded-t-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
            <div className=" flex flex-col">
              <span className="text-start text-[#127d91] text-3xl">
                {dashboardkinerja?.total}
              </span>
              <h1 className="max-w-96 font-semibold text-base">
                Total Kinerja Lembaga Penelitian dan Pengabdian Masyarakat
              </h1>
            </div>
            <img
              src={total}
              className=" h-16 max-w-16 absolute top-4 right-4 bg-[#127d91] p-4 rounded-2xl"
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-full h-fit bg-white text-lppm_black relative rounded-r-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
              <div className=" flex flex-col">
                <span className="text-start text-[#127d91] text-3xl">
                  {dashboardkinerja?.total_researches}
                </span>
                <h1 className="font-semibold text-base">Penelitian</h1>
              </div>
              <img
                src={research}
                className=" h-16 max-w-16 absolute top-4 right-4 bg-[#127d91] p-4 rounded-2xl"
              />
            </div>
            <div className="w-full h-fit bg-white text-lppm_black relative rounded-l-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
              <div className=" flex flex-col">
                <span className="text-start text-[#127d91] text-3xl">
                  {dashboardkinerja?.total_services}
                </span>
                <h1 className="font-semibold text-base">Pengabdian</h1>
              </div>
              <img
                src={service}
                className=" h-16 max-w-16 absolute top-4 right-4 bg-[#127d91] p-4 rounded-2xl"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-full h-fit bg-white text-lppm_black relative rounded-r-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
              <div className=" flex flex-col">
                <span className="text-start text-[#127d91] text-3xl">
                  {dashboardkinerja?.total_publications}
                </span>
                <h1 className="font-semibold text-base">Publikasi</h1>
              </div>
              <img
                src={publication}
                className=" h-16 max-w-16 absolute top-4 right-4 bg-[#127d91] p-4 rounded-2xl"
              />
            </div>
            <div className="w-full h-fit bg-white text-lppm_black relative rounded-l-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
              <div className=" flex flex-col">
                <span className="text-start text-[#127d91] text-3xl">
                  {dashboardkinerja?.total_books}
                </span>
                <h1 className="font-semibold text-base">Buku</h1>
              </div>
              <img
                src={book}
                className=" h-16 max-w-16 absolute top-4 right-4 bg-[#127d91] p-4 rounded-2xl"
              />
            </div>
          </div>
          <div className="w-full h-fit bg-white text-lppm_black relative rounded-b-xl py-4 px-6 flex flex-col justify-start gap-10 shadow-lg">
            <div className=" flex flex-col">
              <span className="text-start text-[#127d91] text-3xl">
                {dashboardkinerja?.total_hki}
              </span>
              <h1 className="font-semibold text-base">
                Hak Kekayaan Intelektual
              </h1>
            </div>
            <img
              src={hki}
              className=" h-16 absolute top-4 right-4 bg-[#127d91] p-4 px-5 rounded-2xl"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5 relative shadow-lg">
          <div className="w-full bg-white h-[452px] overflow-y-auto rounded-l-xl p-4">
            <div className="flex sticky bg-white -top-4 gap-8 mb-5 justify-center p-4">
              <button
                onClick={() => setSelectedItem("kegiatan")}
                className={`${
                  selectedItem === "kegiatan"
                    ? "font-semibold"
                    : "text-gray-300"
                }`}
              >
                Kegiatan
              </button>
              <button
                onClick={() => setSelectedItem("berita")}
                className={`${
                  selectedItem === "berita" ? "font-semibold" : "text-gray-300"
                }`}
              >
                Berita
              </button>
              <button
                onClick={() => setSelectedItem("publikasi")}
                className={`${
                  selectedItem === "publikasi"
                    ? "font-semibold"
                    : "text-gray-300"
                }`}
              >
                Journal
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {dashboardData?.map((item) => (
                <div
                  key={item.id}
                  className="w-full h-fit border-b-2 border-[#127d91] p-2 flex gap-2 text-lppm_premier"
                >
                  {item.image_url && (
                    <img
                      src={`/api/storage/${item.image_url}`}
                      alt="Image"
                      className="min-w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h1 className="text-lg font-semibold">{item.title}</h1>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.container }}
                      ></p>
                    </div>
                    {item.link_url && (
                      <span className="pt-1 pr-1">
                        <a href={item.link_url} target="blank">
                          <FaExternalLinkAlt />
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default Dashboard;
