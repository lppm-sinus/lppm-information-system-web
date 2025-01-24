import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const DropdownKin = ({ selectedFilter, onSelect, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-56 md:w-64 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-400 rounded-md shadow-sm hover:bg-white focus:outline-none"
        >
          <p className="w-full text-start">{selectedFilter}</p>
          <span className="flex justify-end">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-52 md:w-64 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {data.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-xs md:text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownKin;
