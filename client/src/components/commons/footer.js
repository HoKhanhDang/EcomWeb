import { MdEmail } from "react-icons/md";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { SiAmericanexpress } from "react-icons/si";
import { SiPaypal } from "react-icons/si";
import { SiApplepay } from "react-icons/si";

export default function Footer() {
    return (
        <div className="w-full h-full flex flex-col mt-[100px]">
            <div className="h-[100px] w-full px-[10%] flex flex-row justify-between items-center bg-main-100">
                <div className="flex flex-col gap-[1px]">
                    <p className=" font-main text-white text-[22px]  ">
                        SIGN UP TO NEWSLETTER
                    </p>
                    <p className=" hidden md:block font-main text-white text-opacity-70 text-[15px]">
                        Subscribe now and receive weekly newsletter
                    </p>
                </div>
                <div className="flex flex-row relative">
                    <input
                        placeholder="Email address"
                        type="text"
                        className="px-[30px] w-[100%] md:w-[400px] h-[50px] border-[1px] border-main-100 rounded-[50px]"
                    />
                    <button className=" absolute top-[20%] right-[15px] h-[30px]  rounded-[100%] text-[30px] text-main-100 ">
                        <MdEmail />
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row w-full h-auto px-[10%] bg-[#191919] text-white py-[30px]">
                <div className="  md:w-[40%] h-full flex flex-col mb-5">
                    <div className="flex flex-row text-[18px] justify-start items-center border-l-[5px] border-l-main-100 border-w-[5px]">
                        <p className="px-5 font-semibold">ABOUT US</p>
                    </div>
                    <div className="text-[13px] flex flex-col gap-[10px] pt-5 ">
                        <div className="flex flex-row text-[15px] md:text-[13px] justify-start items-center">
                            <span className="f font-bold ">Address</span>:261 -
                            263 Khánh Hội, P2, Q4, TP. Hồ Chí Minh
                        </div>
                        <div className="flex flex-row text-[15px] md:text-[13px] justify-start items-center">
                            <span className="f font-bold ">Phone</span>:
                            (+1234)56789xxx
                        </div>
                        <div className="flex flex-row text-[15px] md:text-[13px] justify-start items-center">
                            <span className="f font-bold ">Mail</span>:
                            hokhanhdang203@gmail.com
                        </div>
                    </div>
                </div>
                <div className="  md:w-[20%] h-full ">
                    <div className="flex flex-row text-[18px] justify-start items-center border-l-[5px] border-l-main-100 border-w-[5px]">
                        <p className="px-5 font-semibold">INFORMATION</p>
                    </div>
                    <div className="text-[13px] flex flex-col gap-[10px] pt-5">
                        <div className="flex flex-row justify-start items-center hover:text-main-100">
                            Typography
                        </div>
                        <div className="flex flex-row justify-start items-center  hover:text-main-100 ">
                            Store Location
                        </div>
                        <div className="flex flex-row justify-start items-center  hover:text-main-100">
                            Contact
                        </div>
                    </div>
                </div>
                <div className=" hidden md:block  md:w-[20%] h-full ">
                    <div className="flex flex-row text-[18px] justify-start items-center border-l-[5px] border-l-main-100 border-w-[5px]">
                        <p className="px-5 font-semibold">WHO WE ARE</p>
                    </div>
                    <div className="text-[13px] flex flex-col gap-[10px] pt-5">
                        <div className="flex flex-row justify-start items-center  hover:text-main-100">
                            Help
                        </div>
                        <div className="flex flex-row justify-start items-center  hover:text-main-100">
                            FAQs
                        </div>
                        <div className="flex flex-row justify-start items-center  hover:text-main-100">
                            Return & Exchange
                        </div>
                    </div>
                </div>
                <div className=" hidden md:block  md:w-[20%] h-full ">
                    <div className="flex flex-row text-[18px] justify-start items-center border-l-[5px] border-l-main-100 border-w-[5px]">
                        <p className="px-5 font-semibold">#DIGITALSHOP</p>
                    </div>
                </div>
            </div>

            <div className="text-white h-[100px] w-full px-[10%] flex flex-col md:flex-row justify-between items-center bg-black py-5">
                <p>© 2024, Powered by Shopify</p>
                <div className="flex flex-row gap-[40px] my-2">
                    <SiVisa className="text-white text-[40px]" />
                    <SiMastercard className="text-white text-[40px]" />
                    <SiAmericanexpress className="text-white text-[40px]" />
                    <SiPaypal className="text-white text-[40px]" />
                    <SiApplepay className="text-white text-[40px]" />
                </div>
            </div>
        </div>
    );
}
