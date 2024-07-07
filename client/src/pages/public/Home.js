import Header from "../../components/commons/header";
import Navbar from "../../components/commons/navbar";
import Product from "../../components/product/product";
import Sidebar from "../../components/commons/sidebar";
import ProductFeature from "../../components/product/product-feature";
import ProductHotCollection from "../../components/product/product-hotcollection";
import Footer from "../../components/commons/footer";
import { toast, ToastContainer } from 'react-toastify';

const Main = () => {
    return (
        <div class="w-full flex justify-center flex-col font-main">    
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header/>
                <Navbar/>
                <Sidebar/>
                <Product/>
                <ProductFeature/>
                <ProductHotCollection/>
            </div>
            <Footer/>   
            <ToastContainer />
        </div>
    );
}

export default Main;