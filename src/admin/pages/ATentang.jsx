import { useEffect, useState } from "react";
import ActionPages from "../components/molecules/ActionPages";
import { Pagination } from "../components/molecules/Pagination";
import Table from "../components/molecules/Table";
import axios from "axios";
import DeleteModal from "../components/molecules/DeleteModal";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Loader from "../components/atoms/Loader";

const ATentang = () => {
  const [tentang, setTentang] = useState([]);
  const [links, setLinks] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { toast } = useToast();
  const menuTentang = [
    {
      id: 1,
      name: "Tentang",
      link: "/admin/pages-tentang/action-tentang",
    },
    {
      id: 2,
      name: "Sejarah",
      link: "/admin/pages-tentang/action-sejarah",
    },
    {
      id: 3,
      name: "Program & Kebijakan",
      link: "/admin/pages-tentang/action-prokeb",
    },
    {
      id: 4,
      name: "Visi Misi",
      link: "/admin/pages-tentang/action-visimisi",
    },
    {
      id: 5,
      name: "Struktur",
      link: "/admin/pages-tentang/action-struktur",
    },
  ];

  const fetchData = async (
    url = `/api/posts/by-parent/tentang-kami?page=1`, // by-parent
    q = "",
    filter = ""
  ) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${url}?q=${q}&filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTentang(response.data.data.data);
      setLinks(response.data.data.links);
      setPaginationLinks(url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const filterList = async () => {
    const res = await axios.get(`/api/pages/by-parent/tentang-kami`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setLoading(false);
    setFilterItem(res.data.data);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setSelectedId(null);
      setShowDeleteModal(false);
      fetchData(
        `/api/posts/by-parent/tentang-kami?page=1`,
        search,
        selectedFilter
      );
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err);
      console.error("Error deleting data:", err);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchData(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await filterList();
      await fetchData(
        `/api/posts/by-parent/tentang-kami?page=1`,
        search,
        selectedFilter
      );
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(
        `/api/posts/by-parent/tentang-kami?page=1`,
        search,
        selectedFilter
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilter(true);
      await fetchData(
        `/api/posts/by-parent/tentang-kami?page=1`,
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
          data={menuTentang}
          search={false}
          value={search}
          setValue={setSearch}
          onFilter={true}
          filter={filterItem}
          all={false}
          setFilter={(id) => setSelectedFilter(id)}
          selectedFilter={selectedFilter}
        />
        <div className="mt-5 w-full h-full">
          {loadingFilter ? (
            <div className="flex w-full justify-center items-center h-[70vh]">
              <Loader />
            </div>
          ) : (
            <>
              {tentang.map((item) => (
                <div key={item.id}>
                  {item.page_id === 5 ? (
                    <Table
                      pages={true}
                      dataPages={tentang}
                      editPage="/admin/pages-tentang/edit-tentang/"
                      setShowDeleteModal={setShowDeleteModal}
                      selectedId={setSelectedId}
                    />
                  ) : (
                    <div className="w-full h-fit bg-white rounded-lg p-4 shadow-lg">
                      <span className="cursor-pointer flex justify-between items-center gap-2">
                        <div className="flex items-center space-x-1 text-sm">
                          <p>Status:</p>
                          <span className="py-1 px-4 bg-lppm_premier text-white rounded-full">
                            <p>{item.status}</p>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/admin/pages-tentang/edit-tentang/${item.id}`}
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
                      </span>
                      <h1 className="text-center text-xl font-semibold mb-5">
                        {item.title}
                      </h1>
                      <div
                        className="custom-html-styles "
                        dangerouslySetInnerHTML={{ __html: item.container }}
                      />
                    </div>
                  )}
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

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemId={selectedId}
      />
    </>
  );
};

export default ATentang;
