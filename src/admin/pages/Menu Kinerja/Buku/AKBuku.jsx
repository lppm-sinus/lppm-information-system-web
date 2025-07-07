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
import { FaTrash } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import template_buku from "@/assets/template/book.xlsx";

const AKBuku = () => {
  const [dataBuku, setDataBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [formDataModal, setFormDataModal] = useState({
    file: "",
    reset_table: false,
  });

  const fetchDataBuku = async (url = "/api/books?page=1", q = "") => {
    try {
      const res = await axios.get(url + q, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataBuku(res.data.data.data);
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
      const res = await axios.delete(`/api/books/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowDeleteModal(false);
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
      const res = await axios.post("/api/books/import", formDataToSend, {
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
      fetchDataBuku();
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
      const res = await axios.get("/api/books/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "buku.xlsx");
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
      fetchDataBuku(url, `&q=${search}`);
    }
  };

  useEffect(() => {
    fetchDataBuku();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataBuku(`/api/books?page=1`, `&q=${search}`);
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
          link="/admin/pages-kinerja/add-buku"
        />
        <div className="max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-xs">
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Tahun Terbit
                </th>
                <th scope="col" className="px-6 py-3">
                  ISBN
                </th>
                <th scope="col" className="px-6 py-3 min-w-40">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 min-w-96">
                  Judul
                </th>
                <th scope="col" className="px-6 py-3">
                  Tempat Terbit
                </th>
                <th scope="col" className="px-6 py-3 min-w-60">
                  Penerbit
                </th>
                <th scope="col" className="px-6 py-3">
                  Halaman
                </th>
                <th scope="col" className="px-6 py-3">
                  Author Members
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {dataBuku.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.tahun_terbit}</td>
                  <td className="px-6 py-3">{item.isbn}</td>
                  <td className="px-6 py-3">{item.kategori}</td>
                  <td className="px-6 py-3">{item.title}</td>
                  <td className="px-6 py-3">{item.tempat_terbit}</td>
                  <td className="px-6 py-3">{item.penerbit}</td>
                  <td className="px-6 py-3">{item.page}</td>
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
                    <Link to={`/admin/pages-kinerja/edit-buku/${item.id}`}>
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
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Data Buku"
      >
        <form className="w-full mt-10" onSubmit={handleImport}>
          <div className="bg-green-50 p-3 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
            <IoInformationCircle size={"35px"} />
            <p className="text-xs w-2/3">
              Pastikan file yang akan diupload memiliki format seperti template
              berikut ini.
            </p>
            <a
              href={template_buku}
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

export default AKBuku;
