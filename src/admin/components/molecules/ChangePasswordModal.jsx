import { MdClose } from "react-icons/md";
import FormInput from "../atoms/FormInput";
import axios from "axios";
import { useState } from "react";
import BtnSubmit from "../atoms/BtnSubmit";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const ChangePasswordModal = (props) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const { toast } = useToast();

  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/users/${props.id}/password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);

      setError(null);
      setFormData({
        password: "",
        password_confirmation: "",
      });
      props.onClose();

      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log("Error fetching data: " + err);
      toast({
        variant: "destructive",
        description: `Failed to update password`,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(error);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        props.isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={props.onClose}
      ></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <span
          className="absolute top-1 right-1 text-gray-500 cursor-pointer"
          onClick={props.onClose}
        >
          <MdClose size={"24px"} />
        </span>
        <h1 className="font-semibold text-center">
          Ubah Kata Sandi Untuk {props.email}
        </h1>
        <div className="mt-10">
          <form onSubmit={handleChangeSubmit}>
            {/* password */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={error?.password}
            />

            {/* password confirmation */}
            <FormInput
              label="Confirmation Password"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={error?.password_confirmation}
            />
            <BtnSubmit name="Simpan" hiddenBack={true} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
