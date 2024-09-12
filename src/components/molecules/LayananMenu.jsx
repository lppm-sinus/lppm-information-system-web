import { NavLink } from "react-router-dom";

const LayananMenu = (props) => {
  const navItemsLayanan = [
    { path: "/layanan/layanan-penelitian", title: "Penelitian" },
    { path: "/layanan/layanan-pengabdian", title: "Pengabdian" },
    { path: "/layanan/kerjasama", title: "Kerjasama" },
  ];

  return (
    <>
      {props.state && (
        <div className="w-full p-2">
          {navItemsLayanan.map((item, index) => (
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
        </div>
      )}
    </>
  );
};

export default LayananMenu;
