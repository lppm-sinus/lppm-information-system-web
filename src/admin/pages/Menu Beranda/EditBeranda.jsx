import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBeranda = () => {
  const { id } = useParams();
  const [dataBeranda, setDataBeranda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const optionStatus = [{ option: "draft" }, { option: "published" }];
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

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataBeranda(res.data.data);
      setFormData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
    fetchData();
  }, [id]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full">
        <Loader />
      </div>
    );
  }

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Edit Data Beranda Page</h1>
          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          {dataBeranda?.page_id === 6 ? (
            <>
              <div className="flex items-center justify-start gap-10">
                <div
                  className={`${
                    imagePreview || dataBeranda.image_url ? "w-3/4" : "hidden"
                  }`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full object-cover rounded-xl"
                    />
                  ) : (
                    dataBeranda.image_url && (
                      <img
                        src={`/api/storage/${dataBeranda.image_url}`}
                        alt="Preview"
                        className="w-full object-cover rounded-xl"
                      />
                    )
                  )}
                </div>

                <div
                  className={`${
                    imagePreview || dataBeranda.image_url ? "w-1/4" : "w-full"
                  }`}
                >
                  <div className="flex items-center justify-center w-full pt-5">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col p-4 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-20 h-10 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <FormInput
                label="Judul"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={error?.title}
              />
              <FormInput
                label="Deskripsi"
                type="text"
                name="container"
                value={formData.container}
                onChange={handleChange}
                error={error?.container}
              />
              <FormRadioBtn
                label="Status"
                name="status"
                options={optionStatus}
                value={formData.status}
                onChange={handleChange}
                error={error?.status}
              />
            </>
          ) : (
            <>
              {dataBeranda?.page_id === 16 && (
                <div className="flex items-center gap-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 object-cover rounded-lg"
                    />
                  ) : (
                    dataBeranda.image_url && (
                      <img
                        src={`/api/storage/${dataBeranda.image_url}`}
                        alt="Preview"
                        className="w-20 object-cover rounded-lg"
                      />
                    )
                  )}
                  <div className="w-full">
                    <FormInput
                      label="Image News"
                      name="image"
                      type="file"
                      onChange={handleChange}
                      error={error?.image}
                    />
                  </div>
                </div>
              )}
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
              <TextAreaInput
                label="Description"
                name="container"
                value={formData.container}
                onChange={handleChange}
                error={error?.container}
              />
            </>
          )}
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditBeranda;
