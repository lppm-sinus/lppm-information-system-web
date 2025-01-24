import { NavLink } from "react-router-dom";

const KinerjaMenu = (props) => {
  const navItemsKinerja = [
    { path: "/kinerja-penelitian", title: "Penelitian" },
    { path: "/kinerja-pengabdian", title: "Pengabdian" },
    { path: "/kinerja-publikasi", title: "Publikasi" },
    { path: "/kekayaan-intelektual", title: "Kekayaan Intelektual" },
    { path: "/kinerja-buku", title: "Buku" },
  ];

  return (
    <>
      {navItemsKinerja.map((item, index) => (
        <NavLink
          onClick={props.action}
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-lppm_premier rounded-md font-bold"
              : "text-lppm_premier font-semibold"
          }
        >
          <p className="p-2" onClick={props.OnClick}>
            {item.title}
          </p>
        </NavLink>
      ))}
    </>
  );
};

export default KinerjaMenu;
