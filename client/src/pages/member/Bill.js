import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";

import PayPalButton from "components/bill/paypal-button";

import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../../redux/user/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const BillItem = ({ item }) => {
    return (
        <div className=" w-full h-auto self-start py-3 ">
            <div className="flex flex-row w-full ">
                <div className="w-1/4 flex justify-center items-center">
                    <img
                        className="h-auto w-auto max-w-[100px] max-h-[150px] object-cover"
                        src={
                            item?.product?.image
                                ? item?.product?.image[0]?.image
                                : "https://via.placeholder.com/150"
                        }
                        alt="https://via.placeholder.com/150"
                    />
                </div>
                <div className="w-[35%] flex flex-col justify-start font-medium text-[18px] px-2">
                    <span>{item?.product?.title}</span>
                    <span className=" font-light opacity-70 text-[15px]">
                        {item?.color}
                    </span>
                    {item?.internal && (
                        <span className=" font-light opacity-70 text-[15px]">
                            {item?.internal}
                        </span>
                    )}
                </div>
                <div className="w-[10%] flex flex-col justify-center font-medium text-[18px]">
                    <span>x{item?.quantity}</span>
                </div>

                <div className="w-1/4 flex flex-col justify-center font-medium text-[18px]">
                    <span>{item?.product?.price} VND</span>
                </div>
            </div>
        </div>
    );
};

const BottomLine = ({color}) => {
    return (
        <div className={color ? `my-[20px] w-full h-[0.5px] border-b border-main-100` :" w-full h-[0.5px] border-b " } ></div>
    )
}

export default function Bill() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const { current, isLogin } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
        dispatch(getCurrent());

        
        let total=0;
        current?.cart?.forEach(item => {
            total += item.product.price * item.quantity
        })
        setAddress(current?.address)
        setTotal(total)
    }, []);

    return (
        <div class="w-full h-auto flex justify-center flex-col font-main">
            <div className="w-full h-auto flex justify-center px-[10%] flex-col my-[35px]">
                <Header />
         
                <div className="w-full h-[100px] flex flex-row justify-center items-center gap-5 ">
                    <BottomLine color={true}/>
                    <span className=" font-main font-semibold text-[30px]">
                        CHECKOUT
                    </span>
                    <BottomLine color={true}/>
                </div>

                <div className="w-full h-auto flex flex-col md:flex-row justify-between items-start gap-5">
                    <div className="flex flex-col w-full md:w-1/2 h-full justify-center items-center">
                        <span className=" font-main font-semibold text-[25px]">SHIPPING DETAIL</span>
                        <BottomLine color={true}/>
                        <div className="w-full h-auto flex flex-col justify-center items-center gap-5">
                            <div className="w-full h-auto flex flex-row justify-start items-center ">
                                <span className=" font-main font-semibold text-[20px] w-[30%]">Name</span>
                                <span className=" font-main w-[70%] text-[15px] font-light">{current?.firstName} {current?.lastName}</span>
                            </div>
                            <BottomLine />
                            <div className="w-full h-auto flex flex-row justify-start items-center ">
                                <span className=" font-main font-semibold text-[20px] w-[30%]">Email</span>
                                <span className=" font-main w-[70%] text-[15px] font-light">{current?.email}</span>
                            </div>
                            <BottomLine />
                            <div className="w-full h-auto flex flex-row justify-start items-center ">
                                <span className=" font-main font-semibold text-[20px] w-[30%]">Phone</span>
                                <span className=" font-main  w-[70%] text-[15px] font-light">{current?.mobile}</span>
                            </div>
                            <BottomLine />
                            <div className="w-full h-auto flex flex-row justify-start items-center ">                           
                                <span className=" font-main font-semibold text-[20px] w-[30%]">Address <span className=" text-main-100">*</span></span>
                                <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Please enter your address to complete the purchase " className="px-[10px] font-main text-[15px] w-[70%] h-[40px] border rounded"/>
                            </div>
                            <BottomLine />
                            <div className="w-full h-auto flex flex-row justify-start items-center ">                           
                                <span className=" font-main font-semibold text-[20px] w-[30%]">Note</span>
                                <input value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Write your note (shipping, time, ...)" className="px-[10px] font-main text-[15px] w-[70%] h-[40px] border rounded"/>
                            </div>
                            <BottomLine />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 h-auto justify-center items-center">
                        <span className=" font-main font-semibold text-[25px]">PAYMENT</span>
                        <BottomLine color={true} />
                        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                            {current?.cart?.map((item) => (
                                <>
                                    <BillItem item={item} />
                                    <BottomLine />
                                </>
                            ))}
                        </div>

                        <div className="w-full h-auto flex flex-row justify-between items-center my-5">
                                <span className=" font-main font-semibold text-[25px] ">Shipping</span>
                                <span className=" font-main  text-[18px] font-light">Free</span>
                        </div>
                        <div className="w-full h-auto flex flex-row justify-between items-center my-5">
                                <span className=" font-main font-semibold text-[25px] ">Total</span>
                                <span className=" font-main  text-[18px] font-light">{total} VND</span>
                        </div>
                        
                        <BottomLine color={true}/>
                        <PayPalButton address={address} note={note} currency={"USD"} amount={Math.round(total/25415)} payload={current?.cart} />
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
