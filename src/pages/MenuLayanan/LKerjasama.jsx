import { DataKerjasama } from "../../assets/DataKerjasama";
import React, { useRef, useEffect } from "react";

const LKerjasama = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 0;

    const scrollHorizontally = () => {
      scrollAmount += 1;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const scrollInterval = setInterval(scrollHorizontally, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full h-full lg:mt-10 font-pop">
      <div className="w-full h-full p-4 lg:px-20">
        <h1 className="font-semibold text-2xl text-center mb-5">Kerjasama</h1>
        <p className="text-justify ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
          quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
          risus vel viverra.
        </p>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-semibold">Tujuan Kerjasama</h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
            quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
            risus vel viverra. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer hendrerit massa ut sapien rhoncus, in
            aliquet elit tristique. Morbi quis ipsum placerat nunc vehicula
            faucibus. Maecenas iaculis sodales risus vel viverra. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer hendrerit massa
            ut sapien rhoncus, in aliquet elit tristique. Morbi quis ipsum
            placerat nunc vehicula faucibus. Maecenas iaculis sodales risus vel
            viverra.
          </p>
        </div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-semibold">Bentuk Kerjasama</h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
            quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
            risus vel viverra. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer hendrerit massa ut sapien rhoncus, in
            aliquet elit tristique. Morbi quis ipsum placerat nunc vehicula
            faucibus. Maecenas iaculis sodales risus vel viverra. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer hendrerit massa
            ut sapien rhoncus, in aliquet elit tristique. Morbi quis ipsum
            placerat nunc vehicula faucibus. Maecenas iaculis sodales risus vel
            viverra.
          </p>
        </div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-semibold">Panduan Kerjasama</h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
            quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
            risus vel viverra. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer hendrerit massa ut sapien rhoncus, in
            aliquet elit tristique. Morbi quis ipsum placerat nunc vehicula
            faucibus. Maecenas iaculis sodales risus vel viverra. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer hendrerit massa
            ut sapien rhoncus, in aliquet elit tristique. Morbi quis ipsum
            placerat nunc vehicula faucibus. Maecenas iaculis sodales risus vel
            viverra.
          </p>
        </div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-semibold">Kerjasama Penelitian dan Pengabdian</h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            hendrerit massa ut sapien rhoncus, in aliquet elit tristique. Morbi
            quis ipsum placerat nunc vehicula faucibus. Maecenas iaculis sodales
            risus vel viverra. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer hendrerit massa ut sapien rhoncus, in
            aliquet elit tristique. Morbi quis ipsum placerat nunc vehicula
            faucibus. Maecenas iaculis sodales risus vel viverra. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer hendrerit massa
            ut sapien rhoncus, in aliquet elit tristique. Morbi quis ipsum
            placerat nunc vehicula faucibus. Maecenas iaculis sodales risus vel
            viverra.
          </p>
        </div>
        <div className="mt-5 mb-2 flex flex-col gap-2">
          <h2 className="font-semibold">
            Mitra Kerjasama LPPM STIMK Sinar Nusantara
          </h2>
        </div>
      </div>
      <div className="border-t border-b border-slate-400">
        <div
          className="relative w-full overflow-x-auto whitespace-nowrap no-scrollbar py-4"
          ref={scrollContainerRef}
        >
          <div className="inline-flex">
            {DataKerjasama.map((item, index) => (
              <div
                className="w-32 lg:w-40 inline-block mx-4 self-center"
                key={index}
              >
                <img src={item.url} alt="Lgog" />
              </div>
            ))}
            {DataKerjasama.map((item, index) => (
              <div
                className="w-32 lg:w-40 inline-block mx-4 self-center"
                key={index}
              >
                <img src={item.url} alt="Lgog" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LKerjasama;
