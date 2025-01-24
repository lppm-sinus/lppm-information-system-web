import { FaRegEdit, FaTrash, FaRegEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Table = (props) => {
  return (
    <div className="mt-5 max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {props.pages ? (
          <>
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-xs">
                <td className="p-2">No</td>
                <td className="p-2">Title</td>
                <td className="p-2">Page</td>
                <td className="p-2">{`${props.file ? "File" : "Category"}`}</td>
                <td className="p-2">Status</td>
                <td className="p-2"></td>
              </tr>
            </thead>
            <tbody>
              {props.dataPages.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-5">
                    {item.image_url && (
                      <img
                        src={`/api/storage/${item.image_url}`}
                        alt="Image"
                        className="w-10 h-10 object-cover"
                      />
                    )}
                    {item.title}
                  </td>
                  <td className="p-2">{item.page.title}</td>
                  <td className="p-2">
                    {item.category.slug === "file" ? (
                      <span
                        className="hover:text-lppm_sekunder cursor-pointer"
                        onClick={() => {
                          props.setShowPreviewDoc(true);
                          props.setSelectedFile(item.file_url);
                        }}
                      >
                        {item.file_url.split("/").pop()}
                      </span>
                    ) : (
                      item.category.slug
                    )}
                  </td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2 flex gap-2 w-28">
                    <Link to={`${props.editPage}${item.id}`}>
                      <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                        <FaRegEdit />
                        <span>Sunting</span>
                      </button>
                    </Link>
                    <span
                      onClick={() => {
                        props.selectedId(item.id);
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
          </>
        ) : (
          <>
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-xs">
                <td className="p-2"></td>
                <td className="p-2">Name</td>
                <td className="p-2">Email</td>
                <td className="p-2">Role</td>
                <td className="p2"></td>
              </tr>
            </thead>
            <tbody>
              {props.dataUser?.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="p-2 flex justify-center items-center">
                    {item.image_path ? (
                      <>
                        <img
                          src={`/api/storage/${item.image_path}`}
                          alt="Image Profile"
                          className="rounded-full size-10 object-cover"
                        />
                      </>
                    ) : (
                      <>
                        <span className="bg-white border border-lppm_premier rounded-full size-10 flex justify-center items-center">
                          <FaUser className="text-lppm_premier" />
                        </span>
                      </>
                    )}
                  </td>
                  <td className="p-2">
                    <span>{item.name}</span>
                  </td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">
                    <span className="bg-lppm_sekunder text-lppm_black rounded-full px-2">
                      {item.roles[0].name}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2 w-28">
                    <Link to={`${props.editPage}${item.id}`}>
                      <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                        <FaRegEdit />
                        <span>Sunting</span>
                      </button>
                    </Link>
                    <span
                      onClick={() => {
                        props.selectedId(item.id);
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
          </>
        )}
      </table>
    </div>
  );
};

export default Table;
