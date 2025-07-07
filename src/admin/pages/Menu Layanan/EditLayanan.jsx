import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import ModalDocument from "@/admin/components/molecules/ModalDocument";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const EditLayanan = () => {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "",
    category_id: "",
    status: "",
    file: "",
  });
  const optionStatus = [{ option: "draft" }, { option: "published" }];
  const fetchDataService = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedService(res.data.data);
      setFormData(res.data.data);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataService();
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

    if (e.target.file.files[0]) {
      formDataToSend.append("file", e.target.file.files[0]);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  console.log(selectedService);

  return (
    <>
      <AdminPageLayout>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex justify-between  mb-5">
            <h2 className="text-xl font-bold mb-4">Edit Data Layanan</h2>

            {/* Button */}
            <div className="flex gap-5 items-center w-1/6">
              {/* Button */}
              <BtnSubmit name="Simpan" />
            </div>
          </div>
          <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                <FormInput
                  label="title"
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
                  options={optionStatus}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  error={error?.status}
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <span className="w-[90%]">
                <FormInput
                  label="Upload File"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  error={error?.file}
                />
              </span>
              <span className="w-[10%] flex items-end mb-4">
                <button
                  type="button"
                  className="flex items-center justify-center h-12 w-1/2 border border-gray-300 bg-gray-50 rounded-lg"
                  onClick={() => setPreviewDoc(true)}
                >
                  <FaEye />
                </button>
              </span>
            </div>

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
      <ModalDocument
        isOpen={previewDoc}
        onClose={() => setPreviewDoc(false)}
        title="Dokumen Sekarang"
        url={`https://lppm.sinus.ac.id/api/storage/${selectedService.file_url}`}
      />
    </>
  );
};

export default EditLayanan;
