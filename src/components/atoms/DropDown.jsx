import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa6";

export const ButtonUpDrop = (props) => {
  return (
    <button onClick={props.action}>
      {props.state ? <FaAngleUp /> : <FaAngleDown />}
    </button>
  );
};

export const ButtonDropRight = (props) => {
  return (
    <button onClick={props.action}>
      {props.state ? <FaAngleRight /> : <FaAngleDown />}
    </button>
  );
};
