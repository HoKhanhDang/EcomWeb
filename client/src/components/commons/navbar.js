import Dropdown from "../elements/dropdown";
import { contantsNav } from "../../ultils/contants";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "ultils/path";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    //with phone mode
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate(); 
    const handleSetKeyword = (e) => {
        setKeyword(e.target.value);
        navigate(`/${path.SEARCH}?key=${e.target.value}`);
    };

    //
    const { category } = useSelector((state) => state.app);
    const windowWidth = window.innerWidth;
    console.log("windowWidth", windowWidth);

    return (
        <div class="flex flex-row justify-center items-center w-full border-y-2 h-[60px]">
            <div class="w-[400px] md:w-auto h-[30px] hidden md:flex flex-row justify-start items-center font-main font-medium">
                {contantsNav.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            to={item.isDropdown ? "" : `/${item.path}`}
                            className={({ isActive }) => {
                                return isActive && !item.isDropdown
                                    ? "text-main-100 font-main font-bold text-[12px] md:text-[18px]"
                                    : "text-[12px] md:text-[18px] hover:text-main-100 text-main-text";
                            }}
                        >
                            <Dropdown item={item} />
                        </NavLink>
                    );
                })}
            </div>
            <div class="w-[400px] md:w-auto h-[30px] flex md:hidden flex-row justify-between items-center font-main font-medium">
                <NavLink
                    to={path.HOME}
                    className={({ isActive }) => {
                        return isActive
                            ? "text-main-100 font-main font-bold text-[18px]"
                            : "text-[18px] hover:text-main-100 text-main-text";
                    }}
                >
                    Home
                </NavLink>
                <div class="w-5/6 md:hidden flex flex-row justify-center items-center gap-5 ">
                    <div className="w-[60%] h-[40px] border rounded-[100px] px-[35px] flex justify-center items-center relative">
                        <input
                            id="searchInput"
                            value={keyword}
                            onChange={(e) => {
                                handleSetKeyword(e);
                            }}
                            onFocus={() => {
                                navigate(`/${path.SEARCH}`);
                            }}
                            type="text"
                            class="w-full h-full text-[10px] font-light  text-main-text border-none outline-none z-0 bg-transparent"
                            placeholder="Search here..."
                    
                        />
                        <div className="h-full w-auto absolute right-5 opacity-50 flex justify-center items-center ">
                            <GoSearch className=" text-[20px] opacity-90 hover:text-main-100" />
                        </div>
                    </div>
                </div>
                <RxHamburgerMenu className="text-[25px] text-main-text" />
            </div>
        </div>
    );
}
