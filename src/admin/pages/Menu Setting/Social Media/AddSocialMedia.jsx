import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddSocialMedia = () => {
  const [formData, setFormData] = useState({
    category: "social_media",
    name: "",
    image: "",
    link: "",
  });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { toast } = useToast();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("link_url", formData.link);

    if (e.target.image.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post("/api/settings", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        category: "social_media",
        name: "",
        image: "",
        link: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
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
          <h1 className="text-xl font-bold">Input Data Sosial Media</h1>
          <div className="w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2 flex items-center gap-2">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Logo Preview"
                  className="w-20 rounded-lg"
                />
              )}
              <div className="w-full">
                <FormInput
                  label="Logo Sosial Media"
                  name="image"
                  type="file"
                  onChange={handleChange}
                  error={error?.image}
                />
              </div>
            </div>

            <div className="w-1/2">
              <FormInput
                label="Link Sosial Media"
                name="link"
                type="text"
                value={formData.link}
                onChange={handleChange}
                error={error?.link_url}
              />
            </div>
          </div>
          <span className="bg-fuchsia-100 p-1 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
            <IoInformationCircle size={20} />

            <p className="text-xs ">
              Untuk menunjang kualitas tampilan dari website, disarankan
              menggunakan gambar dengan format .png dan dengan background
              transparan
            </p>
          </span>

          <FormInput
            label="Nama Sosial Media"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={error?.name}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddSocialMedia;
