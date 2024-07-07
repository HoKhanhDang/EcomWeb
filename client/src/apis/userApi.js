import axios from "../axios";

export const apiRegister = async (data) => {

    return await axios(
        {
            method: 'POST',
            url: `/user/register`,   
            data: data,        
            withCredentials: true
        } 
    );
}

export const apiLogin = async (data) => {
    return await axios(
        {
            method: 'POST',
            url: `/user/login`,  
            data: data ,
        } 
    );
}

export const apiResetPassword = async (data) => {
    return await axios(
        {
            method: 'POST',
            url: `/user/resetPassword`,  
            data,
            withCredentials: true
        } 
    );
}

export const apiVerifyResetPassword = async (data) => {
    return await axios(
        {
            method: 'POST',
            url: `/user/verifyResetPassword`,  
            data:data,
            withCredentials: 'include'
        } 
    );
}

export const apiGetCurrent = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/user/getUser`,  
            withCredentials: true
        } 
    );
}

export const apiAddToCart = async (body) => {
    return await axios(
        {
            method: 'PUT',
            url: `/user/updateCart`,  
            data: body
        } 
    );
}

export const apiDeleteCart = async (pid) => {
    return await axios(
        {
            method: 'PUT',
            url: `/user/deleteCart/${pid}`,  
        } 
    );
}

export const apiUpdateQuantity = async (body) => {
    return await axios(
        {
            method: 'PUT',
            url: `/user/updateQuantity`,  
            data: body
        } 
    );
}

export const apiUpdateUser = async (data) => {
    return await axios(
        {
            method: 'PUT',
            url: `/user/updateUser`,  
            data: data,
            withCredentials: true
        } 
    );
}


