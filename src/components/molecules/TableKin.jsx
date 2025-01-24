const TableKin = (props) => {
  return (
    <table className="table-auto border-spacing-2 border-separate w-full">
      <tbody>
        {Object.entries(props.data).map(([key, value], index) => (
          <tr
            key={index}
            className="text-sm odd:bg-lppm_premier/5 even:bg-lppm_premier/15 border-b"
          >
            <td className="w-1/2 rounded-md p-2">{key}</td>
            <td className="w-1/4 rounded-md p-2">{value.count}</td>

            {value.total_funds && (
              <td className="w-1/4 p-2 rounded-md">{value.total_funds}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableKin;
