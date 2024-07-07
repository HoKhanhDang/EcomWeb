import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { thumbImages } from "ultils/contants";

export default function Sidebar() {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <div className="flex flex-row h-auto md:h-[450px] pt-[20px] w-full ">
            <div className="w-full h-full">
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlaySpeed={10000}
                    autoPlay={true}
                    keyBoardControl={true}
                    customTransition="all 2s"
                    transitionDuration={2000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className="w-full h-full"
                >
                    {thumbImages.map((item,index) => {

                        return (
                            <div key={index} className="w-full h-auto">
                                <img src={item.image} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        )
                    })}
                </Carousel>          
            </div>
        </div>
    );
}
