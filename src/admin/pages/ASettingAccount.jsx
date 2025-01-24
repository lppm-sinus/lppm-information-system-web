import FormSettingData from "../components/molecules/FormSettingData";
import FormSettingPassword from "../components/molecules/FormSettingPassword";

const BASE_URL = import.meta.env.VITE_API_URL;

const ASettingAccount = () => {
  return (
    <div className="p-4 font-pop bg-gray-200 min-h-screen pt-20">
      <FormSettingData />
      <FormSettingPassword />
    </div>
  );
};

export default ASettingAccount;
