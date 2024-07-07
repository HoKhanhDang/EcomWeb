import { useState } from "react";
import { useSelector } from "react-redux";
import { apiUpdateUser } from "../../apis/userApi";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { getCurrent } from "../../redux/user/userActions";
import { apiResetPassword } from "../../apis/userApi";
export default function InfoAccount({ current }) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(current?.firstName);
    const [lastName, setLastName] = useState(current?.lastName);
    const [phone, setPhone] = useState(current?.mobile);
    const [address, setAddress] = useState(current?.address);
    const [isChangeInfo, setIsChangeInfo] = useState(true);

    const handleChangeInfo = async () => {
        setIsChangeInfo(!isChangeInfo);
        if (!isChangeInfo) {

            const rs = await apiUpdateUser({
                firstName,
                lastName,
                mobile: phone,
                address,
            });
            console.log("rs", rs);
            if (rs.data.status === "success") {
                swal("Success", "Update Successfully", "success");
            }
            dispatch(getCurrent());
        }
    };
    const handleResetPassword = async () => {
        console.log('current', current?.email);

        const rs = await apiResetPassword({email:current?.email});
        console.log('rs', rs);
        swal("Almost there!", "Please check your email to verify!", "success");
    };

    return (
        <div className="w-full h-auto flex justify-center items-center flex-col p-5 gap-5 font-main">
            <div className="w-full h-[50px] flex justify-start items-center">
                <span className="text-[25px] font-bold">My details</span>
            </div>
            <div className="w-full h-auto md:h-[50px] flex flex-col md:flex-row justify-normal items-center gap-5 text-[12px] md:text-[18px]">
                <div className="w-full md:w-1/2 h-auto flex justify-start items-start">
                    <div className="w-[30%] h-auto flex justify-start items-start">
                        <span className="text-[18px] font-medium w-full">
                            First Name:
                        </span>
                    </div>
                    <div className="w-[70%] h-auto flex justify-start items-start">
                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            disabled={isChangeInfo}
                            className="w-full text-[18px] font-normal border rounded"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2  h-auto flex justify-start items-start">
                    <div className="w-[30%] h-auto flex justify-start items-start">
                        <span className="text-[18px] font-medium w-full">
                            Last Name:
                        </span>
                    </div>
                    <div className="w-[70%] h-auto flex justify-start items-start">
                        <input
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            disabled={isChangeInfo}
                            className="w-full text-[18px] font-normal border rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex justify-start items-start">
                <div className="w-[30%] h-auto flex justify-start items-start">
                    <span className="text-[18px] font-medium w-full">
                        Phone Number:
                    </span>
                </div>
                <div className="w-[70%] h-auto flex justify-start items-start">
                    <input
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        disabled={isChangeInfo}
                        className="w-full text-[18px] font-normal border rounded"
                    />
                </div>
            </div>
            <div className="w-full h-auto flex justify-start items-start">
                <div className="w-[30%] h-auto flex justify-start items-start">
                    <span className="text-[18px] font-medium w-full">
                        Address:
                    </span>
                </div>
                <div className="w-[70%] h-auto flex justify-start items-start">
                    <input
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        disabled={isChangeInfo}
                        className="w-full text-[18px] font-normal border rounded"
                    />
                </div>
            </div>
            <div
                onClick={handleChangeInfo}
                className=" hover:opacity-80 w-full h-[50px] flex justify-center items-center border bg-main-100 text-white rounded"
            >
                {isChangeInfo ? "Change the information" : "Save"}
            </div>
            <div className="w-full h-[50px] flex justify-start items-center">
                <span className="text-[25px] font-bold">My account</span>
            </div>
            <div className="w-full h-auto inline-block justify-start items-center">
                <div className="w-[30%] h-auto flex justify-start items-start">
                    <span className="text-[18px] font-medium">Email:</span>
                </div>
                <div className="w-[50%] h-auto flex justify-start items-start">
                    <span className="text-[18px] font-light">
                        {current.email}
                    </span>
                </div>
                <div
                    onClick={handleResetPassword}
                    className="rounded h-[50px] w-[100%] hover:opacity-80 bg-main-100 text-white flex md:flex justify-center items-center"
                >
                    Reset Password
                </div>
            </div>
        </div>
    );
}
