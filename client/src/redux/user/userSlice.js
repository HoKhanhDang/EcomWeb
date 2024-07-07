import {createSlice} from '@reduxjs/toolkit';
import {getCurrent} from './userActions';   

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isLogin: false,
        current:[],
        token: '',
    },
    reducers: {
        registerAction: (state, action) => {
            state.current = action.payload.data;
            state.isLogin = action.payload.isLogin;
            state.token = action.payload.token;
        },
        login: (state, action) => {
            console.log('action', action);
            state.current = action.payload.data;
            state.isLogin = action.payload.isLogin;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isLogin = false;
            state.current = [];
            state.token = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrent.pending, (state, action) => {      
        });
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.current = action.payload;
        });
        builder.addCase(getCurrent.rejected, (state, action) => {
            state.current = action.null;
            state.isLogin = false;
            state.token = '';
        });
   
        
    }
   
});

export const {registerAction,login ,logout} = userSlice.actions;
export default userSlice.reducer;    