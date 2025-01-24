import { NavLink } from "react-router-dom";

const LayananMenu = (props) => {
  const navItemsLayanan = [
    { path: "/layanan/layanan-penelitian", title: "Penelitian" },
    { path: "/layanan/layanan-pengabdian", title: "Pengabdian" },
    { path: "/layanan/kerjasama", title: "Kerjasama" },
    { path: "/layanan/haki", title: "HKI" },
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
                isActive
                  ? "flex items-center gap-2 bg-lppm_premier text-lppm_white px-2 w-full rounded-md"
                  : "flex items-center gap-2 text-lppm_black hover:bg-lppm_premier/10 my-1 px-2 w-full rounded-md"
              }
            >
              <div className="p-2" onClick={props.OnClick}>
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
