import React from "react";
import axios from "axios";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";

const AddTentang = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "1",
    category_id: "1",
    status: "",
  });
  let navigate = useNavigate();
  const optionStatus = [{ option: "draft" }, { option: "published" }];
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("container", formData.container);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);

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
        page_id: "1",
        category_id: "1",
        image: "",
        status: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      setError(err.response ? err.response.data.errors : "An error occurred");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminPageLayout>
      <form className="" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Input Data Tentang Kami</h2>

          {/* Button */}
          <div className="w-1/6">
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            {/* Title */}
            <div className="w-1/2">
              <FormInput
                label="Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={error?.title}
              />
            </div>

            {/* Status */}
            <div className="w-1/2">
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

export default AddTentang;
