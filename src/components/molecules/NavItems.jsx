import { NavLink } from "react-router-dom";

export const Navitems = (props) => {
  return (
    <NavLink
      to={props.link}
      onClick={props.OnClick}
      className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
    >
      <h1>{props.title}</h1>
    </NavLink>
  );
};
