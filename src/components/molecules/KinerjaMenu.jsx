import { NavLink } from "react-router-dom";

const KinerjaMenu = (props) => {
  const navItemsKinerja = [
    { path: "/kinerja/kinerja-penelitian", title: "Penelitian" },
    { path: "/kinerja/kinerja-pengabdian", title: "Pengabdian" },
    { path: "/kinerja/kinerja-publikasi", title: "Publikasi" },
  ];

  return (
    <>
      {navItemsKinerja.map((item, index) => (
        <NavLink
          onClick={props.action}
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "text-black font-bold block" : "text-black"
          }
        >
          <div
            className="p-2 border-b border-slate-400"
            onClick={props.OnClick}
          >
            {item.title}
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default KinerjaMenu;
