import axios from "axios";
import { useEffect, useState } from "react";
import FormInput from "../atoms/FormInput";
import BtnSubmit from "../atoms/BtnSubmit";
import { useUser } from "@/context/UserContext";

const BASE_URL = import.meta.env.VITE_API_URL;

const FormSettingData = () => {
  const { user, loading, error, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image_path || "",
      });
      console.log(formData);
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PATCH");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    // formDataToSend.append("image", formData.image);

    if (e.target.image.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }
    const formDataObject = Object.fromEntries(formDataToSend.entries());

    await updateUser(formDataToSend);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg p-6 shadow-lg"
    >
      <div className="mb-5">
        <h1 className="text-xl font-semibold">Profile Information</h1>
        <p className="text-xs">
          Update your account's profile information and email address
        </p>
      </div>

      {/* Show Image Profile */}
      <div className="flex items-center gap-2">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview Image"
            className="w-20 rounded-lg"
          />
        ) : user.image_path ? (
          <div className="mt-2">
            <img
              src={`/api/storage/${user.image_path}`}
              alt="Image description"
              className="w-20 rounded-lg"
            />
          </div>
        ) : (
          <div className="w-20 h-20 bg-gray-500 rounded-lg animate-pulse" />
        )}

        {/* image Profile*/}
        <FormInput
          label="Image Profile"
          type="file"
          name="image"
          onChange={handleChange}
          error={error?.image}
        />
      </div>

      {/* Name */}
      <FormInput
        label="Nama"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={error?.name}
      />

      {/* Email */}
      <FormInput
        label="Email"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={error?.email}
      />
      <div className="w-1/4">
        <BtnSubmit name="Simpan" hiddenBack={true} />
      </div>
    </form>
  );
};

export default FormSettingData;
