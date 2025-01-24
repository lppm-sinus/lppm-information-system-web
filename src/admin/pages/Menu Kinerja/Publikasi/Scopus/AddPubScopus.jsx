import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import AuthorOption from "@/admin/components/molecules/AuthorOption";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPubScopus = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "scopus",
    identifier: "",
    quartile: "",
    title: "",
    publication_name: "",
    year: "",
    citation: "",
    authors: [],
  });

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
      const res = await axios.post("/api/publications", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        category: "scopus",
        identifier: "",
        quartile: "",
        title: "",
        publication_name: "",
        year: "",
        citation: "",
        authors: [],
      });
      setSelectedAuthors([]);
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
    fetchDataAuthors();
  }, []);

  useEffect(() => {
    const authorsToSend = selectedAuthors.map((author) => author.id);
    setFormData((prev) => ({
      ...prev,
      authors: authorsToSend,
    }));
  }, [selectedAuthors]);

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">
            FInput Data Publikasi Scopus
          </h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2  bg-white p-4 rounded-lg">
          <FormInput
            label="Identifier"
            name="identifier"
            type="text"
            value={formData.identifier || ""}
            onChange={handleChange}
            error={error?.identifier}
          />
          <FormInput
            label="Quartile"
            name="quartile"
            type="text"
            value={formData.quartile || ""}
            onChange={handleChange}
            error={error?.quartile}
          />
          <FormInput
            label="Publication Name"
            name="publication_name"
            type="text"
            value={formData.publication_name || ""}
            onChange={handleChange}
            error={error?.publication_name}
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

export default AddPubScopus;
