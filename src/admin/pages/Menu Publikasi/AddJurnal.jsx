import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJurnal = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "13",
    category_id: "3",
    status: "",
    image: "",
    link_url: "",
  });

  let navigate = useNavigate();

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("container", formData.container);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("link_url", formData.link_url);

    if (e.target.image.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const response = await axios.post(`/api/posts`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        title: "",
        container: "",
        page_id: "13",
        category_id: "3",
        status: "",
        image: "",
        link_url: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Input Data Publikasi</h2>

          <div className="flex items-center gap-5 w-1/6">
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            {/* Title */}
            <div className="w-1/2">
              <FormInput
                label="Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                error={error?.title}
              />
            </div>

            {/* Status */}
            <div className="w-1/2">
              <FormRadioBtn
                label="Status"
                name="status"
                options={optionStatus}
                value={formData.status}
                onChange={handleChange}
                error={error?.status}
              />
            </div>
          </div>
          <div className="flex justify-between gap-5 w-full">
            {/* Image */}
            <div className="w-1/2">
              <FormInput
                label="Upload Image"
                type="file"
                name="image"
                value={formData.image}
                onChange={handleChange}
                error={error?.image}
              />
            </div>

            {/* Link URL */}
            <div className="w-1/2">
              <FormInput
                label="Link Journal"
                type="text"
                name="link_url"
                value={formData.link_url}
                onChange={handleChange}
                error={error?.link_url}
              />
            </div>
          </div>

          {/* Content */}
          <MyTextEditor
            initialContent={formData.container}
            onChange={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                container: value,
              }));
            }}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddJurnal;
