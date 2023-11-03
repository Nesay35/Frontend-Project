import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isUserLogin: false,
    menu: []
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.isUserLogin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
            state.menu = [];
        },
        setMenu: (state, action) =>{
            state.menu = action.payload
        }
    }
})
export const { login, logout, setMenu } = authSlice.actions;
export default authSlice.reducer;