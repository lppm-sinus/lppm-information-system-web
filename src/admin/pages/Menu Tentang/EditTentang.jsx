import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/admin/components/atoms/Loader";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";

const EditTentang = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "",
    category_id: "",
    status: "",
    image: "",
  });

  let navigate = useNavigate();

  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(null);

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  useEffect(() => {
    const fetchDataId = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(response.data.data);
        setData(response.data.data);
        setError(null);
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
    formDataToSend.append("title", formData.title);
    formDataToSend.append("container", formData.container);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);

    if (e.target.image?.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post(`/api/posts/${id}`, formDataToSend, {
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
      console.log(err);
      setError(
        err.response.data.message
          ? err.response.data.message
          : "An error occurred"
      );
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
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Edit Data Halaman Tentang Kami</h1>
          <div className="w-1/6">
            <BtnSubmit name="Simpan" />
          </div>
        </div>

        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          {/* Input File */}
          {data?.category_id === 2 && (
            <div className="flex items-center gap-2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="image preview"
                  className="w-20 rounded-lg"
                />
              ) : (
                data?.image_url && (
                  <img
                    src={`/api/storage/${data.image_url}`}
                    alt="image post"
                    className="w-20 rounded-lg"
                  />
                )
              )}

              <FormInput
                label="Upload Image"
                type="file"
                name="image"
                onChange={handleChange}
                error={error?.image}
              />
            </div>
          )}

          {/* Title */}
          <div className="flex justify-between gap-5 w-full">
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
                name="status"
                options={optionStatus}
                value={formData.status}
                onChange={handleChange}
                error={error?.status}
              />
            </div>
          </div>
          {data?.page_id === 5 ? (
            <FormInput
              label="Jabatan"
              type="text"
              name="container"
              value={formData.container}
              onChange={handleChange}
              error={error?.container}
            />
          ) : (
            <MyTextEditor
              initialContent={formData.container}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  container: value,
                }));
              }}
            />
          )}
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditTentang;
