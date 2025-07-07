import { FaMicroscope, FaRegThumbsUp, FaHand } from "react-icons/fa6";
import Button from "../components/atoms/Button";
import { Card } from "../components/molecules/Card";
import Banner from "../components/molecules/Banner";
import News from "../components/molecules/News";
import { Link } from "react-router-dom";
import { DataBeranda } from "../assets/DataBeranda";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiLovers } from "react-icons/gi";
import { RiCopyrightFill } from "react-icons/ri";
import Loader from "@/admin/components/atoms/Loader";

const Beranda = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [berita, setBerita] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [penelitian, setPenelitian] = useState([]);
  const [pengabdian, setPengabdian] = useState([]);
  const [kerjasama, setKerjasama] = useState([]);
  const [hki, setHki] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDataKegiatan = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/kegiatan");
      setKegiatan(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataBerita = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/berita");
      setBerita(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataCarousel = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/beranda");
      setCarousel(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataPenelitian = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/penelitian");
      setPenelitian(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataPengabdian = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/pengabdian");
      setPengabdian(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataKerjasama = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/kerjasama");
      setKerjasama(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataHki = async () => {
    try {
      const res = await axios.get("/api/posts/by-page/hki");
      setHki(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataKegiatan();
    fetchDataBerita();
    fetchDataCarousel();
    fetchDataPenelitian();
    fetchDataPengabdian();
    fetchDataKerjasama();
    fetchDataHki();
  }, []);

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="font-pop ">
      <Banner data={carousel} />
      <div className="w-full h-full">
        <div className="w-full p-4 mt-5 grid grid-rows-1">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {penelitian.map((item) => (
                <div key={item.id}>
                  <div className="w-56 h-auto lg:w-60">
                    <Card
                      icon={<FaMicroscope className="size-5" />}
                      title={item.title}
                      container={
                        item.container.length > 110
                          ? `${item.container.substring(0, 110)}...`
                          : item.container
                      }
                      button="See Details..."
                      link={`/layanan/layanan-penelitian`}
                    />
                  </div>
                </div>
              ))}
              {pengabdian.map((item) => (
                <div key={item.id}>
                  <div className="w-56 h-auto lg:w-60">
                    <Card
                      icon={<GiLovers className="size-5" />}
                      title={item.title}
                      container={
                        item.container.length > 110
                          ? `${item.container.substring(0, 110)}...`
                          : item.container
                      }
                      button="See Details..."
                      link={`/layanan/layanan-pengabdian`}
                    />
                  </div>
                </div>
              ))}
              {kerjasama.map((item) => (
                <div key={item.id}>
                  <div className="w-56 h-auto lg:w-60">
                    <Card
                      icon={<FaMicroscope className="size-5" />}
                      title={item.title}
                      container={
                        item.container.length > 110
                          ? `${item.container.substring(0, 110)}...`
                          : item.container
                      }
                      button="See Details..."
                      link={`/layanan/layanan-kerjasama`}
                    />
                  </div>
                </div>
              ))}
              {hki.map((item) => (
                <div key={item.id}>
                  <div className="w-56 h-auto lg:w-60">
                    <Card
                      icon={<RiCopyrightFill className="size-5" />}
                      title={item.title}
                      container={
                        item.container.length > 110
                          ? `${item.container.substring(0, 110)}...`
                          : item.container
                      }
                      button="See Details..."
                      link={`/layanan/layanan-hki`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 md:px-10 lg:px-20 mt-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h1 className="font-semibold text-2xl mb-2 lg:mb-0">
              Kegiatan LPPM
            </h1>
            <p className="text-sm text-slate-600">
              Kegiatan LPPM yang berada di STIMIK Sinar Nusantara Surakarta
            </p>
          </div>
        </div>

        <div className="relative md:ml-8 lg:ml-16 flex items-center overflow-x-auto">
          {kegiatan.length <= 0 ? (
            <div className="w-full h-40 flex justify-center items-center text-slate-400">
              <h1>Belom ada kegiatan yang dilaksanakan</h1>
            </div>
          ) : (
            kegiatan?.map((data) => (
              <div key={data.id} className="inline-block p-4">
                <div className="w-52 lg:w-64 h-64 hover:scale-100 ease-in-out duration-100 transition-all cursor-default">
                  <Card
                    title={data.title}
                    container={
                      data.container.length > 150
                        ? `${data.container.substring(0, 150)}...`
                        : data.container
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5 p-4 md:px-10 lg:px-20">
        <h1 className="font-semibold text-2xl">Berita </h1>
        {berita.length <= 0 ? (
          <div className="w-full h-40 flex justify-center items-center text-slate-400">
            <h1>Belom ada berita saat ini</h1>
          </div>
        ) : (
          berita.map((data) => (
            <div key={data.id}>
              <News
                img={`/api/storage/${data.image_url}`}
                title={data.title}
                desc={data.container}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Beranda;
