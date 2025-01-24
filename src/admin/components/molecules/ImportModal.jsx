import { MdClose } from "react-icons/md";

const ImportModal = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`font-pop fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        <button
          className="absolute top-1 right-1 text-gray-500"
          onClick={onClose}
        >
          <MdClose size={"24px"} />
        </button>
        <h1 className="font-semibold text-lg text-center">{title}</h1>

        {children}
      </div>
    </div>
  );
};

export default ImportModal;
