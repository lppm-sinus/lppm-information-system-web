import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import AuthorOption from "@/admin/components/molecules/AuthorOption";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBuku = () => {
  const { id } = useParams();
  const [dataBuku, setDataBuku] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tahun_terbit: "",
    isbn: "",
    kategori: "",
    title: "",
    tempat_terbit: "",
    penerbit: "",
    page: "",
    authors: [],
  });
  let navigate = useNavigate();

  const fetchDataBuku = async () => {
    try {
      const res = await axios.get(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataBuku(res.data.data);
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

    try {
      const res = await axios.patch(`/api/books/${id}`, formData, {
        headers: {
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

      toast({
        variant: "destructive",
        description: `Failed to update data`,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDataBuku();
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

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Edit Data Buku</h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2  bg-white p-4 rounded-lg">
          <FormInput
            label="Tahun Terbit"
            name="tahun_terbit"
            type="text"
            value={formData.tahun_terbit || ""}
            onChange={handleChange}
            error={error?.tahun_terbit}
          />
          <FormInput
            label="ISBN"
            name="isbn"
            type="text"
            value={formData.isbn || ""}
            onChange={handleChange}
            error={error?.isbn}
          />
          <span className="col-span-2">
            <FormInput
              label="Kategori"
              name="kategori"
              type="text"
              value={formData.kategori || ""}
              onChange={handleChange}
              error={error?.kategori}
            />
          </span>
          <span className="col-span-2">
            <TextAreaInput
              label="Judul"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={error?.title}
            />
          </span>
          <FormInput
            label="Tempat Terbit"
            name="tempat_terbit"
            type="text"
            value={formData.tempat_terbit || ""}
            onChange={handleChange}
            error={error?.tempat_terbit}
          />
          <FormInput
            label="Penerbit"
            name="penerbit"
            type="text"
            value={formData.penerbit || ""}
            onChange={handleChange}
            error={error?.penerbit}
          />
          <AuthorOption
            authors={authors}
            selectedAuthors={selectedAuthors}
            addAuthor={AddAuthor}
            deleteAuthor={deleteAuthor}
            error={error?.authors}
          />
          <FormInput
            label="Jumlah Halaman"
            name="page"
            type="text"
            value={formData.page || ""}
            onChange={handleChange}
            error={error?.page}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditBuku;
