import {contantsInformationProduct} from "../../ultils/contants";
import { useState } from "react";
export default function ProductInformation({product}) {

    const [isActive, setIsActive] = useState(0);
    return (
        <div className="w-full h-auto mt-[50px] flex flex-col justify-start items-center relative">
            <div className="w-full h-[50px] flex flex-row gap-2 items-center justify-start pt-1 mb-[-0.5px]">
                {contantsInformationProduct.map((item, index) => {
                    return(           
                        <div onClick={()=>setIsActive(index)} className={isActive===index ? " text-[10px] md:text-[18px] text-main-text font-bold bg-white border-x border-t border-b-white h-full w-[25%] flex justify-center items-center px-5 z-50" :" text-[10px] md:text-[18px] text-main-text font-bold bg-gray-200 h-full w-[25%] border flex justify-center items-center px-5" }>
                            {item?.name}
                        </div>
                    )
                })}
            </div>
            <div className="w-full h-auto border z-0 p-[25px]">
                <text className=" opacity-70">
                    {contantsInformationProduct[isActive].name === "Description" ? product?.description : contantsInformationProduct[isActive].data}
                </text>
            </div>
        </div>
    );
}
