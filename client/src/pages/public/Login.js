import InputField from "components/elements/input-field";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import path from "ultils/path";
import { useDispatch } from "react-redux";
import { registerAction , login } from "../../redux/user/userSlice";

import { useFormik } from "formik";
import * as Yup from "yup";

import swal from "sweetalert";

import userApi from "apis";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useParams();
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (register === "reg") {
            setIsRegister(true);
        }
    }, []);
    const registerValidation = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(2, "Password must be at least 2 characters"),
            confirmPassword: Yup.string().required(
                "Confirm password is required"
            ),
            phone: Yup.string()
                .required("Phone number is required")
                .matches(
                    /^\d{10,}$/,
                    "Phone number must be at least 10 digits and contain only numbers"
                ),
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
        }),
        onSubmit: async (values) => {
            if (values.password !== values.confirmPassword) {
                swal(
                    "Please try again!",
                    "Password and confirm password are not the same!",
                    "warning"
                );
                return;
            }
            let data = {
                email: values.email,
                password: values.password,
                mobile: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
            };
            try {
                const rs = await userApi.userApi.apiRegister(data);


                dispatch(
                    registerAction({
                        data: rs.data,
                        isLogin: true,
                        token: rs.data.token,
                    })
                );
                swal(
                    "Register",
                    "Please check your email to verify!",
                    "success"
                ).then((value) => {
                    if (value) {
                        setIsRegister(false);
                    }
                });
                setAllNull();
            } catch (error) {        
                if (error) {
                    swal("Register failed!", "Account already exists", "error");
                }
            }
        },
    });

    const setAllNull = () => {
        setEmail("");
        setPassword("");
        registerValidation.resetForm({
            values: {
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                firstName: "",
                lastName: "",
            },
        });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSetIsRegister = () => {
        setIsRegister(!isRegister);
        setAllNull();
    };
    const handleSetIsForgotPassword = () => {
        setIsForgotPassword(!isForgotPassword);
        setAllNull();
    };
    const handleSubmitForgotPassword = async () => {
        if (email === "") {
            swal("Please fill all the fields", "Please try again!", {
                icon: "warning",
            });
        } else {
            const data = { email };
            const rs = await userApi.userApi.apiResetPassword(data);

            swal(
                "Almost there!",
                "Please check your email to verify!",
                "success"
            ).then((value) => {
                if (value) {
                    setIsForgotPassword(false);
                }
            });
            setAllNull();
        }
    };

    const handleSubmit = async () => {
        if (email === "" || password === "") {
            swal("Please fill all the fields", "Please try again!", {
                icon: "warning",
            });
        } else {
            let data = {
                email,
                password,
            };
            const rs = await userApi.userApi.apiLogin(data);

            const { message, success } = rs;
            

            if (message === "Invalid password") {
                swal("Login failed!", "Invalid password", "error");
                setPassword("");
                return;
            }
            else if (message === "Account do not exist"){
                swal("Login failed!", "Account do not exist", "error");
                setEmail("");
                setPassword("");
                return;
            }
            dispatch(
                login({
                    data: rs.data.data,
                    isLogin: true,
                    token: rs.data.accessToken,
                })
            );
            await swal("Login", "Successfully!", "success", {
                timer: 2000,
                buttons: false,
            });
            navigate(`/${path.HOME}`);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            {isForgotPassword ? (
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
                        <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                            <span className="w-full font-main text-[15px]">
                                Email
                            </span>
                            <InputField
                                type={"email"}
                                value={email}
                                onChange={handleEmailChange}
                                placeholder={"Enter the email"}
                            />
                        </div>
                        <div className="w-full flex flex-row justify-start items-center my-1 gap-2">
                            <button
                                onClick={handleSetIsForgotPassword}
                                className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmitForgotPassword}
                                className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full relative flex justify-center items-center">
                    <img
                        src={require("../../assets/bg1.jpg")}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="flex p-[30px] absolute w-[500px] h-auto bg-white rounded-[15px] flex-col justify-start items-center ">
                        <span className="font-main font-extrabold text-[35px] ">
                            {isRegister ? "Register" : "Login"}
                        </span>

                        {isRegister && (
                            <form onSubmit={registerValidation.handleSubmit}>
                                <div className="flex flex-row justify-between items-center w-full my-1 gap-3">
                                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                        <span className="w-full font-main text-[15px]">
                                            First name
                                        </span>
                                        <InputField
                                            name="firstName"
                                            type={"text"}
                                            value={
                                                registerValidation.values
                                                    .firstName
                                            }
                                            onChange={
                                                registerValidation.handleChange
                                            }
                                            placeholder={"Enter first name"}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                        <span className="w-full font-main text-[15px]">
                                            Last name
                                        </span>
                                        <InputField
                                            name="lastName"
                                            type={"text"}
                                            value={
                                                registerValidation.values
                                                    .lastName
                                            }
                                            onChange={
                                                registerValidation.handleChange
                                            }
                                            placeholder={"Enter last name"}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Phone number
                                    </span>
                                    <InputField
                                        name="phone"
                                        type={"text"}
                                        value={registerValidation.values.phone}
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={"Enter the phone number"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Email
                                    </span>
                                    <InputField
                                        name="email"
                                        type={"email"}
                                        value={registerValidation.values.email}
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={"Enter the email"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Password
                                    </span>
                                    <InputField
                                        name="password"
                                        type={"password"}
                                        value={
                                            registerValidation.values.password
                                        }
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={"Enter the password"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Confirm Password
                                    </span>
                                    <InputField
                                        name="confirmPassword"
                                        type={"password"}
                                        value={
                                            registerValidation.values
                                                .confirmPassword
                                        }
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={
                                            "Enter the confirm password"
                                        }
                                    />
                                </div>

                                <div className="my-2 w-full flex flex-col justify-start items-center text-[13px]">
                                    {registerValidation.errors.firstName &&
                                    registerValidation.touched.firstName ? (
                                        <div className="w-full text-red-500">
                                            *{" "}
                                            {
                                                registerValidation.errors
                                                    .firstName
                                            }
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.lastName &&
                                    registerValidation.touched.lastName ? (
                                        <div className="text-red-500 w-full">
                                            *{" "}
                                            {registerValidation.errors.lastName}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.phone &&
                                    registerValidation.touched.phone ? (
                                        <div className="w-full text-red-500">
                                            * {registerValidation.errors.phone}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.email &&
                                    registerValidation.touched.email ? (
                                        <div className="text-red-500 w-full">
                                            * {registerValidation.errors.email}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.password &&
                                    registerValidation.touched.password ? (
                                        <div className="w-full text-red-500">
                                            *{" "}
                                            {registerValidation.errors.password}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors
                                        .confirmPassword &&
                                    registerValidation.touched
                                        .confirmPassword ? (
                                        <div className="text-red-500 w-full">
                                            *{" "}
                                            {
                                                registerValidation.errors
                                                    .confirmPassword
                                            }
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                                >
                                    Sign in
                                </button>
                                <div className="flex flex-row justify-between items-center w-full my-1">
                                    <span className="text-blue-500">
                                        Already have an account?{" "}
                                        <span
                                            onClick={handleSetIsRegister}
                                            className="text-blue-500 font-bold hover:text-main-text"
                                        >
                                            Login
                                        </span>
                                    </span>
                                </div>
                            </form>
                        )}

                        {!isRegister && (
                            <>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Email
                                    </span>
                                    <InputField
                                        type={"email"}
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder={"Enter the email"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Password
                                    </span>
                                    <InputField
                                        type={"password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder={"Enter the password"}
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-3 rounded-md w-full"
                                >
                                    Sign in
                                </button>

                                <div className="flex flex-row justify-between items-center w-full my-1">
                                    <span
                                        className="text-blue-500"
                                        onClick={() =>
                                            setIsForgotPassword(
                                                !isForgotPassword
                                            )
                                        }
                                    >
                                        Forgot password?
                                    </span>
                                    <span className="text-blue-500">
                                        Don't have an account?{" "}
                                        <span
                                            onClick={handleSetIsRegister}
                                            className="text-blue-500 font-bold hover:text-main-text"
                                        >
                                            Register
                                        </span>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
