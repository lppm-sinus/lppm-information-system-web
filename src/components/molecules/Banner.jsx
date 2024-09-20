import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { ImageSlider } from "../../assets/ImageMenu";

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    const isFirstImage = currentImage === 0;
    const newImageSlider = isFirstImage
      ? ImageSlider.length - 1
      : currentImage - 1;
    setCurrentImage(newImageSlider);
  };

  const nextImage = () => {
    const isLastImage = currentImage === ImageSlider.length - 1;
    const newImageSlider = isLastImage ? 0 : currentImage + 1;
    setCurrentImage(newImageSlider);
  };

  return (
    <div className="w-full h-60 lg:h-96 relative object-cover group">
      <div
        style={{ backgroundImage: `url(${ImageSlider[currentImage].img})` }}
        className="w-full h-full bg-center bg-cover duration-300"
      >
        <div className="relative bg-gradient-to-b from-transparent to-gray-900 h-full">
          <div className="absolute inset-x-0 bottom-0">
            <div className="p-2 md:p-4 text-white">
              <p className="font-semibold text-sm md:text-base">
                Selamat Datang di Situs Resmi
              </p>
              <p className="text-lg md:text-xl font-semibold">
                Lembaga Pengabdian dan Penelitian Masyarakat
              </p>
              <div className="flex justify-between">
                <p className="text-xs md:text-sm font-semibold">
                  STIMIK Sinar Nusantara
                </p>
                <div className="flex items-end justify-end text-white">
                  <div className="rounded-xl flex items-center bg-blue-900 p-2">
                    <button>About</button>
                    <FaAngleRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[10%] lg:top-[30%] -translate-x-0 translate-y-[50%] left-3 text-xl rounded-full p-2 bg-white cursor-pointer">
        <FaAngleLeft onClick={prevImage} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[10%] lg:top-[30%] -translate-x-0 translate-y-[50%] right-3 text-xl rounded-full p-2 bg-white cursor-pointer">
        <FaAngleRight onClick={nextImage} size={30} />
      </div>
    </div>
  );
};

export default Banner;
