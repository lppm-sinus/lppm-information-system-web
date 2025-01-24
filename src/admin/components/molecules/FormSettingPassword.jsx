import axios from "axios";
import { useState } from "react";
import BtnSubmit from "../atoms/BtnSubmit";
import FormInput from "../atoms/FormInput";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const FormSettingPassword = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const { toast } = useToast();

  const handleEditPasswordCurrentUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/users/current/password`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setError(null);
      console.log(res);
      setFormData({
        old_password: "",
        password: "",
        password_confirmation: "",
      });
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(
        err.response.data.errors
          ? err.response.data.errors
          : "An error occurred"
      );
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={handleEditPasswordCurrentUser}
      className="w-full mt-5 bg-white rounded-lg p-6 shadow-lg"
    >
      <div className="mb-5">
        <h1 className="text-xl font-semibold">Update Password</h1>
        <p className="text-xs">
          Ensure your account is using a long, random password to stay secure
        </p>
      </div>

      {/* old_password */}
      <FormInput
        label="Old Password"
        type="password"
        name="old_password"
        value={formData.old_password}
        onChange={handleChange}
        error={error?.old_password}
      />

      {/* new_password */}
      <FormInput
        label="New Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={error?.password}
      />

      {/* confirm_new_password */}
      <FormInput
        label="Confirm Password"
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
        error={error?.password_confirmation}
      />
      <div className="w-1/4">
        <BtnSubmit name="Simpan" hiddenBack={true} />
      </div>
    </form>
  );
};

export default FormSettingPassword;
