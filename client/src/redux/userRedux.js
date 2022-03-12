import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        username: null,
        email: null,
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
            state.username = action.payload.username
            state.email = action.payload.email
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
        },
        editProfileStart: (state) =>{
            state.isFetching = true
        },
        editProfileSucess: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
        },
        editProfileFailure: (state) => {
            state.error = true
        }
    }
})

export const {loginStart, loginFailure, loginSuccess, logOut, editProfileStart, editProfileSucess, editProfileFailure} = userSlice.actions
export default userSlice.reducer