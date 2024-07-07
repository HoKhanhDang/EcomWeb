//components
import Header from "components/commons/header";
import Navbar from "components/commons/navbar";
import Footer from "components/commons/footer";
import DetailMain from "components/product/detail-main";
import ProductInformation from "components/product/product-information";
import ProductRelate from "components/product/product-relate";
import Review from "components/product/review-rating";
import Breadcrumb from "components/elements/breadcrumb";

//apis
import { apiGetProduct } from "apis/productApi";
import { useEffect } from "react";
import { useState } from "react";
import { apiGetProductById } from "../../apis/productApi";
import { useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const {pid} = useParams()
    const fetchData =  async() =>{
        const rs = await apiGetProductById(pid)
        setProduct(rs?.data?.res)

    }
    const fetchRelatedProduct = async () => {
        const getData = await apiGetProduct({ brand: product?.brand});
        setRelatedProduct(getData?.data?.res);  
    }
    useEffect(() => {
        fetchRelatedProduct();
    },[product])
    useEffect(() => {
        fetchData();
    },[pid])
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div class="w-full flex justify-center flex-col font-main">    
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header/>
                <Navbar/>
                
                {product !=null && 
                    <>                        
                        <Breadcrumb category={product.category} title={product.title}/>
                        <DetailMain product={product}/>
                    </>
                }

                <ProductInformation product={product}/>

                <div className="w-full  flex flex-row justify-start items-center border-b-[1px] border-b-main-100 mt-[50px]">
                        <p className="text-[30px] mb-[10px] font-bold text-main-text">Reviews</p>
                </div>

                {
                    product != null && <Review product={product}/>
                }

                {product !=null && relatedProduct != null && relatedProduct.length >=3 && 
                <>
                    <div className="w-full  flex flex-row justify-start items-center border-b-[1px] border-b-main-100 mt-[50px]">
                        <p className="text-[20px] mb-[10px] font-bold text-main-text">OTHER CUSTOMERS ALSO BUY:</p>
                    </div>
                     <ProductRelate products={relatedProduct}/>
                </>
                }
            </div>
            <Footer/>
            <ToastContainer/>
  
        </div>
    );
}

export default ProductDetail;