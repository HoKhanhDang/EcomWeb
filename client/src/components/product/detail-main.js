import Slider from "react-slick";
import DetailMainMid from "./detail-main-mid";
import DetailMainRight from "./detail-main-right";

import { useState } from "react";

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

export default function DetailMain({ product }) {
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className="h-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-4 gap-[30px] mt-3">
            <div className="col-span-1 md:col-span-5  md:row-span-3 border overflow-auto p-5">
                <img
                    className="object-fit w-[300px] h-[400px] md:w-full md:h-full"
                    src={product.image[imageIndex].image}
                    alt={product.title}
                />
            </div>
            <div className=" col-span-1 md:col-span-5  md:row-span-4 ">
                <DetailMainMid product={product} />
            </div>
            <div className=" hidden md:block md:col-span-2  md:row-span-4 "> 
                <DetailMainRight/>
            </div>

            <div className="col-span-1 md:col-span-5  md:row-span-1 w-full h-full">
                <Slider  className="w-[100%] h-[100%]" {...settings}>
                    {product.image.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="h-full"
                            >
                                <img
                                    onClick={() => setImageIndex(index)}
                                    src={item.image}
                                    alt={product.title}
                                    className="w-full h-full max-h-[150px] object-fit p-5"
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
