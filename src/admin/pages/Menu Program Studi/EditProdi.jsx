import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import Loader from "@/admin/components/atoms/Loader";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProdi = () => {
  const { id } = useParams();
  const [selectedProdi, setSelectedProdi] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
  });
  let navigate = useNavigate();

  const fetchSelectedProdi = async () => {
    try {
      const res = await axios.get(`/api/study-programs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedProdi(res.data.data);
      setFormData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/study-programs/${id}`, formData, {
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
    fetchSelectedProdi();
  }, []);

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
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Edit Data Program Studi</h2>

          <div className="flex items-center gap-5 w-1/6">
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
          <FormInput
            label="Nama Program Studi"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={error?.name}
          />
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default EditProdi;
