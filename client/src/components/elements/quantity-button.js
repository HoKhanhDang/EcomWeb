import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
export default function QuantityButton() {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        setQuantity(prev => prev +1)
    };
    const handleMinus =() => {
        if (quantity===1 ){
            return
        }
        setQuantity(prev => prev -1)
    }
    return (
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
    );
}
