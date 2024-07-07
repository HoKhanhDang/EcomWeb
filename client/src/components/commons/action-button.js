import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import { useSelector } from "react-redux";
import { apiAddToCart } from "apis/userApi";

//alert
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";

export default function ActionButton({product}) {

    const {isLogin} = useSelector(state => state.user);


    const handleAddToCart = async (e) => { 
        e.stopPropagation();
        if (!isLogin){
            swal("You need to login to add to cart", "Please login to continue", "warning")
            return
        }
        const rs = await apiAddToCart({pid:product._id,quantity:1,color: product?.color[0]?.label || 'Black'});
        toast.success('Add to cart successful!', {
            position: "top-right",
            autoClose: 2000
        });

    }
    const handleGoToOrder = (e) => { 
        e.stopPropagation();
    }
    return (
        <div className="flex flex-row justify-center items-center">
            <div onClick={(e)=>handleAddToCart(e)} className="h-[30px] w-[30px] shadow-md bg-white border-[1px] hover:bg-gray-500 hover:text-white border-gray-300 mx-1 rounded-full flex justify-center items-center ">
                <FaHeart class=" text-[20px] text-red-400"/>
            </div>
            <div onClick={e=>{handleGoToOrder(e)}} className=" h-[30px] w-[80px] shadow-md bg-white border-[1px] hover:bg-gray-500 hover:text-white border-gray-300 mx-1  rounded-full flex justify-center items-center ">
                <MdOutlineShoppingCartCheckout class="text-[20px] "/> <span className="text-[10px]">Buy now</span>
            </div>
            
        </div>
    )

}