import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import FormRadioBtn from "@/admin/components/atoms/FormRadioBtn";
import Loader from "@/admin/components/atoms/Loader";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import ChangePasswordModal from "@/admin/components/molecules/ChangePasswordModal";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;
const EditUser = () => {
  const { id } = useParams();
  const [getUser, setGetUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    image: "",
  });

  let navigate = useNavigate();

  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(null);

  const optionRoles = [{ option: "admin" }, { option: "superadmin" }];

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setGetUser(res.data.data);
      setFormData(res.data.data);
    } catch (err) {
      setError(err);
      console.log("Error fetching data: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [id]);

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PATCH");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("role", formData.role);
    // formDataToSend.append("image", formData.image);

    if (e.target.image.files[0]) {
      formDataToSend.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post(`/api/users/${id}`, formDataToSend, {
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
      setError(err.response ? err.response.data.errors : "An error occurred");
      toast({
        variant: "destructive",
        description: "Failed to register new user.",
      });
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

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminPageLayout>
        <form onSubmit={handleSubmitUser}>
          <div className="mb-5 flex justify-between items-center">
            <div>
              <h1 className=" text-xl font-semibold">Edit Data User</h1>
              <p className="text-xs">
                Edit profile information and email address
              </p>
            </div>
            <div className="w-1/6 flex items-center gap-2">
              {/* Button */}

              <BtnSubmit name="Simpan" />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg py-2 pt-6 px-4 shadow-lg">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="bg-lppm_premier text-white rounded-lg w-[18%] p-2 hover:bg-lppm_premier/85"
              >
                Ubah Kata Sandi
              </button>
            </div>
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                <div className="flex items-center gap-2">
                  {/* Show Image Profile */}
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-20 rounded-lg"
                    />
                  ) : getUser.image_path ? (
                    <div className="mt-2">
                      <img
                        src={`/api/storage/${getUser.image_path}`}
                        alt="Image description"
                        className="w-20 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-500 rounded-lg animate-pulse" />
                  )}

                  {/* image Profile*/}
                  <FormInput
                    label="Image"
                    type="file"
                    name="image"
                    // value={formData.image}
                    onChange={handleChange}
                    error={error?.image}
                  />
                </div>
              </div>
              <div className="w-1/2">
                {/* role */}
                <FormRadioBtn
                  label="Role"
                  name="role"
                  options={optionRoles}
                  value={formData.role}
                  onChange={handleChange}
                  error={error?.role}
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 w-full">
              <div className="w-1/2">
                {/* Name */}
                <FormInput
                  label="Nama"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={error?.name}
                />
              </div>
              <div className="w-1/2">
                {/* email */}
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={error?.email}
                />
              </div>
            </div>
          </div>
        </form>
      </AdminPageLayout>

      <ChangePasswordModal
        email={formData.email}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        id={id}
      />
    </>
  );
};

export default EditUser;
