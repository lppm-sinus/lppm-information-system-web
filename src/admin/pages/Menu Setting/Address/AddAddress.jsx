import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    category: "address",
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const { toast } = useToast();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/settings", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      navigate(-1);
      setFormData({
        category: "address",
        name: "",
        description: "",
      });
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
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Input Data Alamat Institusi</h1>

          <div className="w-1/6 flex items-center gap-2">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <FormInput
            label="Nama Lembaga"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={error?.name}
          />

          <TextAreaInput
            label="Alamat"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            error={error?.description}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddAddress;
