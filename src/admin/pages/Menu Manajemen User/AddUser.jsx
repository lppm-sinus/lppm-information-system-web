import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import { useToast } from "@/hooks/use-toast";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    image: "",
  });

  let navigate = useNavigate();
  const { toast } = useToast();
  const optionRoles = [{ option: "admin" }, { option: "superadmin" }];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append(
      "password_confirmation",
      formData.password_confirmation
    );
    formDataToSend.append("role", formData.role);
    formDataToSend.append("image", formData.image);

    if (e.target.image.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post(`/api/users`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);

      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        image: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response ? err.response.data.errors : "An error occurred");
      toast({
        variant: "destructive",
        description: "Failed to register new user.",
      });
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, [e.target.name]: file });
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
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Input Data User</h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              <div className="flex items-center gap-2">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )}
                {/* image Profile*/}
                <FormInput
                  label="Image Profile"
                  type="file"
                  name="image"
                  // value={formData.image || ""}
                  onChange={handleChange}
                  error={error?.image}
                />
              </div>
            </div>
            <div className="w-1/2">
              {/* role */}
              <FormRadioBtn
                label="Role"
                options={optionRoles}
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
                error={error?.role}
              />
            </div>
          </div>
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              {/* Name */}
              <FormInput
                label="Nama"
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                error={error?.name}
              />
            </div>
            <div className="w-1/2">
              {/* email */}
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                error={error?.email}
              />
            </div>
          </div>

          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              {/* password */}
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                error={error?.password}
              />
            </div>
            <div className="w-1/2">
              <FormInput
                label="Confirm Password"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation || ""}
                onChange={handleChange}
                error={error?.password_confirmation}
              />
            </div>
          </div>
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddUser;
