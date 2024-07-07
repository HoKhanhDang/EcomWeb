import axios from "../axios";

export const apiGetCategory = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/category/get`,           
        } 
    );
}

