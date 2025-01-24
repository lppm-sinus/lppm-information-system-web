import { useNavigate } from "react-router-dom";
import { MdSave, MdAdd } from "react-icons/md";

const BtnSubmit = ({ name, hiddenBack }) => {
  let back = useNavigate();
  return (
    <div className="flex w-full justify-end items-center gap-2">
      <button
        className={`w-1/2 p-2 bg-lppm_white text-lppm_black border border-lppm_premier hover:bg-gray-100 rounded-md ${
          hiddenBack ? "hidden" : ""
        }`}
        type="button"
        onClick={() => {
          back(-1);
        }}
      >
        Kembali
      </button>
      <button
        type="submit"
        className={` p-2 bg-lppm_premier flex w-full justify-center items-center gap-2 text-white border border-lppm_premier hover:bg-lppm_premier/85 rounded-md ${
          hiddenBack ? "w-full" : "w-1/2"
        }`}
      >
        {name === "Tambah" ? <MdAdd size={20} /> : <MdSave />}
        {name}
      </button>
    </div>
  );
};

export default BtnSubmit;
