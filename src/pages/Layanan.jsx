import { Card } from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import { FaAngleRight, FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonCard from "@/components/molecules/SkeletonCard";

const Layanan = () => {
  const [penelitian, setPenelitian] = useState([]);
  const [pengabdian, setPengabdian] = useState([]);
  const [kerjasama, setKerjasama] = useState([]);
  const [hki, setHki] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchDataPenelitian();
    fetchDataPengabdian();
    fetchDataKerjasama();
    fetchDataHki();
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="w-full h-full p-4 container m-auto">
          <h1 className="font-semibold text-2xl text-center mb-5">Layanan</h1>
          <div className="w-full p-4 mt-10">
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                {penelitian.map((item) => (
                  <div key={item.id}>
                    <div className="w-56 lg:w-60">
                      <Card
                        title={item.title}
                        container={
                          item.container.length > 180
                            ? `${item.container.substring(0, 180)}...`
                            : item.container
                        }
                      />
                      <div className="mt-5 cursor-pointer">
                        <div className="w-56 lg:w-60 mb-2">
                          <a href={`/api/storage/${item.file_url}`} download>
                            <Button
                              bgcolor="bg-lppm_premier"
                              txtcolor="text-white"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Unduh Panduan"
                              icon={<FaDownload />}
                            />
                          </a>
                        </div>
                        <div className="w-56 lg:w-60 absolute border border-lppm_premier rounded-lg">
                          <Link to={`/layanan/layanan-penelitian`}>
                            <Button
                              bgcolor="bg-white"
                              txtcolor="text-lppm_premier"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Read More"
                              icon={<FaAngleRight />}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {pengabdian.map((item) => (
                  <div key={item.id}>
                    <div className="w-56 lg:w-60">
                      <Card
                        title={item.title}
                        container={
                          item.container.length > 180
                            ? `${item.container.substring(0, 180)}...`
                            : item.container
                        }
                      />
                      <div className="mt-5 cursor-pointer">
                        <div className="w-56 lg:w-60 mb-2">
                          <a href={`/api/storage/${item.file_url}`}>
                            <Button
                              bgcolor="bg-lppm_premier"
                              txtcolor="text-white"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Unduh Panduan"
                              icon={<FaDownload />}
                            />
                          </a>
                        </div>
                        <div className="w-56 lg:w-60 absolute border border-lppm_premier rounded-lg">
                          <Link to={`/layanan/layanan-pengabdian`}>
                            <Button
                              bgcolor="bg-white"
                              txtcolor="text-lppm_premier"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Read More"
                              icon={<FaAngleRight />}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {kerjasama.map((item) => (
                  <div key={item.id}>
                    <div className="w-56 lg:w-60">
                      <Card
                        title={item.title}
                        container={
                          item.container.length > 180
                            ? `${item.container.substring(0, 180)}...`
                            : item.container
                        }
                      />
                      <div className="mt-5 cursor-pointer">
                        <div className="w-56 lg:w-60 mb-2">
                          <a href={`/api/storage/${item.file_url}`}>
                            <Button
                              bgcolor="bg-lppm_premier"
                              txtcolor="text-white"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Unduh Panduan"
                              icon={<FaDownload />}
                            />
                          </a>
                        </div>
                        <div className="w-56 lg:w-60 absolute border border-lppm_premier rounded-lg">
                          <Link to={`/layanan/kerjasama`}>
                            <Button
                              bgcolor="bg-white"
                              txtcolor="text-lppm_premier"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Read More"
                              icon={<FaAngleRight />}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {hki.map((item) => (
                  <div key={item.id}>
                    <div className="w-56 lg:w-60">
                      <Card
                        title={item.title}
                        container={
                          item.container.length > 180
                            ? `${item.container.substring(0, 180)}...`
                            : item.container
                        }
                      />
                      <div className="mt-5 cursor-pointer">
                        <div className="w-56 lg:w-60 mb-2">
                          <a href={`/api/storage/${item.file_url}`}>
                            <Button
                              bgcolor="bg-lppm_premier"
                              txtcolor="text-white"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Unduh Panduan"
                              icon={<FaDownload />}
                            />
                          </a>
                        </div>
                        <div className="w-56 lg:w-60 absolute border border-lppm_premier rounded-lg">
                          <Link to={`/layanan/layanan-haki`}>
                            <Button
                              bgcolor="bg-white"
                              txtcolor="text-lppm_premier"
                              position="flex"
                              justify="justify-between"
                              item="items-center"
                              text="Read More"
                              icon={<FaAngleRight />}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layanan;
