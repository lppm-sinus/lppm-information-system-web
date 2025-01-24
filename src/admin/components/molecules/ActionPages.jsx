import { useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import {
  FaMagnifyingGlass,
  FaFilter,
  FaPlus,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const ActionPages = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleInputSearch = (e) => {
    const searchVal = e.target.value;
    props.setValue(searchVal);
  };

  return (
    <div className="font-pop">
      <div className="w-full h-20 flex justify-between">
        <div className="flex gap-2 items-center">
          {/* Search Bar */}
          {props.search && (
            <div className="w-80 h-10 relative">
              <input
                value={props.value}
                onChange={handleInputSearch}
                type="text"
                placeholder="Search"
                className="w-full h-full pl-10 rounded-md"
              />
              <div className="absolute top-3 left-3">
                <FaMagnifyingGlass />
              </div>
            </div>
          )}

          {/* Filter Feature */}
          <div className="relative z-10 cursor-pointer">
            {props.onFilter && (
              <div
                className={`bg-lppm_premier text-lppm_white h-10 gap-2 flex items-center p-4 rounded-md border-2 border-lppm_premier hover:bg-lppm_premier/90`}
                onClick={() => setOpenFilter(!openFilter)}
              >
                <FaFilter />
              </div>
            )}
            {openFilter && (
              <div
                onClick={() => setOpenFilter(false)}
                className="absolute border-2 w-40 bg-lppm_premier text-white rounded-md mt-1 p-2"
              >
                {props.all && (
                  <div
                    onClick={() => props.setFilter("")}
                    className="flex gap-2 items-center cursor-pointer py-2 w-full border-b-2 px-2"
                  >
                    <h1>All</h1>
                  </div>
                )}
                {props.filter.map((item) =>
                  props.selectedFilter ? (
                    <div
                      key={item.id}
                      onClick={() => props.setFilter(item.id)}
                      className={`flex gap-2 items-center cursor-pointer p-2 w-full border-b-2 hover:text-lppm_sekunder hover:border-lppm_sekunder transition-all duration-150 ${
                        props.selectedFilter === item.id
                          ? "text-lppm_sekunder border-lppm_sekunder"
                          : ""
                      }`}
                    >
                      <h1>{item.title}</h1>
                    </div>
                  ) : (
                    <div
                      key={item.id}
                      onClick={() => props.setFilter(item.id)}
                      className={`flex gap-2 items-center cursor-pointer p-2 w-full border-b-2 hover:text-lppm_sekunder hover:border-lppm_sekunder transition-all duration-150 ${
                        props.selectedCategory === item.title
                          ? "text-lppm_sekunder border-lppm_sekunder"
                          : ""
                      }`}
                    >
                      <h1>{item.title}</h1>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Import & Export */}
        <div className="flex gap-2 items-center">
          {props.kinerja && (
            <>
              {props.export && (
                <div
                  onClick={() => props.export()}
                  className="bg-lppm_premier text-lppm_white hover:bg-lppm_premier/90 w-28 flex gap-2 items-center px-4 py-2 rounded-md cursor-pointer transition-all duration-100"
                >
                  <CiExport />
                  <h1>Export</h1>
                </div>
              )}
              <div
                onClick={() => props.setShowImportModal(true)}
                className="bg-lppm_premier text-lppm_white hover:bg-lppm_premier/90 w-28 flex gap-2 items-center px-4 py-2 rounded-md cursor-pointer transition-all duration-100"
              >
                <CiImport />
                <h1>Import</h1>
              </div>
            </>
          )}

          {/* Add Button */}
          <div
            className={`w-36 rounded-md cursor-pointer bg-lppm_premier text-lppm_white hover:bg-lppm_premier/90 transition-all duration-100
              
            `}
          >
            {props.parent ? (
              <>
                <div>
                  <button
                    className="px-4 py-2 flex justify-between w-full items-center"
                    onClick={handleOpen}
                  >
                    <h1>Add New</h1>
                    {openMenu ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link to={props.link}>
                    <button
                      className="px-4 py-2 flex gap-5 w-full items-center"
                      onClick={handleOpen}
                    >
                      <FaPlus />
                      <h1>Add New</h1>
                    </button>
                  </Link>
                </div>
              </>
            )}
            {openMenu && (
              <div className="absolute z-20 border-2 border-lppm_premier bg-lppm_premier text-white w-36 rounded mt-1 p-2 cursor-pointer">
                {props.data.map((item) => (
                  <Link
                    to={item.link}
                    key={item.id}
                    className="flex items-center p-2 border-b-2 hover:text-lppm_sekunder hover:border-lppm_sekunder transition-all duration-150"
                  >
                    <h1>{item.name}</h1>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPages;
