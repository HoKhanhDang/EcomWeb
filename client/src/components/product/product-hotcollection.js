import {useEffect, useState} from 'react';
import apis from '../../apis';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

export const CategoryCard = ({categories}) => {
    const [isSelect, setIsSelect] = useState(false);
    const [isIndex, setIndex] = useState(0);

    return (
        <div className="flex-auto w-full h-full">
            <div className='flex flex-row justify-center items-center border w-full'>
                <div className="w-[40%] h-full p-5">
                    <img src={categories.image} alt="" />
                </div>
                <div className="w-[60%] h-full flex flex-col justify-start items-start p-5">

                    <p className="text-[15px] text-main-text w-full flex font-semibold pb-[10px]">{categories.title}</p>    

                    <div className='flex flex-col'>
                        {
                            categories.brand.map((item, index) => {
                                return (
                                    <div key={index} className="w-full h-full flex flex-row justify-start items-center "
                                        onMouseEnter={(e)=>{
                                            e.stopPropagation();
                                            setIsSelect(true)    
                                            setIndex(index)               
                                          }}
                                        onMouseLeave={(e)=>{
                                            e.stopPropagation();
                                            setIsSelect(false) 
                                            setIndex(10000)                                    
                                          }}
                                    >
                                        <MdOutlineKeyboardArrowRight className={ isSelect && index === isIndex ? 'text-main-100':'text-gray-400' }/>
                                        <Link to={`/${categories.title.toLowerCase()}?brand=${item.name}`} className={ isSelect && index === isIndex ? 'text-main-100':'text-gray-400' }>{item.name}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>                       
                    

                </div>
            </div>          
        </div>
    ) 
}

export default function ProductHotCollection() {
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
        const getData = await apis.apis.apiGetCategory();
        setCategories(getData.data.res);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full h-auto pt-[35px]">
            <div className="w-full  flex flex-row justify-start items-center border-b-[1px] ">
                <p className="text-[20px] mb-[10px] font-bold text-main-text">HOT COLLECTIONS</p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto pt-[25px]  gap-[10px]">
                {
                    categories.map((item, index) => {
                        return (
                            <CategoryCard key={index} categories={item} />
                        )
                    })
                }

            </div>
        </div>
        

    )

}