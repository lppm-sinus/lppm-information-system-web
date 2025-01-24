import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    const isFirstImage = currentImage === 0;
    const newImageSlider = isFirstImage ? data.length - 1 : currentImage - 1;
    setCurrentImage(newImageSlider);
  };

  const nextImage = () => {
    const isLastImage = currentImage === data.length - 1;
    const newImageSlider = isLastImage ? 0 : currentImage + 1;
    setCurrentImage(newImageSlider);
  };

  return (
    <div className="w-full h-60 lg:h-[500px] 2xl:h-[600px] relative object-cover group">
      <div
        style={{
          backgroundImage: `url(/api/storage/${data[currentImage]?.image_url})`,
        }}
        className="w-full h-full bg-center bg-cover duration-300"
      >
        <div className="relative bg-gradient-to-b from-transparent to-zinc-800 h-full">
          <div className="absolute inset-x-0 bottom-0">
            <div className="p-2 md:p-4 md:px-10 lg:px-20 text-white">
              <p className="text-lg md:text-xl mb-2 lg:text-2xl font-semibold">
                {data[currentImage]?.title}
              </p>
              <p className="text-sm md:text-base mb-3">
                {data[currentImage]?.container}
              </p>
              <div className="flex justify-end items-end">
                <div className="w-auto text-white">
                  <div className="rounded-xl bg-white p-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <Link to={"/tentang"}>
                      <div className="flex items-center text-lppm_premier text-sm font-semibold gap-2">
                        <button>Tentang Kami</button>
                        <FaAngleRight />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[10%] lg:top-[30%] -translate-x-0 translate-y-[50%] left-3 text-xl rounded-full p-2 bg-white hover:bg-gray-100 cursor-pointer">
        <FaAngleLeft onClick={prevImage} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[10%] lg:top-[30%] -translate-x-0 translate-y-[50%] right-3 text-xl rounded-full p-2 bg-white hover:bg-gray-100 cursor-pointer">
        <FaAngleRight onClick={nextImage} size={30} />
      </div>
    </div>
  );
};

export default Banner;
