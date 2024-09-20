const News = (props) => {
  return (
    <div className="flex gap-4 p-4 mt-4 items-center">
      <img
        src={props.img}
        alt="Gambar Berita"
        className="bg-fuchsia-500 h-32 rounded-lg"
      />

      <div className="flex flex-col h-32 gap-2">
        <h3 className="text-lg font-semibold">{props.title}</h3>
        <p className="text-xs">{props.desc}</p>
      </div>
    </div>
  );
};

export default News;
