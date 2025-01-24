import axios from "axios";
import ActionPages from "../components/molecules/ActionPages";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import Table from "../components/molecules/Table";
import { Pagination } from "../components/molecules/Pagination";
import DeleteModal from "../components/molecules/DeleteModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye, FaTrash } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import Loader from "../components/atoms/Loader";
import ModalDocument from "../components/molecules/ModalDocument";

const ALayanan = () => {
  const menuLayanan = [
    {
      id: 1,
      name: "Penelitian",
      link: "/admin/pages-layanan/action-layananpenelitian",
    },
    {
      id: 2,
      name: "Pengabdian",
      link: "/admin/pages-layanan/action-layananpengabdian",
    },
    {
      id: 3,
      name: "Kerjasama",
      link: "/admin/pages-layanan/action-layanankerjasama",
    },
    {
      id: 4,
      name: "HKI",
      link: "/admin/pages-layanan/action-layananhki",
    },
  ];
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewDoc, setShowPreviewDoc] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(8);
  const { toast } = useToast();

  const fetchDataLayanan = async (
    url = "/api/posts/by-parent/layanan?page=1",
    q = "",
    filter = ""
  ) => {
    try {
      const res = await axios.get(`${url}?q=${q}&filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLayanan(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterList = async () => {
    const res = await axios.get(`/api/pages/by-parent/layanan`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFilterItem(res.data.data);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedId(null);
      setShowDeleteModal(false);
      fetchDataLayanan(
        "/api/posts/by-parent/layanan?page=1",
        search,
        selectedFilter
      );
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchDataLayanan(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await filterList();
      await fetchDataLayanan(
        "/api/posts/by-parent/layanan?page=1",
        search,
        selectedFilter
      );
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataLayanan(
        `/api/posts/by-parent/layanan?page=1`,
        search,
        selectedFilter
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilter(true);
      await fetchDataLayanan(
        "/api/posts/by-parent/layanan?page=1",
        search,
        selectedFilter
      );
      setLoadingFilter(false);
    };

    fetchFilterData();
  }, [selectedFilter]);

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminPageLayout>
        <ActionPages
          parent={true}
          data={menuLayanan}
          value={search}
          setValue={setSearch}
          onFilter={true}
          filter={filterItem.slice(1)}
          setFilter={(id) => setSelectedFilter(id)}
          selectedFilter={selectedFilter}
        />
        <div className="mt-5  w-full h-full">
          {loadingFilter ? (
            <div className="flex w-full justify-center items-center h-[70vh]">
              <Loader />
            </div>
          ) : (
            <>
              {layanan.map((item) => (
                <div
                  key={item.id}
                  className=" w-full h-fit bg-white rounded-lg p-4 "
                >
                  <span className="cursor-pointer flex justify-between items-center gap-2">
                    <div className="flex items-center space-x-1 text-sm">
                      <p>Status:</p>
                      <span className="py-1 px-4 bg-lppm_premier text-white rounded-full">
                        <p>{item.status}</p>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className="px-3 py-2 text-sm rounded-md flex gap-1 items-center space-x-1 text-lppm_premier bg-lppm_sekunder hover:bg-lppm_sekunder/80"
                        onClick={() => {
                          setShowPreviewDoc(true);
                          setSelectedFile(item.file_url);
                        }}
                      >
                        <FaRegEye />
                        Lihat Dokumen
                      </span>
                      <Link to={`/admin/pages-layanan/edit-layanan/${item.id}`}>
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
                  </span>
                  <h1 className="text-center text-xl font-semibold mb-5">
                    {item.page.title}
                  </h1>
                  <div
                    className="leading-8 prose prose-lg "
                    dangerouslySetInnerHTML={{ __html: item.container }}
                  />
                </div>
              ))}
            </>
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
      </AdminPageLayout>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemId={selectedId}
      />
      <ModalDocument
        isOpen={showPreviewDoc}
        onClose={() => setShowPreviewDoc(false)}
        title="Preview Dokumen"
        url={
          selectedFile
            ? `https://lppm.sinus.ac.id/api/storage/${selectedFile}`
            : ""
        }
      />
    </>
  );
};

export default ALayanan;
