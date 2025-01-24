import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBerita = () => {
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "16",
    category_id: "1",
    status: "",
    image: "",
  });
  let navigate = useNavigate();

  const { toast } = useToast();
  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("container", formData.container);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("image", formData.image);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formDataToSend.append("image", fileInput.files[0]);
    }

    try {
      const res = await axios.post(`/api/posts`, formDataToSend, {
        headers: {
          "Content-Type": "application/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        title: "",
        container: "",
        page_id: "16",
        category_id: "1",
        status: "",
        image: "",
      });
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
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Input Data Berita LPPM</h1>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex items-center gap-2">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-20 rounded-lg"
              />
            )}
            <div className="w-full">
              <FormInput
                label="Image News"
                name="image"
                type="file"
                onChange={handleChange}
                error={error?.image}
              />
            </div>
          </div>
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              {/* Title */}
              <FormInput
                label="Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                error={error?.title}
              />
            </div>
            <div className="w-1/2">
              {/* Status */}
              <FormRadioBtn
                label="Status"
                options={optionStatus}
                name="status"
                value={formData.status}
                onChange={handleChange}
                error={error?.status}
              />
            </div>
          </div>

          {/* Content */}
          <TextAreaInput
            label="Description"
            name="container"
            value={formData.container}
            onChange={handleChange}
            error={error?.container}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddBerita;
