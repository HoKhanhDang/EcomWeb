import { FaStar } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiShoppingCart } from "react-icons/ci";
import { RenderStar } from "ultils/helper";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiAddToCart } from "apis/userApi";
import { useSelector } from "react-redux";
import { ConvertPrice } from "ultils/helper";
import swal from "sweetalert";

export default function ProductCardBC({product}) {
    
    const { isLogin } = useSelector((state) => state.user);
    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!isLogin) {
            swal(
                "You need to login to add to cart",
                "Please login to continue",
                "warning"
            );
            return;
        }
        const rs = await apiAddToCart({
            pid: product._id,
            quantity: 1,
            color: product?.color[0]?.label || "Black",
        });
        console.log("rs", rs);
        toast.success("Add to cart successful!", {
            position: "top-right",
            autoClose: 2000,
        });
    };
    return (
        <div className="flex flex-col justify-center w-full h-full">
            <div className="h-[20%] flex flex-row justify-center items-center  w-full pt-5">
                
                    <p style={{alignSelf:'center'}} class="px-[25px] font-bold text-[25px] font-main text-main-text">Deal of the day!</p>
                
            </div> 
            <div  className="h-[60%]  pt-[10px] flex flex-col justify-center items-center mt-[30px]">                 
                <div class="w-full h-full flex flex-col justify-center items-center">
                    <img src={product.image[0].image} alt="" className="w-full h-full"/>
                    <div className="flex flex-row justify-start items-center pt-3">                      
                            <RenderStar totalRating={product.totalRating} isBig={true}/>                 
                            <p className="ml-1 text-[30px]">({product.totalRating})  </p>       
                    </div>
                    <div className="flex flex-col justify-center items-center p-3">
                        <p className="text-[25px] font-normal">{product.title}</p>
                        <p className="text-[23px] font-light">{ConvertPrice(product.price)} ₫</p>
                    </div>
                </div>                                                               
            </div>

            <div className="h-[20%] flex flex-row justify-center items-center">
                <div onClick={e=>{handleAddToCart(e)}} className="m-5 flex h-[40%] w-[45%] justify-center items-center bg-main-100 hover:bg-slate-500">
                    <p className="text-[15px] font-light text-white flex flex-row justify-around items-center"><CiShoppingCart className="text-[25px]"/> Add to Cart</p>
                </div>
                <Link to={`/${product.category}/${product._id}/${product.title}`} className="m-5 flex h-[40%] w-[45%] justify-center items-center bg-main-100 hover:bg-slate-500">
                    <p   className="text-[15px] font-light text-white flex flex-row justify-around items-center"> <GiHamburgerMenu className="text-[20px] mr-2"/> Info</p>
                </Link>
            </div>
        </div>
    )
}