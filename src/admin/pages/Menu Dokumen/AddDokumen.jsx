import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDokumen = () => {
  const [formData, setFormData] = useState({
    title: "",
    page_id: "14",
    category_id: "4",
    status: "",
    file: "",
  });
  let navigate = useNavigate();

  const [error, setError] = useState("");

  const { toast } = useToast();

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("file", formData.file);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formDataToSend.append("file", fileInput.files[0]);
    }

    try {
      const response = await axios.post(`/api/posts`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData({
        title: "",
        page_id: "14",
        category_id: "4",
        status: "",
        file: "",
      });

      navigate(-1);
      toast({
        variant: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.message);
      toast({
        variant: "destructive",
        description: `${err.response.data.message}`,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Input Data Dokumen</h2>

          <div className="flex items-center gap-5 w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <FormInput
            label="Nama Dokumen"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={error?.title}
          />
          <FormRadioBtn
            label="Status"
            options={optionStatus}
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={error?.status}
          />
          <FormInput
            label="Upload File"
            type="file"
            name="file"
            value={formData.file}
            onChange={handleChange}
            error={error?.file}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddDokumen;
