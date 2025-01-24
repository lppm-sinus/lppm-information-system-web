import axios from "axios";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import { useEffect, useState } from "react";
import ActionPages from "../components/molecules/ActionPages";
import { Pagination } from "../components/molecules/Pagination";
import DeleteModal from "../components/molecules/DeleteModal";
import ImportModal from "../components/molecules/ImportModal";
import CheckboxInput from "../components/atoms/CheckboxInput";
import BtnSubmit from "../components/atoms/BtnSubmit";
import FormInput from "../components/atoms/FormInput";
import TableAuthor from "../components/molecules/TableAuthor";
import { useToast } from "@/hooks/use-toast";
import Loader from "../components/atoms/Loader";

//search and export
const AAuthor = () => {
  const [dataAuthor, setDataAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const { toast } = useToast();
  const [formDataModal, setFormDataModal] = useState({
    file: "",
    reset_table: false,
  });

  const fetchDataAuthor = async (url = "/api/authors?page=1", q = "") => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setDataAuthor(res.data.data.data);
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
      const res = await axios.delete(`/api/authors/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowDeleteModal(false);
      fetchDataAuthor();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("file", formDataModal.file);
    const reset = formDataModal.reset_table == true ? 1 : 0;
    formDataToSend.append("reset_table", reset);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formDataToSend.append("file", fileInput.files[0]);
    }

    try {
      const res = await axios.post("/api/authors/import", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowImportModal(false);
      fetchDataAuthor();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormDataModal({ ...formDataModal, reset_table: e.target.checked });
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchDataAuthor(url, search ? `&q=${search}` : "");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataAuthor("/api/authors?page=1", `&q=${search}`);
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
          kinerja={true}
          link="/admin/manajemen-author/action-author"
          setShowImportModal={setShowImportModal}
          search={true}
          value={search}
          setValue={setSearch}
        />
        <TableAuthor
          data={dataAuthor}
          setSelectedId={setSelectedId}
          editPage="/admin/manajemen-author/edit-author/"
          setShowDeleteModal={setShowDeleteModal}
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
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Data Author"
      >
        <form className="w-full mt-10" onSubmit={handleImport}>
          <div className="flex items-center gap-5 w-full">
            <span className="w-1/3">
              <h2 className="font-semibold text-sm">File</h2>
              <p className="text-gray-400 text-xs">only .xls .xlsx .csv</p>
            </span>
            <span className="w-full">
              <FormInput type="file" name="file" />
            </span>
          </div>
          <span className="my-3 flex items-start gap-2">
            <CheckboxInput
              name="reset_table"
              label="Replace Data"
              description="Replace all researches data"
              checked={formDataModal.reset_table}
              onChange={handleChange}
            />
          </span>
          <span className="flex w-full justify-end">
            <BtnSubmit name="Import" />
          </span>
        </form>
      </ImportModal>
    </>
  );
};

export default AAuthor;
