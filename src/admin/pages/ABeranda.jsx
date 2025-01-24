import axios from "axios";
import ActionPages from "../components/molecules/ActionPages";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import { Pagination } from "../components/molecules/Pagination";
import DeleteModal from "../components/molecules/DeleteModal";
import { useToast } from "@/hooks/use-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Loader from "../components/atoms/Loader";

const ABeranda = () => {
  const [dataBeranda, setDataBeranda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(6);
  const { toast } = useToast();

  const menuBeranda = [
    {
      id: 1,
      name: "Carousel",
      link: "/admin/pages-beranda/action-carousel",
    },
    {
      id: 2,
      name: "Kegiatan",
      link: "/admin/pages-beranda/action-kegiatan",
    },
    {
      id: 3,
      name: "Berita",
      link: "/admin/pages-beranda/action-berita",
    },
  ];

  const fetchData = async (
    url = "/api/posts/by-parent/beranda",
    q = "",
    filter = ""
  ) => {
    try {
      // Construct the URL with search and filter parameters
      const fullUrl = `${url}${
        url.includes("?") ? "&" : "?"
      }q=${q}&filter=${filter}`;
      const res = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataBeranda(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/${selectedId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSelectedId(null);
      setShowDeleteModal(false);
      fetchData("/api/posts/by-parent/beranda?page=1", search, selectedFilter);
      toast({
        variant: "success",
        description: res.data.message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get("/api/pages/by-parent/beranda", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFilterItem(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchData(url, search, selectedFilter);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData("/api/posts/by-parent/beranda", search, selectedFilter);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Initial data and filter fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchFilters();
      await fetchData(
        "/api/posts/by-parent/beranda?page=1",
        search,
        selectedFilter
      );
    };

    fetchInitialData();
  }, []);

  // Fetch data when filter changes
  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilter(true);
      await fetchData(
        "/api/posts/by-parent/beranda?page=1",
        search,
        selectedFilter
      );
      setLoadingFilter(false);
    };

    fetchFilterData();
  }, [selectedFilter]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <>
        <AdminPageLayout>
          <ActionPages
            parent={true}
            data={menuBeranda}
            search={true}
            value={search}
            setValue={setSearch}
            onFilter={true}
            filter={filterItem}
            all={false}
            setFilter={(id) => setSelectedFilter(id)}
            selectedFilter={selectedFilter}
          />

          {loadingFilter ? (
            <div className="flex w-full justify-center items-center h-[70vh]">
              <Loader />
            </div>
          ) : (
            <>
              {/* Carousel */}
              <div className="flex flex-col space-y-5">
                {dataBeranda.map(
                  (item) =>
                    item.page_id === 6 && (
                      <div
                        className="w-full h-fit flex gap-5 bg-white p-4 rounded-lg shadow-lg"
                        key={item.id}
                      >
                        <span className="w-[40%] flex items-center">
                          {item.image_url && (
                            <img
                              src={`/api/storage/${item.image_url}`}
                              alt={item.title}
                              className=" object-cover rounded-lg"
                            />
                          )}
                        </span>
                        <div className=" flex justify-between w-full items-start">
                          <div className="flex flex-col gap-5">
                            <span>
                              <h1 className="text-sm">Status: </h1>
                              <p className="p-1 max-w-28 text-center text-sm bg-lppm_premier text-white rounded-full">
                                {item.status}
                              </p>
                            </span>
                            <span>
                              <h1 className="text-sm">Judul: </h1>
                              <p className="text-xl font-semibold">
                                {item.title}
                              </p>
                            </span>
                            <span>
                              <h1 className="text-sm">Deskripsi: </h1>
                              <p className="text-">
                                {item.container ? item.container : "-"}
                              </p>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <Link
                              to={`/admin/pages-beranda/edit-beranda/${item.id}`}
                            >
                              <button className="px-3 py-2 text-sm rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                                <FaRegEdit />
                                <span>Sunting</span>
                              </button>
                            </Link>
                            <span
                              onClick={() => {
                                setShowDeleteModal(true);
                                setSelectedId(item.id);
                              }}
                            >
                              <button className="px-3 py-2 text-sm rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                                <FaTrash />
                                <span>Hapus</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Kegiatan LPPM */}
              <div className="flex flex-wrap gap-5 items-center justify-center w-full ">
                {dataBeranda.map(
                  (item) =>
                    item.page_id === 15 && (
                      <div
                        key={item.id}
                        className="w-[45%] h-[330px] border-2 border-lppm_premier bg-white rounded-lg p-4 overflow-y-auto"
                      >
                        <span className="cursor-pointer flex justify-between items-center gap-2">
                          <div className="flex items-center space-x-1 text-sm">
                            <p>Status:</p>
                            <span className="py-1 px-4 bg-lppm_premier text-white rounded-full">
                              <p>{item.status}</p>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <Link
                              to={`/admin/pages-beranda/edit-beranda/${item.id}`}
                            >
                              <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                                <FaRegEdit />
                                <span>Sunting</span>
                              </button>
                            </Link>
                            <span
                              onClick={() => {
                                setShowDeleteModal(true);
                                setSelectedId(item.id);
                              }}
                            >
                              <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                                <FaTrash />
                                <span>Hapus</span>
                              </button>
                            </span>
                          </div>
                        </span>
                        <h1 className="text-center text-xl font-semibold my-5">
                          {item.title}
                        </h1>
                        <p>{item.container}</p>
                      </div>
                    )
                )}
              </div>

              {/* Berita LPPM */}
              <div className="flex flex-col gap-5">
                {dataBeranda.map(
                  (item) =>
                    item.page_id === 16 && (
                      <div
                        className="w-full h-fit flex gap-5 bg-white p-4 rounded-lg shadow-lg"
                        key={item.id}
                      >
                        {item.image_url ? (
                          <img
                            src={`/api/storage/${item.image_url}`}
                            alt={item.title}
                            className="w-32 h-32 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-md animate-pulse"></div>
                        )}
                        <div className=" flex justify-between w-full items-start">
                          <div className="flex flex-col gap-4">
                            <span>
                              <h1 className="font-semibold text-lg">
                                {item.title}
                              </h1>
                              <div className="flex items-center space-x-1 text-xs">
                                <p>Status:</p>
                                <span className="py-1 px-4 bg-lppm_premier text-white rounded-full">
                                  <p>{item.status}</p>
                                </span>
                              </div>
                            </span>
                            <p>{item.container}</p>
                          </div>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <Link
                              to={`/admin/pages-beranda/edit-beranda/${item.id}`}
                            >
                              <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                                <FaRegEdit />
                                <span>Sunting</span>
                              </button>
                            </Link>
                            <span
                              onClick={() => {
                                setShowDeleteModal(true);
                                setSelectedId(item.id);
                              }}
                            >
                              <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                                <FaTrash />
                                <span>Hapus</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>

              {links?.length > 3 && (
                <div className="mt-2">
                  <Pagination
                    data={links}
                    onClick={(url) => {
                      handlePageChange(url);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </AdminPageLayout>
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          itemId={selectedId}
        />
      </>
    </>
  );
};

export default ABeranda;
