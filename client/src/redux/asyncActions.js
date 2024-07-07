import { createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../apis/";


const fetchCategory = createAsyncThunk(
    'category/get',
    async (data, {rejectWithValue}) => {
        const response = await apis.apis.apiGetCategory()
        return response.data.res;
    }
)


export {
    fetchCategory
};