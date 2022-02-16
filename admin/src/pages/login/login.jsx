import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { login } from "../../redux/apiCalls"
import "./login.css";


export const Login = () => {
    const [username, setUsername] =  useState("")
    const [password, setPassword] =  useState("")
    const [flag, setflag] = useState(false)
    const dispatch = useDispatch()
    let error = useSelector((state) => state.user.message)
    
    const handleClick = (e) => {

        login(dispatch, {username, password})
        setflag(true)
    }
    return (

        
        <div>

            <div style={{height:"100vh",display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column"}}>
            <div style={{width:"800px", height: "400px", backgroundColor: "#f0f0ff", border: "2px solid darkblue", borderRadius: "25px"}}>
            <div style={{padding: "100px"}}>
            <span style={{fontWeight:"bold", marginBottom: "50px", fontSize: "30px", marginLeft: "220px",color: "darkblue"}}>Admin Login</span>
            <input style={{padding: 10, marginBottom: 20, width:"100%", borderColor:"darkblue", borderWidth: "1px", borderRadius: "10px"}} type="text" placeholder="username" onChange={e=> setUsername(e.target.value)} />
            <input style={{padding: 10, marginBottom: 20, width:"100%", borderColor:"darkblue",  borderWidth: "1px", borderRadius: "10px"}} type="password" placeholder="password" onChange={e=> setPassword(e.target.value)}/>
            <button onClick={handleClick} style={{padding: 10, width: 100, marginLeft: "250px", color: "darkblue" , fontWeight:"bold" ,borderRadius: "10px", borderColor:"darkblue"}}>Login</button>
            <br></br>
            {error.length > 0 && flag &&
                <span style={{color: "red", marginTop: "20px", fontSize: "15px", marginLeft: "225px",fontWeight:"bold",}}>{error}</span>
            }
            </div>
            </div>
            </div>
            </div>

    )
}
