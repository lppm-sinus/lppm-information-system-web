const FormInput = (props) => {
  return (
    <div className="my-4">
      <label
        htmlFor={props.htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      <input
        disabled={props.isDisabled}
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      />
      {props.error && (
        <p className="mt-1 text-red-500 text-xs font-semibold">{props.error}</p>
      )}
    </div>
  );
};

export default FormInput;
