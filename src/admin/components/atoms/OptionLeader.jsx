const OptionLeader = (props) => {
  return (
    <div className="block pt-7 w-full">
      <select
        value={props.value || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-4"
        onChange={(e) => {
          const leader = props.authors.find(
            (author) => author.id === parseInt(e.target.value)
          );
          props.onLeaderSelect(leader.nidn, leader.name);
        }}
      >
        <option value="">---Choose Leader---</option>
        {props.authors.map((author) => (
          <option
            key={author.id}
            value={author.id}
            className="flex justify-between items-center gap-2"
          >
            {author.nidn} - {author.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionLeader;
