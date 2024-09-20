export const Card = (props) => {
  return (
    <div className="w-full h-full flex flex-col gap-5 justify-start items-center">
      <div className=" p-4 flex flex-col gap-2 items-center rounded-lg border border-blue-700 shadow-lg shadow-gray-400">
        {props.icon}
        <h1 className="text-base lg:text-lg font-semibold">{props.title}</h1>
        <p className="text-xs lg:text-sm text-justify">{props.desc}</p>
      </div>
    </div>
  );
};
