import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";
import ListCart from "components/cart/cart-list";
import Checkout from "components/cart/cart-checkout";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../../redux/user/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {current, isLogin} = useSelector(state => state.user)

    useEffect(() => {
        if(!isLogin){
            navigate("/")
        }
        dispatch(getCurrent())
    },[])

    return (
        <div class="w-full flex justify-center flex-col font-main">
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header />
                <Navbar />
                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <div className="h-[100px] flex justify-center items-center font-bold opacity-70 text-[15px] md:text-[20px] w-full bg-[#F0F0F0]">Your shopping CART: {current?.cart?.length} {current?.cart?.length >= 2 ? "items": "item"}</div>
                    <div className="flex flex-col md:flex-row justify-start items-center w-full h-auto mt-2 gap-5 font-main">
                        <ListCart cart={current?.cart}/>

                        <Checkout/>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer/>
            
        </div>
    );
}
