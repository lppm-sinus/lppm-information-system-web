const FormRadioBtn = (props) => {
  return (
    <div className="my-4">
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </h3>
      <ul className="items-center w-full text-sm cursor-pointer font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {props.options?.map((item, index) => (
          <li
            key={index}
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          >
            <div className="flex items-center ps-3">
              <input
                id={`${item.option}-radio`}
                type="radio"
                value={item.option}
                name={props.name}
                checked={props.value === item.option}
                onChange={props.onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={`${item.option}-radio`}
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {item.option}
              </label>
            </div>
          </li>
        ))}
      </ul>
      {props.error && (
        <p className="mt-1 text-red-500 text-xs font-semibold">{props.error}</p>
      )}
    </div>
  );
};

export default FormRadioBtn;
