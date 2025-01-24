import { MdClose } from "react-icons/md";
import PDFViewer from "../atoms/PDFViewer";
const ModalDocument = ({ isOpen, onClose, title, url }) => {
  return (
    <div
      className={`font-pop fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg w-[95%] h-[90vh] max-w-5xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="font-semibold text-lg">{title}</h1>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden h-[calc(90vh-4rem)]">
          <PDFViewer pdfUrl={url} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};
export default ModalDocument;
