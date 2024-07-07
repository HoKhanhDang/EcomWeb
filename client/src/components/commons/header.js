import icon from "ultils/icons.js";
import { GoSearch } from "react-icons/go";

import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import path from "ultils/path";
import { useSelector } from "react-redux";
import swal from "sweetalert";

export default function Header() {
    const [keyword, setKeyword] = useState("");

    const [params] = useSearchParams();

    const navigate = useNavigate();
    const { isLogin, current } = useSelector((state) => state.user);
    const handleGoToCart = () => {
        if (!isLogin) {
            swal(
                "Please login to continue",
                "You need to login to continue",
                "info"
            );
            return;
        }
        navigate(`/${path.CART}`);
    };
    const handleGoToProfile = () => {
        if (!isLogin) {
            swal(
                "Please login to continue",
                "You need to login to continue",
                "info"
            );
            return;
        }
        navigate(`/${path.PROFILE}`);
    };

    const handleSetKeyword = (e) => {
        setKeyword(e.target.value);
        navigate(`/${path.SEARCH}?key=${e.target.value}`);
    };


    return (
        <div id="home" class="w-full h-[140px] flex flex-row justify-between md:justify-evenly items-center">
            <Link to="/" class="w-1/2 md:w-1/6 flex justify-center items-center p-[5px]">
                <img
                    className=" w-auto h-auto"
                    src={require("../../assets/logo.png")}
                    alt=""
                />
            </Link>

            <div class="w-4/6 hidden md:flex flex-row justify-center items-center gap-5 ">
                <div className="w-[60%] h-[60px] border rounded-[100px] px-[35px] flex justify-center items-center relative">
                    <input
                        id="searchInput"
                        
                        value={keyword}
            
                        onChange={(e)=>{handleSetKeyword(e)}}

                        onFocus={() => {navigate(`/${path.SEARCH}`)}}
                        type="text"
                        class="w-full h-full  text-main-text border-none outline-none z-0 bg-transparent"

                        placeholder="Enter something to search..."
                        
                    />
                    <div className="h-full w-auto absolute right-5 opacity-50 flex justify-center items-center ">
                        <GoSearch
                            className=" text-[40px] opacity-90 hover:text-main-100"
                        />
                    </div>
                </div>
            </div>

            <div class="flex w-1/3 md:w-1/6  flex-row justify-center ">
                <div
                    class="px-[20px] flex justify-center items-center"
                    onClick={handleGoToCart}
                >
                    <icon.CiShoppingCart class="text-[30px] text-main-100 hover:text-main-text" />{" "}
                    <span class="text-main font-semibold">
                        {isLogin === true ? `(${current?.cart.length})` : null}{" "}
                    </span>
                </div>

                <div
                    onClick={handleGoToProfile}
                    class="px-[20px] flex justify-center items-center border-l-2"
                >
                    <icon.RiAccountCircleLine class="text-[30px] text-main-100 hover:text-main-text" />
                </div>
            </div>
        </div>
    );
}
