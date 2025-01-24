const News = (props) => {
  return (
    <div className="w-full p-4 mt-4">
      <div className="w-full flex gap-4 items-center">
        <div className="w-1/3 lg:w-1/6">
          <img
            src={props.img}
            alt="Gambar Berita"
            className="w-44 h-44 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="relative flex flex-col w-3/4 h-44 gap-2">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          {props.container ? (
            <div
              className="my-5 flex flex-col gap-4 custom-html-styles"
              dangerouslySetInnerHTML={{ __html: props.container }}
            ></div>
          ) : (
            <p className="text-xs text-justify">{props.desc}</p>
          )}
          {props.button && (
            <div className="absolute inset-x-0 bottom-0 cursor-pointer">
              <a href={props.url} target="_blank">
                <button
                  className={`w-full md:w-1/2 lg:w-1/4 p-2 bg-lppm_premier text-white rounded-lg`}
                >
                  <p>{props.button}</p>
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
