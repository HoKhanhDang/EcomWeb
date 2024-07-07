import axios from "../axios";

export const apiGetProductById = async (params) => {

    return await axios(
        {
            method: 'GET',
            url: `/product/getProductByID/${params}`,        
            withCredentials: true
        } 
    );
}

export const apiGetProduct = async (params) => {
    return await axios(
        {
            method: 'GET',
            url: `/product/getProducts`,  
            params: params         
        } 
    );
}

export const apiGetAllProduct = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/product/getAll`,          
        } 
    );
}

export const apiRatingProduct = async (data) =>{
    return await axios(
        {
            method: 'PUT',
            url: `/product/ratingProduct`,  
            data: data         
        } 
    );
}

export const apiDeleteProduct = async (data) =>{
    return await axios(
        {
            method: 'DELETE',
            url: `/product/deleteProduct/${data}`,         
        } 
    );
}

