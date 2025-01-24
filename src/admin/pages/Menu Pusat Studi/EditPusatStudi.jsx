import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import MyTextEditor from "@/admin/components/molecules/MyTextEditor";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPusatStudi = () => {
  const { id } = useParams();
  const [dataPusatStudi, setDataPusatStudi] = useState();
  const [formData, setFormData] = useState({
    title: "",
    container: "",
    page_id: "12",
    category_id: "1",
    status: "",
  });

  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const optionStatus = [{ option: "draft" }, { option: "published" }];

  const { toast } = useToast();

  const fetchDataPusatStudiId = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataPusatStudi(res.data.data);
      setFormData(res.data.data);
      setError(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/api/posts/${id}`, formData, {
        headers: {
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

  useEffect(() => {
    fetchDataPusatStudiId();
  }, [id]);

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Edit Data Pusat Studi</h1>
          <div className="w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <div className="flex justify-between gap-5 w-full">
            <div className="w-1/2">
              {/* Title */}
              <FormInput
                label="Title"
                name="title"
                typepe="text"
                value={formData.title}
                onChange={handleChange}
                error={error?.title}
              />
            </div>
            <div className="w-1/2">
              {/* Status */}
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

          {/* Content */}
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
  );
};

export default EditPusatStudi;
