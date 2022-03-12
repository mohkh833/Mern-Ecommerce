import { loginFailure, loginStart, loginSuccess, editProfileStart, editProfileSucess, editProfileFailure } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethod"



export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure(err.response.status))
    }
}

export const editProfile = async(dispatch,userParams,user) => {
    try{
        console.log(userParams)
        const res = await userRequest.put(`/users/${userParams}`,user )
        console.log(res.data)
        dispatch(editProfileSucess(res.data))
    } catch(err){
        dispatch(editProfileFailure())
    }
}

