import { GoDot } from "react-icons/go";
import { ConvertPrice, RenderStar } from "ultils/helper";
import { useState } from "react";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { apiAddToCart } from "apis/userApi";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { toast } from "react-toastify";

export default function DetailMainMid({ product }) {
    const [optionColor, setOptionColor] = useState(0);
    const [optionInternal, setOptionInternal] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { isLogin } = useSelector((state) => state.user);

    const handleAdd = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleMinus = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = async () => {
        if (!isLogin) {
            swal(
                "Please login to continue",
                "You need to login to continue!",
                "warning"
            );

            return;
        }

        const color = product?.color[optionColor]?.label || null;
        const internal = product?.internal[optionInternal]?.label || null;

        if (internal === null) {
            const rs = await apiAddToCart({
                pid: product._id,
                quantity: quantity,
                color: color,
                internal: "",
            });
        } else {
            const rs = await apiAddToCart({
                pid: product._id,
                quantity: quantity,
                internal: internal,
                color: color,
            });
        }
        toast.success("Add to cart success", { timeout: 2000 });
    };
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <div className="font-bold text-main-text text-[30px] w-full h-[50px] flex flex-row items-center justify-start">
                {product.title}
            </div>
            <div className="w-full h-[50px] flex flex-row items-center justify-start">
                <p className="text-[30px] font-bold text-main-text">
                    {ConvertPrice(product.price)} ₫
                </p>
            </div>
            <div className="w-full h-[50px] flex flex-row items-center justify-start ">
                <span className=" underline text-[20px] font-semibold mr-2">
                    {product.totalRating}
                </span>
                <RenderStar totalRating={product.totalRating} isBig={true} />{" "}
                <span className="ml-2">({product.rating.length} ratings)</span>
            </div>

            <div className="w-full h-auto flex flex-col items-center justify-start py-3">
                {product.description.split("\n").map((item, index) => {
                    return (
                        <>
                            {index < 10 && item != "" && (
                                <div className="w-full flex flex-row items-center py-[2px]">
                                    <GoDot />
                                    <span className="pl-[10px] opacity-70">
                                        {item}
                                    </span>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
            {product?.internal.length > 0 && (
                <div className="w-full h-full flex flex-row items-center py-2">
                    <div className="w-[20%]">
                        <span className=" font-semibold">Internal</span>
                    </div>
                    <div className="w-[80%] flex flex-row gap-2">
                        {product?.internal.map((item, index) => {
                            return (
                                <div
                                    onClick={() => setOptionInternal(index)}
                                    key={index}
                                    className={
                                        optionInternal == index
                                            ? "w-auto px-2 h-[40px] flex items-center justify-center border border-main-100 text-main-100"
                                            : "w-auto px-2 h-[40px] border flex items-center justify-center hover:bg-main-100 hover:text-white"
                                    }
                                >
                                    <span className=" opacity-70">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {product?.color.length > 0 && (
                <div className="w-full h-full flex flex-row items-center py-2">
                    <div className="w-[20%]">
                        <span className=" font-semibold">Color</span>
                    </div>
                    <div className="w-[80%] flex flex-row gap-2">
                        {product?.color.map((item, index) => {
                            return (
                                <div
                                    onClick={() => setOptionColor(index)}
                                    key={index}
                                    className={
                                        optionColor == index
                                            ? "w-auto px-2 h-[40px] flex items-center justify-center border border-main-100 text-main-100"
                                            : "w-auto px-2 h-[40px] border flex items-center justify-center hover:bg-main-100 hover:text-white"
                                    }
                                >
                                    <span className=" opacity-70">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="w-full h-full flex flex-row items-center py-5">
                <div className="w-[20%]">
                    <span className=" font-semibold">Quantity</span>
                </div>
                <div className="w-[80%] h-full flex flex-row">
                    <button
                        onClick={handleMinus}
                        className="border h-[30px] w-[30px] flex justify-center items-center text-[18px]"
                    >
                        <TiMinus />
                    </button>
                    <span className="border h-[30px] w-[60px] flex justify-center items-center text-[18px]">
                        {quantity}
                    </span>
                    <button
                        onClick={handleAdd}
                        className="border h-[30px] w-[30px] flex justify-center items-center text-[18px]"
                    >
                        <TiPlus />
                    </button>
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="my-5 w-full h-[40px] bg-main-100 text-white hover:bg-red-400"
            >
                <span className=" font-semibold"> ADD TO CART</span>
            </button>
        </div>
    );
}
