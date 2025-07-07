import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import PDFViewer from "@/admin/components/atoms/PDFViewer";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDokumen = () => {
  const { id } = useParams();
  const [dataDokumen, setDataDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [filePreview, setFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    page_id: "14",
    category_id: "4",
    status: "",
    file: "",
  });

  let navigate = useNavigate();

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const fetchDataDokumenId = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataDokumen(res.data.data);
      setFormData(res.data.data);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDokumenId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PATCH");
    formDataToSend.append("title", formData.title);
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
    if (e.target.type === "file") {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFormData({ ...formData, [e.target.name]: selectedFile });
        const fileURL = URL.createObjectURL(selectedFile);
        setFilePreview(fileURL);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

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
          <h1 className="text-xl font-bold">Edit Data Dokumen</h1>

          <div className="flex items-center gap-5 w-1/6">
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <FormInput
            label="Nama Dokumen"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={error?.title}
          />
          <FormRadioBtn
            label="Status"
            options={optionStatus}
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={error?.status}
          />
          <FormInput
            label="Upload File"
            type="file"
            name="file"
            // value={formData.file}
            onChange={handleChange}
            error={error?.file}
          />
          {filePreview ? (
            <PDFViewer pdfUrl={filePreview} />
          ) : (
            <PDFViewer
              pdfUrl={
                loading
                  ? ""
                  : `https://lppm.sinus.ac.id/api/storage/${dataDokumen.file_url}`
              }
            />
          )}
          {/* <p>{formData.file}</p> */}
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditDokumen;
