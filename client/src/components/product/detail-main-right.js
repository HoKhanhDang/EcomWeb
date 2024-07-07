import { FaShieldAlt, FaTruck, FaGift, FaUndo, FaHeadset } from 'react-icons/fa';

function Item({icon, textMain, textNav}){
    return (
        <div className="w-auto h-[60px] flex flex-row justify-start items-center border px-3">
                <div className="bg-main-text rounded-full w-[25px] h-[25px] flex justify-center items-center">
                   {icon} 
                </div>

                <div className="flex flex-col justify-start ml-[20px]">
                    <span className=' text-[12px] font-semibold'>{textMain}</span>
                    <span className='text-[10px] opacity-40'>{textNav}</span>
                </div>
        </div>

    )
}

export default function DetailMainRight(){
    return( 
        <div className=" flex flex-col gap-1">
            <Item icon={<FaShieldAlt className='text-white text-[10px]'/>} textMain={"Guarantee"} textNav={"Quality Checked"}/>
            <Item icon={<FaTruck className='text-white text-[10px]'/>} textMain={"Free Shipping"} textNav={"Free On All Products"}/>
            <Item icon={<FaGift className='text-white text-[10px]'/>} textMain={"Special Gift Cards"} textNav={"Special Gift Cards"}/>
            <Item icon={<FaUndo className='text-white text-[10px]'/>} textMain={"Free Return"} textNav={"Within 7 Days"}/>
            <Item icon={<FaHeadset className='text-white text-[10px]'/>} textMain={"Consultancy"} textNav={"Lifetime 24/7/356"}/>
        </div>

    )
}