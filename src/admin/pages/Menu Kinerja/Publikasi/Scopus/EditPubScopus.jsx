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

const EditPubScopus = () => {
  const { id } = useParams();
  const [dataPubScopus, setDataPubScopus] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: "scopus",
    identifier: "",
    quartile: "",
    title: "",
    publication_name: "",
    year: "",
    citation: "",
    file: "",
    authors: [],
  });
  let navigate = useNavigate();

  const fetchPubScopus = async () => {
    try {
      const res = await axios.get(`/api/publications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataPubScopus(res.data.data);
      setFormData(res.data.data);
      setSelectedAuthors(res.data.data.authors);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(null);
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
      const res = await axios.patch(`/api/publications/${id}`, submitForm, {
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
    fetchPubScopus();
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
          <h2 className="text-xl font-bold mb-4">Edit Data Publikasi Scopus</h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
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
          <div className="col-span-2">
            <div className="flex items-center gap-2 w-full">
              <span className={`${dataPubScopus.file ? "w-[90%]" : "w-full"}`}>
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
                className={`${
                  dataPubScopus.file ? "w-[10%] mt-7 block" : "hidden"
                }`}
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

export default EditPubScopus;
