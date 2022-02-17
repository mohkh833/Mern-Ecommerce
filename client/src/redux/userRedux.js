import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLoggedIn: false,
        messageCode: undefined
    },
    reducers: {
        loginStart: (state) =>{
            state.isFetching=true
        },
        loginSuccess: (state,action)=>{
            state.isFetching=false
            state.currentUser = action.payload
            state.isLoggedIn = true
        },
        loginFailure: (state, action)=>{
            state.isFetching = false
            state.error = true
            state.messageCode= action.payload
        },
        logOut: (state)=>{
            state.isLoggedIn=false
            state.currentUser={}
        }
    }
})

export const {loginStart, loginFailure, loginSuccess, logOut} = userSlice.actions
export default userSlice.reducer