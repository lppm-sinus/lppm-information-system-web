import { NavLink } from "react-router-dom";

const TentangMenu = (props) => {
  const navItemsTentang = [
    { path: "/tentang/sejarah", title: "Sejarah" },
    { path: "/tentang/program", title: "Program & Kebijakan" },
    { path: "/tentang/visimisi", title: "Visi & Misi" },
    { path: "/tentang/struktur", title: "Struktur" },
  ];

  return (
    <>
      {props.state && (
        <div className="w-full p-2">
          {navItemsTentang.map((item, index) => (
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

export default TentangMenu;
