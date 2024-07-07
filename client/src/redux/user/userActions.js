import { createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis/";


const getCurrent = createAsyncThunk(
    'user/current',
    async (data, {rejectWithValue}) => {
        const response = await apis.userApi.apiGetCurrent()
        return response.data.data;
    }
)


export {
    getCurrent
};