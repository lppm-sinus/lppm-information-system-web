import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const EditSetting = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    image: "",
    link_url: "",
  });
  let navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchDataId = async () => {
      try {
        const response = await axios.get(`/api/settings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(response.data.data);
        setData(response.data.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDataId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PATCH");
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("link_url", formData.link_url);

    if (e.target.image?.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post(`/api/settings/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
      toast({
        variant: "destructive",
        description: `Failed to update data`,
      });
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

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Edit Data Settings</h1>
          <div className="w-1/6">
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          {data.category == "social_media" ||
          data.category === "logo_header" ||
          data.category === "logo_footer" ? (
            <>
              <div className="flex justify-between gap-5 w-full">
                <div
                  className={`${
                    data.category === "social_media" ? "w-1/2" : "w-full"
                  } flex items-center gap-2`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-60 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src={`https://lppm.tsu.ac.id/api/storage/${data.image_path}`}
                      alt="Image Now"
                      className="w-60 h-20 object-cover rounded-md"
                    />
                  )}
                  <div className="w-full">
                    <FormInput
                      label={` Logo ${
                        data.category === "social_media"
                          ? "Social Media"
                          : "Institusi"
                      }`}
                      name="image"
                      type="file"
                      onChange={handleChange}
                      error={error?.image}
                    />
                  </div>
                </div>
                {data.category === "social_media" && (
                  <div className="w-1/2">
                    <FormInput
                      label="Link Sosial Media"
                      name="link_url"
                      type="text"
                      value={formData.link_url}
                      onChange={handleChange}
                      error={error?.link_url}
                    />
                  </div>
                )}
              </div>
              <span className="bg-fuchsia-100 p-1 border text-lppm_premier border-lppm_premier rounded-md flex items-center space-x-3">
                <IoInformationCircle size={"20px"} />

                <p className="text-xs ">
                  Untuk menunjang kualitas tampilan dari website, disarankan
                  menggunakan gambar dengan format .png dan dengan background
                  transparan
                </p>
              </span>
              <FormInput
                label={`Nama ${
                  data.category === "social_media"
                    ? "Sosial Media"
                    : "Institusi"
                }`}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={error?.name}
              />
              {(data.category === "logo_header" ||
                data.category === "logo_footer") && (
                <FormInput
                  label="Nama Universitas"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  error={error?.description}
                />
              )}
            </>
          ) : (
            <>
              <FormInput
                label={`Nama ${data.category === "address" ? "Lembaga" : ""}`}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={error?.name}
              />
              <TextAreaInput
                label={`${
                  data.category === "address" ? "Alamat" : "Deskripsi Kontak"
                }`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={error?.description}
              />
            </>
          )}
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditSetting;
