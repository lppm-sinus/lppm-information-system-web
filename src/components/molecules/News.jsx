const News = (props) => {
  return (
    <div className="w-full p-4 mt-4">
      <div className="w-full flex gap-4 items-center">
        <div className="w-1/3 lg:w-1/6 h-44 bg-fuchsia-400 rounded-lg overflow-hidden">
          <img src={props.img} alt="Gambar Berita" className="size-full" />
        </div>

        <div className="relative flex flex-col w-3/4 h-44 gap-2">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <p className="text-xs text-justify">{props.desc}</p>
          {props.button ? (
            <div className="absolute inset-x-0 bottom-0">
              <button
                className={`${props.widthsm} lg:${props.widthlg} p-2 bg-lppm text-white rounded-lg`}
              >
                <p>{props.button}</p>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
