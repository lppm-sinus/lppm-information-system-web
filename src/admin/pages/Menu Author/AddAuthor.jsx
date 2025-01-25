import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAuthor = () => {
  const [prodi, setProdi] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    sinta_id: "",
    nidn: "",
    name: "",
    affiliation: "",
    study_program_id: "",
    last_education: "",
    functional_position: "",
    title_prefix: "",
    title_suffix: "",
  });

  let navigate = useNavigate();

  const { toast } = useToast();

  const fetchDataProdi = async () => {
    try {
      const res = await axios.get("/api/study-programs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProdi(res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/authors", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      setFormData({
        sinta_id: "",
        nidn: "",
        name: "",
        affiliation: "",
        study_program_id: "",
        last_education: "",
        functional_position: "",
        title_prefix: "",
        title_suffix: "",
      });
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors);
    }
  };

  const handleProdiChange = (e) => {
    const value = e.target.value;
    setSelectedProdi(value);
    setFormData((prev) => ({
      ...prev,
      study_program_id: value,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDataProdi();
  }, []);

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="my-2 space-y-3 flex flex-col">
          <div className="flex justify-between  mb-5">
            <h2 className="text-xl font-bold mb-4">Input Data Authors</h2>

            <div className="flex gap-5 items-center w-1/6">
              {/* Button */}
              <BtnSubmit name="Tambah" />
            </div>
          </div>
          <div className="w-full mt-5 bg-white rounded-lg py-2 px-6 shadow-lg">
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                <FormInput
                  label="Sinta ID"
                  type="text"
                  name="sinta_id"
                  value={formData.sinta_id}
                  onChange={handleChange}
                  error={error?.sinta_id}
                />
              </div>
              <div className="w-1/2">
                <FormInput
                  label="NIDN"
                  type="text"
                  name="nidn"
                  value={formData.nidn}
                  onChange={handleChange}
                  error={error?.nidn}
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={error?.name}
                />
              </div>
              <div className="w-1/2">
                <FormInput
                  label="Pendidikan Terakhir"
                  type="text"
                  name="last_education"
                  value={formData.last_education}
                  onChange={handleChange}
                  error={error?.last_education}
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                <FormInput
                  label="Gelar Depan"
                  type="text"
                  name="title_prefix"
                  value={formData.title_prefix}
                  onChange={handleChange}
                  error={error?.title_prefix}
                />
              </div>
              <div className="w-1/2">
                <FormInput
                  label="Gelar Belakang"
                  type="text"
                  name="title_suffix"
                  value={formData.title_suffix}
                  onChange={handleChange}
                  error={error?.title_suffix}
                />
              </div>
            </div>
            <FormInput
              label="Affiliasi"
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              error={error?.affiliation}
            />
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2 my-4">
                <label
                  htmlFor="prodi"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Program Studi
                </label>
                <select
                  id="prodi"
                  value={selectedProdi || ""}
                  onChange={handleProdiChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-fit p-2.5"
                >
                  <option value="">Select Prodi</option>
                  {prodi.map((prodi) => (
                    <option key={prodi.id} value={prodi.id}>
                      {prodi.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <FormInput
                  label="Jabatan"
                  type="text"
                  name="functional_position"
                  value={formData.functional_position}
                  onChange={handleChange}
                  error={error?.functional_position}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddAuthor;
