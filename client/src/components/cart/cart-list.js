import QuantityButton from "components/elements/quantity-button";
import { TiPlus, TiMinus } from "react-icons/ti";
import { useEffect, useState } from "react";
import { apiGetProductById } from "apis/productApi";
import { toast } from "react-toastify";
import { apiDeleteCart, apiUpdateQuantity } from "apis/userApi";

import { useDispatch } from "react-redux";
import { getCurrent } from "../../redux/user/userActions";

export function CartItem({ item }) {
    //handle quantity
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    const handleAdd =  async() => {
        setQuantity((prev) => prev + 1);

        //logic plus 
        const rs = await apiUpdateQuantity({pid: item?.product?._id, quantity: quantity+1})
        dispatch(getCurrent());
    };
    const handleMinus = async () => {
        if (quantity === 1) {
            return;
        }
        setQuantity((prev) => prev - 1);
        //logic minus
        const rs = await apiUpdateQuantity({pid: item?.product?._id, quantity: quantity-1})
        dispatch(getCurrent());

    };

    const fetchProduct = async () => {
        const rs = await apiGetProductById(item?.product?._id);
        setProduct(rs?.data?.res);
        setQuantity(item?.quantity);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleRemove = async () => {
        const rs = await apiDeleteCart(item?.product?._id);
        if (!rs) {
            return toast.error(rs?.data?.message, { timeout: 2000 });
        }
        toast.success("Remove success", { timeout: 2000 });
        dispatch(getCurrent());
    };

    return (
        <div className="flex flex-row w-full border-b-2 py-[20px]">
            <div className="w-[50%] md:w-[60%] self-start py-3">
                <div className="flex flex-row w-full">
                    <div className="w-1/2 flex justify-center items-center">
                        <img
                            className="h-auto w-auto max-w-[100px] max-h-[150px] md:max-w-[150px] md:max-h-[200px] object-cover"
                            src={
                                item?.product?.image
                                    ? item?.product?.image[0]?.image
                                    : "https://via.placeholder.com/150"
                            }
                            alt="https://via.placeholder.com/150"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-start font-medium text-[15px] md:text-[18px]">
                        <span>{item?.product?.title}</span>
                        <span className=" font-light opacity-70 text-[12px] md:text-[15px]">
                            {item?.color}
                        </span>
                        {item?.internal && (
                            <span className=" font-light opacity-70 text-[12px] md:text-[15px]">
                                {item?.internal}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[25%] md:w-[20%]  flex flex-col justify-center items-center md:justify-start md:items-start p-3 gap-5">
                <div className="w-[100%] flex flex-row">
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
                <span
                    onClick={handleRemove}
                    className="text-[8px] md:text-[18px] font-semibold opacity-50 cursor-pointer hover:text-main-100 hover:opacity-100"
                    
                >
                    Remove
                </span>
            </div>
            <div className="w-[25%] md:w-[20%] flex flex-col justify-center items-center md:justify-start md:items-start p-3">
                <span className="font-normal text-main-text">
                    {item?.product?.price}₫
                </span>
            </div>
        </div>
    );
}
export default function ListCart({ cart }) {
    return (
        <div className="flex flex-col w-full md:w-[60%] h-full font-main">
            <div className="flex flex-row w-full border-b-2 text-main-100 font-bold text-[13px] md:text-[18px]">
                <span className="w-[50%] md:w-[60%] self-start py-3">ITEM</span>
                <span className="w-[25%] md:w-[20%] self-start p-3">QUANTITY</span>
                <span className="w-[25%] md:w-[20%] self-start p-3">PRICE</span>
            </div>
            {cart?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[300px] font-main font-semibold text-main-text text-[20px] ">
                    Your cart is empty!
                </div>
            ) : (
                <>
                    {cart?.map((item, index) => {
                        console.log('item', item);
                        return <CartItem key={index} item={item} />;
                    })}
                </>
            )}
           
        </div>
    );
}
