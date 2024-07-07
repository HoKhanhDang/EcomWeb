import { useEffect, useState } from 'react'
import apis from '../../apis'
import { RenderStar } from 'ultils/helper'
import { Link } from 'react-router-dom'
import { ConvertPrice } from 'ultils/helper'

export const ProductCard = ({product}) => {
    return (
        <Link to={`${product.category}/${product._id}/${product.title}`} className="flex-auto w-full h-full hover:shadow-2xl">
            <div className='flex flex-row justify-center items-center border w-full'>
                <div className="w-[40%] h-full p-5">
                    <img src={product.image[0].image} alt="" />
                </div>
                <div className="w-[60%] h-full flex flex-col justify-start items-start p-5">
                    <p className="text-[15px] text-main-text w-full flex font-semibold">{product.title}</p>
                    <div className='flex flex-row my-[5px]'>
                        <RenderStar totalRating={product.totalRating} isBig={false} />
                    </div>               
                    <p className="text-[15px] text-main-text  w-full flex ">{ConvertPrice(product.price)} ₫</p>
                </div>
            </div>          
        </Link>
    ) 
}

export default function ProductFeature() {
    const [products, setProducts] = useState([]);
    const fetchData = async () => {
        const getData = await apis.productApi.apiGetProduct({limit:9, page:1,sort: "-totalRating"});
        setProducts(getData.data.res);
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="flex flex-col w-full h-auto pt-[35px]">
            <div className="w-full  flex flex-row justify-start items-center border-b-[1px]">
                <p className="text-[20px] font-bold text-main-text mb-[10px]">FEATURED PRODUCTS</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[10px] mt-[10px]">
              
                {
                    products.map((item, index) => {
                        return (
                  
                                <ProductCard key={index} product={item} id={index} />

                        )
                    })
                }
               
                
            </div>
            <div className="w-full flex flex-wrap gap-[10px] mt-[10px]">
              
                <div className='w-[50%]' >
                    <img className='h-full w-full shadow-drop-2-lr' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" alt="" />
                </div>
                <div style={{ width: 'calc(25% - 20px)' }} className="flex flex-col justify-evenly gap-[10px]">
                    <div className='h-full w-full ' >
                        <img className='h-full w-full ' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="" />
                    </div>
                    <div className='h-full w-full '>
                        <img className='h-full w-full' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" alt="" />
                    </div>
                </div>
                <div className='w-[25%] h-full '>
                    <img className='h-full w-full shadow-drop-2-lr' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" alt="" />
                </div>
                
            </div>
    

        </div>
    )
}