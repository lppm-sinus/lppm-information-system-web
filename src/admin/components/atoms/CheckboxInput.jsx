const CheckboxInput = (props) => {
  return (
    <span className="my-3 flex items-start gap-2">
      <input
        type="checkbox"
        name={props.name}
        className="mt-2"
        checked={props.checked}
        onChange={props.onChange}
      />
      <span>
        <label htmlFor={props.name} className="font-semibold text-sm">
          {props.label}
        </label>
        <p className="text-gray-400 text-xs">{props.description}</p>
      </span>
    </span>
  );
};

export default CheckboxInput;
