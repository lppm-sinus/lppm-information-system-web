import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import CheckboxInput from "@/admin/components/atoms/CheckboxInput";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import ActionPages from "@/admin/components/molecules/ActionPages";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import DeleteModal from "@/admin/components/molecules/DeleteModal";
import ImportModal from "@/admin/components/molecules/ImportModal";
import { Pagination } from "@/admin/components/molecules/Pagination";
import TablePublicationGoogle from "@/admin/components/molecules/TablePublicationGoogle";
import TablePublicationScopus from "@/admin/components/molecules/TablePublicationScopus";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineSimCardDownload } from "react-icons/md";
import template_google from "@/assets/template/google.xlsx";
import template_scopus from "@/assets/template/scopus.xlsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const AKPublikasi = () => {
  const [dataPublikasi, setDataPublikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("google");
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { toast } = useToast();
  const [formDataModal, setFormDataModal] = useState({
    category: "",
    file: "",
    reset_table: false,
  });

  const optionStatus = [{ option: "google" }, { option: "scopus" }];

  const categoryItem = [
    {
      id: 1,
      title: "google",
    },
    {
      id: 2,
      title: "scopus",
    },
  ];

  const menuPublikasi = [
    {
      name: "Google",
      link: "/admin/pages-kinerja/publikasi/action-pubication-google",
    },
    {
      name: "Scopus",
      link: "/admin/pages-kinerja/publikasi/action-pubication-scopus",
    },
  ];

  const fetchDataPublikasi = async (
    url = "/api/publications?page=1",
    q = "",
    category = "google"
  ) => {
    try {
      const res = await axios.get(url + `&q=${q}&category=${category}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDataPublikasi(res.data.data.data);
      setLinks(res.data.data.links);
      setPaginationLinks(url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("category", formDataModal.category);
    formDataToSend.append("file", formDataModal.file);
    const reset = formDataModal.reset_table == true ? 1 : 0;
    formDataToSend.append("reset_table", reset);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formDataToSend.append("file", fileInput.files[0]);
    }

    try {
      const res = await axios.post("/api/publications/import", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowImportModal(false);
      document.querySelector('input[type="file"]').value = "";
      setFormDataModal({
        category: "",
        file: "",
        reset_table: false,
      });
      fetchDataPublikasi();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get("/api/publications/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "publications.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast({
        variant: "success",
        description: "File berhasil diunduh",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/publications/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowDeleteModal(false);
      fetchDataPublikasi();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCheck = (e) => {
    setFormDataModal({ ...formDataModal, reset_table: e.target.checked });
  };

  const handleChange = (e) => {
    setFormDataModal({ ...formDataModal, [e.target.name]: e.target.value });
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchDataPublikasi(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataPublikasi(`/api/publications?page=1`, `&q=${search}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    fetchDataPublikasi(
      `/api/publications?page=1`,
      `&q=${search}`,
      `${selectedCategory ? `&category=${selectedCategory}` : ""}`
    );
  }, [selectedCategory]);

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
          parent={true}
          data={menuPublikasi}
          setShowImportModal={setShowImportModal}
          export={handleExport}
          search={true}
          value={search}
          setValue={setSearch}
          onFilter={true}
          filter={categoryItem}
          setFilter={(id) => {
            const category = categoryItem.find((item) => item.id === id);
            setSelectedCategory(category.title.toLowerCase());
          }}
          selectedCategory={selectedCategory}
        />
        {selectedCategory === "google" ? (
          <TablePublicationGoogle
            data={dataPublikasi}
            editPage="/admin/pages-kinerja/publikasi/edit-pubication-google/"
            setSelectedId={setSelectedId}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <TablePublicationScopus
            data={dataPublikasi}
            editPage="/admin/pages-kinerja/publikasi/edit-pubication-scopus/"
            setSelectedId={setSelectedId}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
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
        title="Import Data"
      >
        <form className="w-full mt-10" onSubmit={handleImport}>
          <div className="bg-green-50 p-3 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
            <IoInformationCircle size={"35px"} />
            <p className="text-xs  w-2/3">
              Pastikan file yang akan diupload memiliki format seperti template
              berikut ini.
            </p>
            <div className="w-1/3 relative">
              <div
                className="px-2 py-2 flex justify-between bg-lppm_premier text-white hover:bg-lppm_premier/90 cursor-pointer rounded-md"
                onClick={() => setSelectTemplate(!selectTemplate)}
              >
                <button className="text-xs flex items-center gap-2">
                  <MdOutlineSimCardDownload size={20} />
                  Unduh
                </button>
                {selectTemplate ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {selectTemplate && (
                <div className="absolute text-xs z-10 bg-lppm_premier text-white shadow-lg w-full border rounded-md">
                  <a
                    href={template_google}
                    className="block p-2 hover:text-lppm_sekunder cursor-pointer"
                    download
                  >
                    Template Google
                  </a>
                  <a
                    href={template_scopus}
                    className="block p-2 hover:text-lppm_sekunder cursor-pointer"
                    download
                  >
                    Template Scopus
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 w-full">
            <span className="w-1/3">
              <h2 className="font-semibold text-sm">Category</h2>
            </span>
            <span className="w-full">
              <FormRadioBtn
                options={optionStatus}
                name="category"
                value={formDataModal.category}
                onChange={handleChange}
              />
            </span>
          </div>
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
              onChange={handleChangeCheck}
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

export default AKPublikasi;
