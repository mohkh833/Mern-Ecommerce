import React, {useState, useEffect} from 'react'
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import {userRequest} from "../requestMethod"
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { editProfile } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 100px;
    background-color:#EAF6FF;
    height: 600px;
    padding: 20px;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    padding: 20px;
    flex-direction: column;
    width: 40%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#A6C3D8;
    border-radius: 10px;
`;

const InputName = styled.h3`
    align-self: flex-start;
    margin-left: 160px;
    padding-bottom:10px ;
    padding-top: 10px;
    ${mobile({ marginLeft:" 110px" })}
`

const Input = styled.input`
    width: 50%;
    height:20px;
    padding: 10px;
    border: none;
    border-radius: 10px;
`

const VerticalLine = styled.div`
    border-left:5px solid #A6C3D8 ;
    height: 600px;
    border-radius:10px;
`

const Circle = styled.img`
    height: 250px;
    width: 250px;
    margin-bottom:20px;
    background-color: white;
    border: solid white 1px;
    border-radius: 50%;
    display: inline-block;
    background-size: cover;
    min-height: 50%;
`
const Text = styled.p`
    color:white;
`
const Button = styled.button``;

const Error = styled.span`
    color:red;
`;

const Profile = () => {
    const [username, setUsername] = useState("")
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(false)
    const [file, setFile] = useState(null)
    const [data , setData] = useState([])
    const [userId, setUserId] = useState()
    const [loading, isloading] = useState(true)
    const user = useSelector((state) => state.user.currentUser)
    let usernamex = useSelector((state) => state.user.username)
    let emailx = useSelector((state) => state.user.email)
    
    // console.log(user)
    const dispatch = useDispatch()
    
    const handleClick = () => {
        const formData = new FormData();

        if(file !== null)
		formData.append('image', file);

        if(username.length !==0)
        formData.append("username", username)

        if(email.length !==0)
        formData.append("email", email)
        

        setUserId(user._id)
        console.log(userId)
        if(password.length !==0){
            if(confirmPassword === password){
                formData.append("password", password)
                try{
                    editProfile(dispatch, userId, formData)
                    setError(false)
                } catch(err){
                    console.log(err)
                }
            }
            else
                setError(true)    
        } else {
            console.log(user._id)
            editProfile(dispatch, user._id, formData)
            // await userRequest.put("/users/"+ user._id ,  formData )
        } 
        // window.location.reload()
    }

    useEffect(() => {
        
        const getUserData = async() => {
            try{
                console.log(user._id)
                const res = await userRequest.get("/users/find/" + user._id)
                setData(res.data)
                console.log(res)
                isloading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getUserData()
        isloading(false)
    },[user._id])

if(loading === false) {
return (
    
    <>
    <Navbar />
    <Container>
        <Wrapper>
            <InputName>USERNAME</InputName>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
            <InputName >EMAIL</InputName>
            <Input type="email" onChange={(e) => setEmail(e.target.value)}/>
            <InputName>PASSWORD</InputName>
            <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <InputName>CONFIRM PASSWORD</InputName>
            <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            <Input type="file" onChange={(e)=> setFile(e.target.files[0])} />
            <Button onClick={handleClick}>submit</Button>
            {error && <Error>Unmatched Errors</Error>}
        </Wrapper>
        <VerticalLine/>
        <Wrapper>
        <Circle src={'http://localhost:5000/'+ data.img}/>
        <InputName>USERNAME: <Text>{usernamex}</Text></InputName>
        <InputName>EMAIL: <Text>{emailx}</Text></InputName>
        </Wrapper>
    </Container>
    <Footer/>
    
    </>
)
} else {
    return(
        <div>
            loading
        </div>
    )
}
}

export default Profile
