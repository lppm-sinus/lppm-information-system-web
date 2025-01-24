import { MdClose } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";

const ModalLogin = (props) => {
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
        <span className="flex items-center gap-5 text-lppm_premier">
          <PiWarningCircleFill size={80} />
          <h1>
            Silahkan Menghubungi Pihak Lembaga Penelitian dan Pengabdian
            Masyarakat Untuk Mengubah Password Anda
          </h1>
        </span>
      </div>
    </div>
  );
};

export default ModalLogin;
