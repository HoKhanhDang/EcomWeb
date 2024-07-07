import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";
import ShowProductsSearch from "components/product/show-products-search";
import { useEffect } from "react";


const Search = () => {
    useEffect(() => {
        document.getElementById('searchInput').focus();
    }, []);
    return (
        <div class="w-full flex justify-center flex-col font-main">    
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header/>
                <Navbar/>
                <ShowProductsSearch/>
                
            </div>
            <Footer/>

      
        </div>
    );
}

export default Search;