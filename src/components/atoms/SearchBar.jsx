import { MdOutlineSearch } from "react-icons/md";

export const SearchBar = () => {
  return (
    <div className="flex">
      <span className="absolute inset-y-4 lg:inset-y-3 ml-1">
        <button className="text-gray-400 hover:text-gray-700">
          <MdOutlineSearch size={"24px"} />
        </button>
      </span>
      <input
        type="text"
        placeholder="Cari Apa?"
        className="border border-slate-500 container rounded-md p-1 pl-9"
      />
    </div>
  );
};
