import { NavLink } from "react-router-dom";

const NavItems = ({ link, title, icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-2 bg-lppm_premier text-lppm_white py-2 px-2 w-full rounded-md"
          : "flex items-center gap-2 text-lppm_black hover:bg-slate-100 py-2 px-2 w-full rounded-md"
      }
    >
      {icon && <span>{icon}</span>}
      {title}
    </NavLink>
  );
};

export default NavItems;
