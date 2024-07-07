import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Login,
    Home,
    Public,
    Product,
    ProductDetail,
    FAQ,
    Contact,
    Blog,
    RegisterFinal,
    ResetPassword,
    Bill,
    Profile,
    Search
} from "./pages/public";
import path from "./ultils/path";

import { useDispatch } from "react-redux";
import { fetchCategory } from "./redux/asyncActions";
import { useEffect } from "react";

import MoveToTop from "./components/commons/move-to-top";
import TopNavigation from "./components/commons/top-navigation";
import { useState } from "react";
import Cart from "pages/member/Cart";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
    }, []);
    const [yScroll, setYScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setYScroll(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div>

                {yScroll < 173 && <TopNavigation class="slide-out-top z-50"/>}  
                <Routes path={path.PUBLIC} element={<Public />}>
                    <Route path={path.BILL} element={<Bill />} /> 
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CONTACT} element={<Contact />} />
                    <Route path={path.PRODUCT} element={<Product />} />
                    <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
                    <Route path={path.REGISTER_FINAL} element={<RegisterFinal />} />
                    <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                    <Route path={path.CART} element={<Cart />} />
                    <Route path={path.PROFILE} element={<Profile />} />
                    <Route path={path.SEARCH} element={<Search />} />
                      
                </Routes>
                {yScroll >= 800 && <MoveToTop/>}                 
        </div>
    );
}

export default App;
