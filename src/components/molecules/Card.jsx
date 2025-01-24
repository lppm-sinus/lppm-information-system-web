import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className=" w-full h-full group flex flex-col gap-5 justify-start items-center">
      {props.icon ? (
        <div className="p-4 h-60 w-60 relative bg-[#0c6f84]/10 group-hover:bg-[#0c6f84] group-hover:text-white flex flex-col gap-2 justify-between items-center rounded-lg shadow-2xl shadow-gray-400 transition delay-100 cursor-pointer">
          <div className="mb-5 flex items-center absolute top-2 left-4 justify-center self-start bg-[#0c6f84] group-hover:bg-lppm_white size-10 rounded-full transition delay-100">
            <span className="text-lppm_white  group-hover:text-[#0c6f84]  transition delay-100">
              {props.icon}
            </span>
          </div>
          <div className="flex flex-col h-full w-full mt-12 ">
            <h1 className="self-start">{props.title}</h1>
            <div
              className="text-xs self-start custom-html-styles "
              dangerouslySetInnerHTML={{ __html: props.container }}
            ></div>
          </div>
          <div className="w-56 lg:w-60 mt-5 ml-5">
            <Link to={props.link}>
              <button className="w-1/2  text-sm p-2 rounded-lg bg-[#0c6f84] text-white group-hover:bg-lppm_white group-hover:text-[#0c6f84] text-center transition delay-100">
                {props.button}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 flex h-60 w-60 flex-col gap-2 items-center rounded-lg border border-lppm_premier shadow-lg shadow-gray-400">
          <h1 className="text-base font-semibold mb-2">{props.title}</h1>
          <div
            className="text-xs lg:text-sm text-justify"
            dangerouslySetInnerHTML={{ __html: props.container }}
          ></div>
        </div>
      )}
    </div>
  );
};
