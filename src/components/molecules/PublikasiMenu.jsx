import { NavLink } from "react-router-dom";

const PublikasiMenu = (props) => {
  const navItemsPublikasi = [
    { path: "/publikasi/jurnaljis", title: "Jurnal JIS" },
    { path: "/publikasi/jurnaltikomsin", title: "Jurnal TiKomSin" },
  ];

  return (
    <>
      {props.state && (
        <div className="w-full p-2">
          {navItemsPublikasi.map((item, index) => (
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

export default PublikasiMenu;
