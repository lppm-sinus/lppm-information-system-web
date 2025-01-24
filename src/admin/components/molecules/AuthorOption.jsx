import { MdClose } from "react-icons/md";

const AuthorOption = ({
  authors,
  selectedAuthors,
  selectedLeader,
  addAuthor,
  deleteAuthor,
  error,
}) => {
  // console.log(authors);

  return (
    <div className="my-4">
      <p>Authors</p>
      <div className="block space-y-2">
        <select
          value={""}
          onChange={(e) => {
            const selectedAuthor = authors.find(
              (author) => author.id === parseInt(e.target.value)
            );
            if (
              selectedAuthor &&
              !selectedAuthors.some((a) => a.id === selectedAuthor.id)
            ) {
              addAuthor(selectedAuthor.id, selectedAuthor.name);
            }
          }}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-fit p-2.5"
        >
          <option defaultValue={""}>--Choose Author--</option>
          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
              disabled={
                selectedAuthors?.some((a) => a.id === author.id) ||
                selectedLeader?.nidn === author.nidn
              }
            >
              {author.nidn} - {author.name}
            </option>
          ))}
          {error && (
            <p className="mt-1 text-red-500 text-xs font-semibold">{error}</p>
          )}
        </select>
        <div className="w-full grid grid-cols-3 gap-2 text-sm ">
          {selectedAuthors?.map((selected) => (
            <div
              className="relative px-3 py-2 w-full bg-lppm_premier text-white rounded-md"
              key={selected.id}
            >
              {selected.name}
              <span
                className="absolute top-1 right-2 cursor-pointer"
                onClick={() => deleteAuthor(selected.id)}
              >
                <MdClose />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorOption;
