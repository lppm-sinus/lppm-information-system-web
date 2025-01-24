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

const EditPubGoogle = () => {
  const { id } = useParams();
  const [dataPubGoogle, setDataPubGoogle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: "google",
    accreditation: "",
    title: "",
    journal: "",
    year: "",
    citation: "",
    authors: [],
  });
  let navigate = useNavigate();

  const fetchPubGoogle = async () => {
    try {
      const res = await axios.get(`/api/publications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataPubGoogle(res.data.data);
      setFormData(res.data.data);
      setSelectedAuthors(res.data.data.authors);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAuthor = async () => {
    try {
      const res = await axios.get(`/api/authors/list`, {
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
      const res = await axios.patch(`/api/publications/${id}`, formData, {
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
      console.log(err);
      setError(err.response.data.errors);

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
    fetchPubGoogle();
    fetchDataAuthor();
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
          <h2 className="text-xl font-bold mb-4">Edit Data Publikasi Google</h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2  bg-white p-4 rounded-lg">
          <FormInput
            label="Accreditation"
            name="accreditation"
            type="text"
            value={formData.accreditation || ""}
            onChange={handleChange}
            error={error?.accreditation}
          />
          <FormInput
            label="Year"
            name="year"
            type="text"
            value={formData.year || ""}
            onChange={handleChange}
            error={error?.year}
          />
          <span className="col-span-2">
            <TextAreaInput
              label="Journal"
              name="journal"
              value={formData.journal || ""}
              onChange={handleChange}
              error={error?.journal}
            />
          </span>
          <span className="col-span-2">
            <TextAreaInput
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={error?.title}
            />
          </span>

          <AuthorOption
            authors={authors}
            selectedAuthors={selectedAuthors}
            addAuthor={AddAuthor}
            deleteAuthor={deleteAuthor}
            error={error?.authors}
          />
          <FormInput
            label="Citation"
            name="citation"
            type="text"
            value={formData.citation || ""}
            onChange={handleChange}
            error={error?.citation}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditPubGoogle;
