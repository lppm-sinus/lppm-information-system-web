import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TableAuthor = (props) => {
  return (
    <div className="mt-5 max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-xs">
            <td className="p-2">No</td>
            <td className="p-2">Nama</td>
            <td className="p-2">Program Studi</td>
            <td className="p-2">NIDN</td>
            <td className="p-2">Sinta ID</td>
            <td className="p-2"></td>
          </tr>
        </thead>
        <tbody>
          {props.data.map((author, index) => (
            <tr
              key={author.id}
              className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2 text-start">
                {`${author.title_prefix ? `${author?.title_prefix}, ` : ""}`}
                {author.name}, {author.title_suffix}
              </td>
              <td className="p-2">{author.study_program?.name}</td>
              <td className="p-2">{author.nidn}</td>
              <td className="p-2">{author.sinta_id}</td>
              <td className="p-2 flex gap-2 w-36">
                <Link to={`${props.editPage}${author.id}`}>
                  <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                    <FaRegEdit />
                    <span>Sunting</span>
                  </button>
                </Link>
                <span
                  onClick={() => {
                    props.setSelectedId(author.id);
                    props.setShowDeleteModal(true);
                  }}
                  className="cursor-pointer"
                >
                  <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                    <FaTrash />
                    <span>Hapus</span>
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAuthor;
