import axios from "axios";
import ActionPages from "../components/molecules/ActionPages";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import Table from "../components/molecules/Table";
import DeleteModal from "../components/molecules/DeleteModal";
import { Pagination } from "../components/molecules/Pagination";
import { useToast } from "@/hooks/use-toast";
import Loader from "../components/atoms/Loader";
import ModalDocument from "../components/molecules/ModalDocument";

const ADokumen = () => {
  const [dataDokumen, setDataDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewDoc, setShowPreviewDoc] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { toast } = useToast();

  const fetchDataDokumen = async (
    url = "/api/posts/by-parent/dokumen?page=1",
    q = ""
  ) => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataDokumen(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
    } catch (err) {
      console.log(err);
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
      fetchDataDokumen();
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
    fetchDataDokumen();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataDokumen(`/api/posts/by-parent/dokumen?page=1`, `&q=${search}`);
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
          link="/admin/pages-dokumen/add-dokumen"
          search={true}
          value={search}
          setValue={setSearch}
        />
        <Table
          pages={true}
          dataPages={dataDokumen}
          editPage="/admin/pages-dokumen/edit-dokumen/"
          file={true}
          setShowPreviewDoc={setShowPreviewDoc}
          setSelectedFile={setSelectedFile}
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
      <ModalDocument
        isOpen={showPreviewDoc}
        onClose={() => setShowPreviewDoc(false)}
        title="Preview Dokumen"
        url={
          selectedFile
            ? `https://lppm.tsu.ac.id/api/storage/${selectedFile}`
            : ""
        }
      />
    </>
  );
};

export default ADokumen;
