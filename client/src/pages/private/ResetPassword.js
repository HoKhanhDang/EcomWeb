import {useState, useEffect} from "react";
import InputField from "components/elements/input-field";
import Cookies from 'js-cookie';
import { useParams,useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { apiVerifyResetPassword } from "apis/userApi";

import {useFormik} from 'formik';
import * as Yup from 'yup';

export default function ResetPassword() {
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const { email } = useParams();  

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Password is required").min(2, "Password must be at least 2 characters"),
            confirmPassword: Yup.string().required("Confirm password is required")
        }),
        onSubmit: async (values) => {
            const { password, confirmPassword } = values;
            if(password !== confirmPassword) {
                swal("Please try again!", "Password and confirm password are not the same!", "warning")
                return;
            }
            try {
                const response = await apiVerifyResetPassword({
                    password: password
                });
                console.log("ff");
                if(response.data.status === "success") {
                    swal("Success!", "Password has been reset successfully", "success",{
                        timer: 2000,
                        buttons: false
                    }).then(() => {
                        navigate("/login");
                    })
                } else {
                    swal("Error!", response.data.message, "error",{timer: 2000,buttons: false}).then(() => {
                        navigate("/login");
                    })
                }
            } catch (error) {
                if (error.response.data.message ==="Cannot read properties of undefined (reading 'token')") {
                    swal("Fail!", "Your time has expired", "error",{
                        timer: 2000,
                        buttons: false
                    }).then(() => {
                        navigate("/login");
                    })
                }
            }
            
        }
    });

    return (
        <div className="w-screen h-screen flex items-center justify-center font-main">
            <div className="w-full h-full relative flex justify-center items-center">
                <img
                    src={require("../../assets/bg2.jpg")}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="flex p-[30px] absolute w-[500px] h-auto bg-white rounded-[15px] flex-col justify-start items-center ">
                    <span className="font-main font-extrabold text-[35px] ">
                        Forgot password
                    </span>
                    <div className="w-full flex flex-col justify-start items-center my-2 gap-1">
                        <span className="w-full font-main text-[15px]">
                            Email
                        </span>
                        <InputField
                            className="disabled:opacity-75"
                            type={"email"}
                            value={email}
                        />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col justify-start items-center my-2 gap-1">
        
                            <span className="w-full font-main text-[15px]">
                                Password
                            </span>
                            <InputField
                                name="password"
                                className="disabled:opacity-75"
                                type={"password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder={"Enter the password"}
                            />

                            <span className="w-full font-main text-[15px]">
                                Confirm Password
                            </span>
                            <InputField
                                name="confirmPassword"
                                className="disabled:opacity-75"
                                type={"password"}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                placeholder={"Enter the confirm password"}
                            />

                            <div className="my-2 w-full flex flex-col justify-start items-center">
                                {formik.errors.password && formik.touched.password ? <div className="w-full text-red-500">* {formik.errors.password}</div> : null}
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-red-500 w-full">* {formik.errors.confirmPassword}</div> : null}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-2 rounded-md w-full"
                            >
                                Confirm
                            </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
