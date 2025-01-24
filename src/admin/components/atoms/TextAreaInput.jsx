const TextAreaInput = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={props.name}
        className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <textarea
        className=" w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
        name={props.name}
        id={props.name}
        cols="30"
        rows="3"
        placeholder={props.label}
        value={props.value || ""}
        onChange={props.onChange}
      ></textarea>
      {props.error && (
        <p className="mt-1 text-red-500 text-xs font-semibold">{props.error}</p>
      )}
    </div>
  );
};

export default TextAreaInput;
