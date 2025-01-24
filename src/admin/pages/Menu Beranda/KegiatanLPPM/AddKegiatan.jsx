import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddKegiatan = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "15",
    category_id: "1",
    status: "",
  });
  let navigate = useNavigate();

  const { toast } = useToast();
  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);

      setError(null);
      setFormData({
        title: "",
        container: "",
        page_id: "15",
        category_id: "1",
        status: "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Input Data Kegiatan LPPM</h1>
          <div className="flex gap-5 items-center w-1/6">
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

export default AddKegiatan;
