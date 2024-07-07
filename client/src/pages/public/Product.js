import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";
import ShowProducts from "components/product/show-products";


const Product = () => {
    return (
        <div class="w-full flex justify-center flex-col font-main">    
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header/>
                <Navbar/>
                <ShowProducts/>
                
            </div>
            <Footer/>

      
        </div>
    );
}

export default Product;