import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import AuthorOption from "@/admin/components/molecules/AuthorOption";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const EditHKI = () => {
  const { id } = useParams();
  const [dataHKI, setDataHKI] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tahun_permohonan: "",
    nomor_permohonan: "",
    kategori: "",
    title: "",
    pemegang_paten: "",
    inventor: "",
    status: "",
    nomor_publikasi: "",
    tanggal_publikasi: new Date().toISOString().slice(0, 10).split("T")[0],
    filing_date: new Date().toISOString().slice(0, 10).split("T")[0],
    reception_date: new Date().toISOString().slice(0, 10).split("T")[0],
    nomor_registrasi: "",
    tanggal_registrasi: new Date().toISOString().slice(0, 10).split("T")[0],
    file: "",
    authors: [],
  });
  let navigate = useNavigate();

  const fetchDataHKI = async () => {
    try {
      const res = await axios.get(`/api/hki/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataHKI(res.data.data);
      setFormData(res.data.data);
      setSelectedAuthors(res.data.data.authors);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAuthors = async () => {
    try {
      const res = await axios.get("/api/authors/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAuthors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const AddAuthor = (id, name) => {
    setSelectedAuthors([
      ...selectedAuthors,
      {
        id: id,
        name: name,
      },
    ]);
  };

  const deleteAuthor = (id) => {
    setSelectedAuthors(selectedAuthors.filter((author) => author.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitForm = new FormData();
    submitForm.append("_method", "PATCH");
    Object.keys(formData).forEach((key) => {
      if (key === "file") {
        if (formData.file) {
          submitForm.append("file", formData.file);
        }
      } else if (key === "authors") {
        if (Array.isArray(formData.authors)) {
          formData.authors.forEach((member, index) => {
            submitForm.append(`authors[${index}]`, JSON.stringify(member));
          });
        }
      } else {
        submitForm.append(key, formData[key]);
      }
    });

    try {
      const res = await axios.patch(`/api/hki/${id}`, submitForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDataHKI();
    fetchDataAuthors();
  }, []);

  useEffect(() => {
    const authorsToSend = selectedAuthors.map((author) => author.id);
    setFormData((prev) => ({
      ...prev,
      authors: authorsToSend,
    }));
  }, [selectedAuthors]);

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  console.log(formData);

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">
            Edit Data Hak Kekayaan Intelektual Data
          </h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-lg">
          <FormInput
            label="Tahun Permohonan"
            name="tahun_permohonan"
            type="text"
            value={formData.tahun_permohonan || ""}
            onChange={handleChange}
            error={error?.tahun_permohonan}
          />
          <FormInput
            label="Nomor Permohonan"
            name="nomor_permohonan"
            type="text"
            value={formData.nomor_permohonan || ""}
            onChange={handleChange}
            error={error?.nomor_permohonan}
          />
          <FormInput
            label="Kategori"
            name="kategori"
            type="text"
            value={formData.kategori || ""}
            onChange={handleChange}
            error={error?.kategori}
          />
          <FormInput
            label="Judul"
            name="title"
            type="text"
            value={formData.title || ""}
            onChange={handleChange}
            error={error?.title}
          />
          <TextAreaInput
            label="Pemegang Paten"
            name="pemegang_paten"
            value={formData.pemegang_paten}
            onChange={handleChange}
            error={error?.pemegang_paten}
          />
          <TextAreaInput
            label="Inventor"
            name="inventor"
            value={formData.inventor}
            onChange={handleChange}
            error={error?.inventor}
          />
          <FormInput
            label="Nomor Publikasi"
            name="nomor_publikasi"
            type="text"
            value={formData.nomor_publikasi || ""}
            onChange={handleChange}
            error={error?.nomor_publikasi}
          />
          <FormInput
            label="Nomor Registrasi"
            name="nomor_registrasi"
            type="text"
            value={formData.nomor_registrasi || ""}
            onChange={handleChange}
            error={error?.nomor_registrasi}
          />
          <FormInput
            label="Tanggal Publikasi"
            name="tanggal_publikasi"
            type="date"
            value={formData.tanggal_publikasi || ""}
            onChange={handleChange}
            error={error?.tanggal_publikasi}
          />
          <FormInput
            label="Filing Date"
            name="filing_date"
            type="date"
            value={formData.filing_date || ""}
            onChange={handleChange}
            error={error?.filing_date}
          />
          <FormInput
            label="Reception Date"
            name="reception_date"
            type="date"
            value={formData.reception_date || ""}
            onChange={handleChange}
            error={error?.reception_date}
          />
          <FormInput
            label="Tanggal Registrasi"
            name="tanggal_registrasi"
            type="date"
            value={formData.tanggal_registrasi || ""}
            onChange={handleChange}
            error={error?.tanggal_registrasi}
          />
          <div className="col-span-2">
            <div className="flex items-center gap-2 w-full">
              <span className={`${dataHKI.file ? "w-[90%]" : "w-full"}`}>
                <FormInput
                  label="Dokumen Pendukung"
                  name="file"
                  type="file"
                  value={formData.file || ""}
                  onChange={handleChange}
                  error={error?.file}
                />
              </span>
              <span
                className={`${dataHKI.file ? "w-[10%] mt-7 block" : "hidden"}`}
              >
                <span className="flex items-center justify-center h-12 w-1/2 border border-gray-300 bg-gray-50 rounded-lg">
                  <FaEye />
                </span>
              </span>
            </div>
          </div>
          <AuthorOption
            authors={authors}
            selectedAuthors={selectedAuthors}
            addAuthor={AddAuthor}
            deleteAuthor={deleteAuthor}
            error={error?.authors}
          />
          <FormInput
            label="Status"
            name="status"
            type="text"
            value={formData.status || ""}
            onChange={handleChange}
            error={error?.status}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditHKI;
