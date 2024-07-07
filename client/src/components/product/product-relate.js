import { Link } from "react-router-dom";
import ProductCard from "./product-card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 414 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 414, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

export default function ProductRelate({ products }) {
    return (
        <div className="w-full h-auto py-5">
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="px-[3px]"
                className="w-full h-full"
            >
                {products?.map((item, index) => {
                    return (
                        <Link
                            to={`/${item.category}/${item._id}/${item.title}`}   
                            onClick={()=>window.scrollTo(0,0)}                        
                        >
                            <ProductCard key={index} product={item} />
                        </Link>
                    );
                })}
            </Carousel>
        </div>
    );
}
