import "quill/dist/quill.snow.css";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";

const AddVisiMisi = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "4",
    category_id: "1",
    status: "",
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
        page_id: "4",
        category_id: "1",
        status: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Input Data Visi & Misi</h1>
          <div className="w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              {/* Title */}
              <FormInput
                label="Title"
                name="title"
                typepe="text"
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

export default AddVisiMisi;
