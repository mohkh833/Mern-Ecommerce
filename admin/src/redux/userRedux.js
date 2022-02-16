import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLoggedin: false,
        message: ''
    },
    reducers: {
        loginStart: (state) =>{
            state.isFetching=true
        },
        loginSuccess: (state,action)=>{
            state.isFetching=false
            state.currentUser = action.payload
            state.isLoggedin = true
        },
        loginFailure: (state,action)=>{
            state.isFetching = false
            state.error = true
            state.message = action.payload
        },
        getUserStart: (state) => {
            state.isFetching=true
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        getUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logOut: (state,action) => {
            state.currentUser = {}
            state.isLoggedin = false
        }
    }
})

export const {loginStart, loginFailure, loginSuccess, getUserStart, getUserSuccess,getUserFailure, logOut} = userSlice.actions
export default userSlice.reducer