const Button = (props) => {
  return (
    <button className="w-full p-2 bg-lppm text-white rounded-lg">
      <p>{props.button}</p>
    </button>
  );
};

export default Button;
