import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCarousel = () => {
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "6",
    category_id: "2",
    status: "",
    image: "",
  });

  let navigate = useNavigate();

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("container", formData.container);
    formDataToSend.append("page_id", formData.page_id);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("image", formData.image);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formDataToSend.append("image", fileInput.files[0]);
    }

    try {
      const res = await axios.post(`/api/posts`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        title: "",
        container: "",
        page_id: "6",
        category_id: "2",
        status: "",
        image: "",
      });

      setImagePreview(null);
      navigate(-1);
      toast({
        variant: "success",
        title: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, [e.target.name]: file });
      // Create preview URL for the new image
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
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Input Data Carousel Page</h1>
          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Tambah" />
          </div>
        </div>
        <div className="max-w-full flex-col justify-start mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex items-center justify-start gap-10">
            <div className={`${imagePreview ? "w-3/4" : "hidden"}`}>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full object-cover rounded-xl"
                />
              )}
            </div>

            <div className={`${imagePreview ? "w-1/4" : "w-full"}`}>
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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

              {/* <FormInput
                label="Image Banner"
                type="file"
                name="image"
                onChange={handleChange}
                error={error?.image}
              /> */}
            </div>
          </div>
          <div>
            <FormInput
              label="Judul"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={error?.title}
            />
            <TextAreaInput
              label="Deskripsi"
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
          </div>
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddCarousel;
