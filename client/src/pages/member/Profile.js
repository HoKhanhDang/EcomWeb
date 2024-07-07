import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";
import { useEffect, useState } from "react";
import InfoAccount from "components/profile/info";
import OrderedAccount from "components/profile/odered";
import { useSelector } from "react-redux";
import { apiGetOrders } from "apis/orderApi";

const header = [
    {
        id: 0,
        name: "Profile",
    },
    {
        id: 1,
        name: "Order History",
    },
];

const Profile = () => {
    const {isLogin, current} = useSelector((state) => state.user);
    const [isActive, setIsActive] = useState(0);
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        const rs = await apiGetOrders();
        console.log(rs);
        setOrders(rs?.data?.data);
    
    }
    useEffect(() => {
        fetchData();
    },[])

    return (
        <div class="w-full flex justify-center flex-col font-main">
            <div className="w-full flex justify-center items-center px-[10%] flex-col mt-[35px]">
                <Header />
                <Navbar />

                <div className="w-full md:w-[80%] flex justify-center flex-col mt-[35px] border p-5 rounded-[25px]">
                    <span className=" text-[35px] font-bold self-center">My Account</span>

                    <div className="w-full flex flex-col justify-between mt-5">
                        <div className="w-full h-[50px] flex flex-row justify-start items-start">
                            {header.map((item, index) => (
                                <div
                                    onClick={() => setIsActive(index)}
                                    className={
                                        isActive === index
                                            ? "w-auto h-full p-3 border rounded bg-main-100 text-white"
                                            : "w-auto h-full p-3 border rounded"
                                    }
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>

                        <div className="w-full h-auto border flex justify-center items-center mt-5">
                            {isActive === 0 ? (
                                <InfoAccount current={current}/>
                            ) : (
                                <OrderedAccount ordered={orders}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
