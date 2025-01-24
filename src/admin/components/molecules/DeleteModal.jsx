import { MdClose } from "react-icons/md";

const DeleteModal = (props) => {
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
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h3>
          <p className="mb-6">
            Apakah Anda yakin ingin menghapus item dengan id: {props.itemId}?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={props.onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={props.onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
