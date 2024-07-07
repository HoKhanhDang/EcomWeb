import axios from "../axios";

export const apiCreateOrders = async (data) => {
    return await axios(
        {
            method: 'POST',
            url: `/order/create`,
            data: data,  
            withCredentials: true
        } 
    );
}

export const apiGetOrders = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/order/get`,
            withCredentials: true
        } 
    );
}