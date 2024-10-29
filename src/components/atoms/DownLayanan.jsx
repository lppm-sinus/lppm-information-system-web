import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaDownload } from "react-icons/fa6";

const DownLayanan = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-5 text-white bottom-5 size-11 bg-lppm rounded-full">
      <button
        onClick={handleIsOpen}
        className="flex size-full justify-center items-center"
      >
        {isOpen ? (
          <FaAngleUp className="size-1/2" />
        ) : (
          <FaAngleDown className="size-1/2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute text-white w-48 bottom-14 right-5 rounded-md overflow-hidden px-1 backdrop-blur-lg bg-white/30">
          {props.data.map((item, index) => (
            <button
              key={index}
              className="p-2 w-full bg-lppm my-1 rounded-lg border border-slate-600"
            >
              <a
                href={item.url}
                target="_blank"
                className="flex w-full justify-between items-center"
              >
                <p>{item.title}</p>
                <FaDownload />
              </a>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownLayanan;
