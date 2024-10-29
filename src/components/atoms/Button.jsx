const Button = ({ text, bgcolor, txtcolor, icon, position, justify, item }) => {
  return (
    <button
      className={`w-full ${position} ${justify} ${item} p-2 rounded-lg ${bgcolor} ${txtcolor} `}
    >
      <p>{text}</p>
      {icon ? <span>{icon}</span> : ""}
    </button>
  );
};

export default Button;
