import { NavLink } from "react-router-dom";

export const Navitems = (props) => {
  return (
    <NavLink
      to={props.link}
      onClick={props.OnClick}
      className={({ isActive }) =>
        isActive
          ? "font-bold text-lppm_sekunder"
          : "font-normal hover:font-semibold duration-100"
      }
    >
      <h1>{props.title}</h1>
    </NavLink>
  );
};
