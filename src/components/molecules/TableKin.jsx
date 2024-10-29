const TableKin = (props) => {
  return (
    <table className="table-auto border-spacing-2 border-separate w-full">
      {props.data.map((item, index) => (
        <tbody key={index} className="border border-slate-600">
          <tr>
            {index % 2 === 0 ? (
              <>
                <td className="w-1/2 bg-slate-200 rounded-md p-2">
                  {item.title}
                </td>
                <td className="w-1/4 bg-slate-200 rounded-md p-2">
                  {item.amount}
                </td>

                {item.cost && (
                  <td className="w-1/4 text-xs md:text-base bg-slate-300 p-2 rounded-md">
                    Rp. {item.cost}
                  </td>
                )}
              </>
            ) : (
              <>
                <td className="w-1/2 bg-slate-300 p-2 rounded-md">
                  {item.title}
                </td>
                <td className="w-1/4  bg-slate-300 p-2 rounded-md">
                  {item.amount}
                </td>
                {item.cost && (
                  <td className="w-1/4 text-xs md:text-base bg-slate-300 p-2 rounded-md">
                    Rp. {item.cost}
                  </td>
                )}
              </>
            )}
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default TableKin;
