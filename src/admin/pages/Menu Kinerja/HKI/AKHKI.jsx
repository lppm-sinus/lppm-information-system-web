import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import CheckboxInput from "@/admin/components/atoms/CheckboxInput";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import ActionPages from "@/admin/components/molecules/ActionPages";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import DeleteModal from "@/admin/components/molecules/DeleteModal";
import ImportModal from "@/admin/components/molecules/ImportModal";
import { Pagination } from "@/admin/components/molecules/Pagination";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye, FaTrash } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import template_hki from "@/assets/template/hki.xlsx";
import ModalDocument from "../../../components/molecules/ModalDocument";

const AKHKI = () => {
  const [dataHKI, setDataHKI] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showDoc, setShowDoc] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formDataModal, setFormDataModal] = useState({
    file: "",
    reset_table: false,
  });

  const fetchDataHKI = async (url = "/api/hki?page=1", q = "") => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataHKI(res.data.data.data);
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
      const res = await axios.delete(`/api/hki/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowDeleteModal(false);
      fetchDataHKI();
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
      const res = await axios.post("/api/hki/import", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowImportModal(false);
      document.querySelector('input[type="file"]').value = "";
      setFormDataModal({
        file: "",
        reset_table: false,
      });
      fetchDataHKI();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await axios.get("/api/hki/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hki.xlsx");
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

  const handleChange = (e) => {
    setFormDataModal({ ...formDataModal, reset_table: e.target.checked });
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchDataHKI(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    fetchDataHKI();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataHKI(`/api/hki?page=1`, `&q=${search}`);
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
          setShowImportModal={setShowImportModal}
          export={true}
          exportExcel={handleExportExcel}
          search={true}
          value={search}
          setValue={setSearch}
          link="/admin/pages-kinerja/add-hki"
        />
        <div className="max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-xs">
                <th scope="col" className="px-6 py-3" rowSpan={2}>
                  No
                </th>
                <th scope="col" className="px-6 py-3" colSpan={2}>
                  Permohonan
                </th>
                <th scope="col" className="px-6 py-3 min-w-40" rowSpan={2}>
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 min-w-96" rowSpan={2}>
                  Judul
                </th>
                <th scope="col" className="px-6 py-3 min-w-96" rowSpan={2}>
                  Pemegang Paten
                </th>
                <th scope="col" className="px-6 py-3 min-w-96" rowSpan={2}>
                  Inventor
                </th>
                <th scope="col" className="px-6 py-3" rowSpan={2}>
                  Status
                </th>
                <th scope="col" className="px-6 py-3" colSpan={2}>
                  Publikasi
                </th>
                <th scope="col" className="px-6 py-3 min-w-40" rowSpan={2}>
                  Filing Date
                </th>
                <th scope="col" className="px-6 py-3 min-w-40" rowSpan={2}>
                  Reception Date
                </th>
                <th scope="col" className="px-6 py-3" colSpan={2}>
                  Registrasi
                </th>
                <th scope="col" className="px-6 py-3" rowSpan={2}>
                  Author Members
                </th>
                <th scope="col" className="px-6 py-3" rowSpan={2}></th>
              </tr>
              <tr className="text-xs">
                <th scope="col" className="px-6 py-3">
                  Nomor
                </th>
                <th scope="col" className="px-6 py-3 min-w-24">
                  Tahun
                </th>
                <th scope="col" className="px-6 py-3">
                  Nomor
                </th>
                <th scope="col" className="px-6 py-3 min-w-24">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                  Nomor
                </th>
                <th scope="col" className="px-6 py-3 min-w-24">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              {dataHKI.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.nomor_permohonan}</td>
                  <td className="px-6 py-3">{item.tahun_permohonan}</td>
                  <td className="px-6 py-3">{item.kategori}</td>
                  <td className="px-6 py-3">{item.title}</td>
                  <td className="px-6 py-3">{item.pemegang_paten}</td>
                  <td className="px-6 py-3">{item.inventor}</td>
                  <td className="px-6 py-3">{item.status}</td>
                  <td className="px-6 py-3">{item.nomor_publikasi}</td>
                  <td className="px-6 py-3 min-w-40">
                    {item.tanggal_publikasi}
                  </td>
                  <td className="px-6 py-3">{item.filing_date}</td>
                  <td className="px-6 py-3">{item.reception_date}</td>
                  <td className="px-6 py-3">{item.nomor_registrasi}</td>
                  <td className="px-6 py-3 min-w-40">
                    {item.tanggal_registrasi}
                  </td>
                  <td className="px-6 py-3 min-w-[30rem] text-start">
                    {item.authors?.map((author, index) => (
                      <p key={author.id}>
                        {index + 1}. ({author.sinta_id}){" "}
                        {author.title_prefix
                          ? author.title_prefix + ". "
                          : null}
                        {author.name}, {author.title_suffix}
                      </p>
                    ))}
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <span
                      className="px-3 py-2 text-sm cursor-pointer rounded-md flex gap-1 items-center space-x-1 bg-lppm_premier hover:bg-lppm_premier/90 text-white"
                      onClick={() => {
                        if (item.file_path && item.file_path.length > 0) {
                          setShowDoc(true);
                          setSelectedDoc(item.file_path);
                        } else {
                          toast({
                            variant: "destructive",
                            description: `Dokumen tidak ditemukan`,
                          });
                        }
                      }}
                    >
                      <FaRegEye />
                      Dokumen
                    </span>
                    <Link to={`/admin/pages-kinerja/edit-hki/${item.id}`}>
                      <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                        <FaRegEdit />
                        <span>Sunting</span>
                      </button>
                    </Link>
                    <span
                      className="cursor-pointer"
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
        title="Import Data HKI"
      >
        <form className="w-full mt-10" onSubmit={handleImport}>
          <div className="bg-green-50 p-3 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
            <IoInformationCircle size={"35px"} />
            <p className="text-xs w-2/3">
              Pastikan file yang akan diupload memiliki format seperti template
              berikut ini.
            </p>
            <a
              href={template_hki}
              download
              className="px-3 py-2 text-xs bg-lppm_premier text-white text-center rounded-md flex space-x-1 items-center hover:bg-lppm_premier/90"
            >
              <MdOutlineSimCardDownload size={20} />
              Unduh Template
            </a>
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

export default AKHKI;
