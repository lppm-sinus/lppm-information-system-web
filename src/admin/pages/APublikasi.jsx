import { useEffect, useState } from "react";
import ActionPages from "../components/molecules/ActionPages";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import Table from "../components/molecules/Table";
import axios from "axios";
import { Pagination } from "../components/molecules/Pagination";
import DeleteModal from "../components/molecules/DeleteModal";
import { useToast } from "@/hooks/use-toast";
import Loader from "../components/atoms/Loader";

const APublikasi = () => {
  const [dataPublikasi, setDataPublikasi] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { toast } = useToast();

  const fetchDataPublikasi = async (
    url = "/api/posts/by-parent/publikasi?page=1",
    q = ""
  ) => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataPublikasi(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
    } catch (err) {
      console.log("Error fetching data: " + err);
    } finally {
      setLoading(false);
    }
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
      fetchDataPublikasi();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchData(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    fetchDataPublikasi();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataPublikasi(
        `/api/posts/by-parent/publikasi?page=1`,
        `&q=${search}`
      );
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
          link="/admin/pages-publikasi/add-publikasi"
          search={true}
          value={search}
          setValue={setSearch}
        />
        <Table
          pages={true}
          dataPages={dataPublikasi}
          editPage="/admin/pages-publikasi/edit-publikasi/"
          setShowDeleteModal={setShowDeleteModal}
          selectedId={setSelectedId}
        />
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

export default APublikasi;
