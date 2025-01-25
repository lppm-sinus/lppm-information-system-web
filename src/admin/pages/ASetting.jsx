import axios from "axios";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ActionPages from "../components/molecules/ActionPages";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Pagination } from "../components/molecules/Pagination";
import DeleteModal from "../components/molecules/DeleteModal";
import Loader from "../components/atoms/Loader";

const ASetting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { toast } = useToast();

  const menuSettings = [
    {
      id: 1,
      name: "Alamat",
      link: "/admin/manajemen-setting/action-address",
    },
    {
      id: 2,
      name: "Contact",
      link: "/admin/manajemen-setting/action-contact",
    },
    {
      id: 3,
      name: "Logo Header",
      link: "/admin/manajemen-setting/action-logo-header",
    },
    {
      id: 4,
      name: "Logo Footer",
      link: "/admin/manajemen-setting/action-logo-footer",
    },
    {
      id: 5,
      name: "Sosial Media",
      link: "/admin/manajemen-setting/action-social-media",
    },
  ];

  const fetchData = async (url = "/api/settings?page=1", q = "") => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
      setLoading(false);
      setError(null);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/settings/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setSelectedId(null);
      setShowDeleteModal(false);
      fetchData();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (url) => {
    fetchData(url, `&q=${search}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(`/api/settings?page=1`, `&q=${search}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
          data={menuSettings}
          search={true}
          value={search}
          setValue={setSearch}
        />
        <div className="max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-xs">
                <th className="p-2 py-4">No</th>
                <th className="p-2 py-4">Name</th>
                <th className="p-2 py-4">Deskripsi</th>
                <th className="p-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="p-2 py-4">{index + 1}</td>
                  <td className="p-2 py-4">{item.name}</td>
                  <td className="p-2 py-4">
                    {item.description === null || item.description === "null"
                      ? item.link_url
                      : item.description}
                  </td>
                  <td className="p-2 py-4 flex gap-2 cursor-pointer text-center w-fit">
                    <Link
                      to={`/admin/manajemen-setting/edit-settings/${item.id}`}
                    >
                      <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                        <FaRegEdit />
                        <span>Sunting</span>
                      </button>
                    </Link>
                    <span
                      onClick={() => {
                        setSelectedId(item.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                        <FaTrash />
                        <span>Hapus</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
};

export default ASetting;
