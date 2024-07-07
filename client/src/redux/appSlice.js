import {createSlice} from '@reduxjs/toolkit';
import {fetchCategory} from './asyncActions';   

export const appSlice = createSlice({
    name: 'app',
    initialState:{
        category: [],
        product:[],
        isLoading: false,
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload;
        });
        
    }

});

export const {setCategory} = appSlice.actions;
export default appSlice.reducer;    