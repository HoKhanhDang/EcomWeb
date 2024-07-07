import { Link } from "react-router-dom";
import path from "ultils/path";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrent } from "../../redux/user/userActions";
import { IoExitOutline } from "react-icons/io5";

import { logout } from "../../redux/user/userSlice";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function TopNavigation() {
    const dispatch = useDispatch();
    const { isLogin, current } = useSelector((state) => state.user);

    useEffect(() => {
        if (isLogin) {
            const timer = setTimeout(() => {
                dispatch(getCurrent());
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, isLogin]);

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="bg-[#F0F0F0] fixed top-0 w-full md:w-full h-[35px] px-[10%] flex flex-row justify-center md:justify-between items-center z-0">
            <p className="hidden md:block text-nav">Welcome to our Shop!</p>
            <div className="flex flex-row gap-5 items-center">
                {isLogin ? (
                    <>
                        <div className="flex flex-row justify-start items-center gap-4">
                            <p className="text-[15x] hover:text-main-100 ">
                                <FaInstagram />
                            </p>
                            <a
                                href="https://www.facebook.com/khanhdang.ho.16/"
                                className="text-[15x] hover:text-main-100"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ho-khanh-dang-77b095315"
                                className="text-[15x] hover:text-main-100"
                            >
                                <FaLinkedin />
                            </a>
                            <span className="text-nav ">
                                Welcome <span className=" text-main-100">{current?.firstName}</span>
                            </span>
                            <IoExitOutline
                                className="hover:text-main-100"
                                onClick={handleLogout}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row justify-start items-center">
                            <p className="text-[15x] hover:text-main-100 mr-3">
                                <FaInstagram />
                            </p>
                            <a
                                href="https://www.facebook.com/khanhdang.ho.16/"
                                className="text-[15x] hover:text-main-100 mr-3"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ho-khanh-dang-77b095315"
                                className="text-[15x] hover:text-main-100 mr-3"
                            >
                                <FaLinkedin />
                            </a>
                            <Link
                                to={path.LOGIN}
                                className="text-nav hover:text-main-100"
                            >
                                Login
                            </Link>
                            <span className="text-nav mx-[3px]">or</span>
                            <Link
                                to={`/login/reg`}
                                className="text-nav hover:text-main-100"
                            >
                                Create an account
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
