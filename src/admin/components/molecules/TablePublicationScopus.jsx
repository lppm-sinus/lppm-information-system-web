import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TablePublicationScopus = (props) => {
  return (
    <div className="max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-xs">
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              No
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Category
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Identifier
            </th>
            <th scope="col" className="px-6 py-3 min-w-40" rowSpan={2}>
              Quartile
            </th>
            <th scope="col" className="px-6 py-3 min-w-[500px]" rowSpan={2}>
              Title
            </th>
            <th scope="col" className="px-6 py-3 min-w-80" rowSpan={2}>
              Publication Name
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Year
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Citation
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Author
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item, index) => (
            <tr
              key={item.id}
              className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-b"
            >
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">{item.category}</td>
              <td className="px-6 py-3">{item.identifier}</td>
              <td className="px-6 py-3">{item.quartile}</td>
              <td className="px-6 py-3">{item.title}</td>
              <td className="px-6 py-3">{item.publication_name}</td>
              <td className="px-6 py-3">{item.year}</td>
              <td className="px-6 py-3">{item.citation}</td>
              <td className="px-6 py-3 min-w-[30rem] text-start">
                {item.authors?.map((author, index) => (
                  <p key={author.id}>
                    {index + 1}. ({author.sinta_id}){" "}
                    {author.title_prefix ? author.title_prefix + ". " : null}
                    {author.name}, {author.title_suffix}
                  </p>
                ))}
              </td>
              <td className="px-6 py-3 flex gap-2 items-center">
                <Link to={`${props.editPage}${item.id}`}>
                  <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                    <FaRegEdit />
                    <span>Sunting</span>
                  </button>
                </Link>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    props.setSelectedId(item.id);
                    props.setShowDeleteModal(true);
                  }}
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

export default TablePublicationScopus;
