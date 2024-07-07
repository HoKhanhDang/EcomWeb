import { useState, useEffect } from "react";
import apis from "../../apis";
import ProductCard from "./product-card";
import ProductCardBC from "./product-bestchoice";
import { useNavigate } from "react-router-dom";
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

const tabs = [
    { id: 1, title: "Best Seller" },
    { id: 2, title: "New Arrival" },
    { id: 3, title: "SmartPhone" },
    { id: 4, title: "Laptop" },

];

const banners = [
    {
        id: 1,
        image: "https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657",
    },
    {
        id: 2,
        image: "https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657",
    },
];
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};
export default function Product() {

    const [activeTab, setActiveTab] = useState(1);
    const [newArrival, setNewArrival] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [laptopProducts, setLaptopProducts] = useState([]);
    const [smartphoneProducts, setSmartphoneProducts] = useState([]);


    const navigate = useNavigate();
    const fetchData = async () => {
        const getData = await Promise.all([
            apis.productApi.apiGetProduct({ sort: "-sold" }),
            apis.productApi.apiGetProduct({ sort: "-createAt" }),
            apis.productApi.apiGetProduct({ category: "laptop" }),
            apis.productApi.apiGetProduct({ category: "smartphone" }),
        ]);
        setBestSeller(getData[0].data?.res);
        setNewArrival(getData[1].data?.res);
        setLaptopProducts(getData[2].data?.res);
        setSmartphoneProducts(getData[3].data?.res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    
    return (
        <div class="pt-5 flex flex-row justify-start h-auto md:h-[800px] w-full max-w-full   ">
            <div class="w-[25%] max-w-[25%] h-full  border-[1px] hidden md:flex flex-col justify-start items-center ">
                {bestSeller[0] && <ProductCardBC product={bestSeller[0]} />}
            </div>
            <div class="w-full md:w-[75%]  flex flex-col justify-start items-center h-auto pl-[15px]">
                <div className="flex h-[50px] md:h-[10%] w-full flex-row justify-start items-center border-b-[1px] border-t font-main font-medium">
                    {tabs?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className={`px-5 cursor-pointer font-semibold text-[8px] md:text-[20px] ${
                                        activeTab === item.id
                                            ? "text-main-100"
                                            : "text-black"
                                    } ${
                                        +index !== tabs.length
                                            ? "border-l-[2px]"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    {item.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className=" h-auto md:h-[70%] w-full py-2 ">
                    {/* <Slider {...settings} class=" w-full border-none ">
                        {
                            activeTab === 1 
                            ? bestSeller.map((item, index) => {
                                return (
                                    <div key={index} onClick={()=> navigate(`/${item.category}/${item._id}/${item.title}`)}>
                                        <ProductCard key={index} product={item} id={1} isAction={true} />                   
                                    </div>
                                )
                            })
                            : 
                            newArrival.map((item, index) => {
                                return (
                                    <div onClick={()=> navigate(`/${item.category}/${item._id}/${item.title}`)}>
                                        <ProductCard key={index} product={item} id={2} isAction={true} />                   
                                    </div>
                                )
                            })
                        }                   
                    </Slider>   */}
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
                        {  activeTab === 1 && (
                                bestSeller.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    `/${item.category}/${item._id}/${item.title}`
                                                )
                                            }
                                        >
                                            <ProductCard
                                                key={index}
                                                product={item}
                                                id={1}
                                                isAction={true}
                                            />
                                        </div>
                                    );
                                })
                            ) 
                        }
                        {  activeTab ===2 && (
                                newArrival.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    `/${item.category}/${item._id}/${item.title}`
                                                )
                                            }
                                        >
                                            <ProductCard
                                                key={index}
                                                product={item}
                                                id={2}
                                                isAction={true}
                                            />
                                        </div>
                                    );
                                })
                            ) 
                        }
                        {  activeTab ===3 && (
                                smartphoneProducts.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    `/${item.category}/${item._id}/${item.title}`
                                                )
                                            }
                                        >
                                            <ProductCard
                                                key={index}
                                                product={item}
                                                
                                                isAction={true}
                                            />
                                        </div>
                                    );
                                })
                            ) 
                        }
                        {  activeTab ===4 && (
                                laptopProducts.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    `/${item.category}/${item._id}/${item.title}`
                                                )
                                            }
                                        >
                                            <ProductCard
                                                key={index}
                                                product={item}
                                                
                                                isAction={true}
                                            />
                                        </div>
                                    );
                                })
                            ) 
                        }
                         
                    </Carousel>
                </div>
                <div className=" md:h-[20%] w-full hidden md:flex  flex-row justify-start items-center pt-5 gap-[10px]">
                    <div className="w-[50%] h-full ">
                        <img
                            src={banners[0].image}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-[50%] h-full ">
                        <img
                            src={banners[1].image}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
