import axios from "axios";
import ActionPages from "../components/molecules/ActionPages";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "../components/molecules/DeleteModal";
import Loader from "../components/atoms/Loader";
import { Pagination } from "../components/molecules/Pagination";
import { useToast } from "@/hooks/use-toast";

const AProgramStudi = () => {
  const [dataProdi, setDataProdi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { toast } = useToast();

  const fetchProdi = async (url = "/api/study-programs?page=1", q = "") => {
    try {
      const newUrl = `${url}${url.includes("?") ? "&" : "?"}q=${q}`;
      const res = await axios.get(newUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataProdi(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/study-programs/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowDeleteModal(false);
      fetchProdi();
      console.log(res);

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
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      if (search) params.set("q", search);
      urlObj.search = params.toString();
      fetchProdi(urlObj.toString());
    }
  };

  useEffect(() => {
    fetchProdi("/api/study-programs?page=1", search);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProdi("/api/study-programs", search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminPageLayout>
        <ActionPages
          link="/admin/manajemen-prodi/action-prodi"
          setShowDeleteModal={setShowDeleteModal}
          search={true}
          value={search}
          setValue={setSearch}
        />
        <div className="flex flex-wrap justify-between items-center gap-5">
          {dataProdi.map((prodi) => (
            <div
              key={prodi.id}
              className="w-[49%] h-[330px] border-2 border-lppm_premier bg-white rounded-lg p-4"
            >
              <div className="mb-5 flex items-center justify-between">
                <h1 className="text-lg font-semibold">{prodi.name}</h1>

                <span className="flex items-center gap-2">
                  <Link to={`/admin/manajemen-prodi/edit-prodi/${prodi.id}`}>
                    <button className="px-2.5 py-2 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                      <FaRegEdit />
                      <span>Sunting</span>
                    </button>
                  </Link>
                  <span
                    onClick={() => {
                      setSelectedId(prodi.id);
                      setShowDeleteModal(true);
                    }}
                    className="cursor-pointer"
                  >
                    <button className="px-2.5 py-2 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                      <FaTrash />
                      <span>Hapus</span>
                    </button>
                  </span>
                </span>
              </div>
              <h2 className="text-sm mb-2">Related Authors:</h2>
              <div className="h-52 overflow-y-auto space-y-2">
                {prodi.authors.map((author) => (
                  <div
                    key={author.id}
                    className="text-sm rounded-full bg-lppm_premier text-lppm_white py-2 px-4"
                  >
                    <h1>
                      {author.nidn + ` - `}
                      {author.title_prefix ? author.title_prefix + `. ` : ""}
                      {author.name + author.title_suffix}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

export default AProgramStudi;
