import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Checkout() {
    const {current} = useSelector(state => state.user)
    const navigate = useNavigate()

    const [subtotal, setSubtotal] = useState(1)
    const [total, setTotal] = useState(1)

    useEffect(() => {
        if(!current?.cart) return;
        let sub = 0;
        current?.cart?.forEach(item => {
            sub += item?.product?.price * item?.quantity
        })
        setSubtotal(sub)
        setTotal(sub)
    }, [current])

    const handleCheckout = () => {
        console.log('checkout',current?.cart.length);
        if(current?.cart.length ===0) {
            swal("Cart is empty", "Please add some items to cart", "info")
            return
        };
        navigate('/bill')
    }
    return (
        <div className="flex flex-col self-start w-full md:w-[40%] h-auto p-5 gap-5 bg-red-50 rounded">
            <div className="flex flex-row justify-between items-center border-b-2 py-5">
                <span className=" text-main-text opacity-50 text-[14px]">
                    Subtotal
                </span>
                <span className=" text-main-text text-[20px] md:text-[25px] font-semibold">
                    {
                        current !== null && current?.cart?.length > 0 ? subtotal : 0 
                    }₫
                </span>
            </div>
            <div className="flex flex-row justify-between items-center border-b-2 py-5">
                <span className=" text-main-text opacity-50 text-[14px]">
                    Shipping
                </span>
                <span className=" text-main-text text-[25px] font-semibold">
                    Free
                </span>
            </div>
            <div className="flex flex-row justify-between items-center">
                <span className=" text-black opacity-80 text-[24px]">
                    TOTAL
                </span>
                <span className=" text-main-text text-[25px] md:text-[35px] font-semibold">
                    {
                        current !== null && current?.cart?.length > 0 ? total : 0
                }₫
                </span>
            </div>

            <div onClick={handleCheckout} className="w-full h-[50px] bg-main-100 flex justify-center items-center text-white rounded hover:bg-red-400">
                Check Out
            </div>
        </div>
    );
}
