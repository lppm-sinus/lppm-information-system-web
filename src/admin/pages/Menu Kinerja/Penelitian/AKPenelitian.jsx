import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import CheckboxInput from "@/admin/components/atoms/CheckboxInput";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import ActionPages from "@/admin/components/molecules/ActionPages";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import DeleteModal from "@/admin/components/molecules/DeleteModal";
import ImportModal from "@/admin/components/molecules/ImportModal";
import { Pagination } from "@/admin/components/molecules/Pagination";
import TableResearchAndService from "@/admin/components/molecules/TableResearchAndService";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineSimCardDownload } from "react-icons/md";
import template_research from "@/assets/template/research.xlsx";
import ModalDocument from "../../../components/molecules/ModalDocument";

const AKPenelitian = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [dataPenelitian, setDataPenelitian] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formDataModal, setFormDataModal] = useState({
    file: "",
    reset_table: false,
  });

  const fetchDataPenelitian = async (
    url = "/api/researches?page=1",
    q = ""
  ) => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataPenelitian(res.data.data.data);
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
      const res = await axios.delete(`/api/researches/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedId(null);
      setShowDeleteModal(false);
      fetchDataPenelitian();
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
      const res = await axios.post("/api/researches/import", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowImportModal(false);
      document.querySelector('input[type="file"]').value = "";
      setFormDataModal({
        file: "",
        reset_table: false,
      });
      fetchDataPenelitian();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
      fetchDataPenelitian();
    } catch (err) {
      console.log(err);
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await axios.get("/api/researches/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "penelitian.xlsx"); // or any other extension
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      toast({
        variant: "success",
        description: "File berhasil diunduh",
      });
    } catch (err) {
      // console.log(err);
      toast({
        variant: "destructive",
        description: `${err.message}`,
      });
    }
  };
  const handleChange = (e) => {
    setFormDataModal({ ...formDataModal, reset_table: e.target.checked });
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchDataPenelitian(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    fetchDataPenelitian();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataPenelitian(`/api/researches?page=1`, `&q=${search}`);
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
          link="/admin/pages-kinerja/add-penelitian"
          setShowImportModal={setShowImportModal}
          export={true}
          exportExcel={handleExportExcel}
          search={true}
          value={search}
          setValue={setSearch}
        />
        <TableResearchAndService
          data={dataPenelitian}
          setSelectedId={setSelectedId}
          editPage="/admin/pages-kinerja/edit-penelitian/"
          setShowDeleteModal={setShowDeleteModal}
          setShowPreviewDoc={setShowDoc}
          setSelectedFile={setSelectedDoc}
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
      {/* {showDoc && console.log(previewDoc)} */}
      <ModalDocument
        isOpen={showDoc}
        onClose={() => setShowDoc(false)}
        title="Preview Dokumen"
        url={
          selectedDoc
            ? `https://lppm.sinus.ac.id/api/storage/${selectedDoc}`
            : ""
        }
      />
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Data Penelitian"
        // refreshData={fetchDataPenelitian}
      >
        <form className="w-full mt-10" onSubmit={handleImport}>
          <div className="bg-green-50 p-3 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
            <IoInformationCircle size={"35px"} />
            <p className="text-xs w-2/3">
              Pastikan file yang akan diupload memiliki format seperti template
              berikut ini.
            </p>
            <a
              href={template_research}
              download
              className="text-center px-3 py-2 text-xs bg-lppm_premier text-white rounded-md flex space-x-1 items-center "
            >
              <MdOutlineSimCardDownload size={20} />
              Unduh Template
            </a>
          </div>
          <div className="flex items-center gap-5 w-full">
            <span className="w-1/3">
              <h2 className="font-semibold text-sm">File</h2>
              <p className="text-gray-600 text-xs">only .xls .xlsx .csv</p>
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
            <BtnSubmit name="Tambah" hiddenBack={true} />
          </span>
        </form>
      </ImportModal>
    </>
  );
};

export default AKPenelitian;
