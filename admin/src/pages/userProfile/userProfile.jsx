import React from "react";
import "./userProfile.css";
import { useState} from "react";
import { userRequest } from "../../requestMethods";
import {  useSelector } from "react-redux";
import ReactLoading from "react-loading";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputs, setInputs] = useState({});


  const user = useSelector((state) => state.user.currentUser);

  const handleClick = async (e) => {
    let data;
    if (password === confirmPassword) {
      data = { ...inputs, password };
    } else {
      data = { ...inputs };
    }

    try {
      await userRequest.put(
        "http://localhost:5000/api/users/" + user._id,
        data
      );
      setLoading(true)
    } catch (err) {
      console.log(err);
    }
  };




  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  

  if (!loading) {
    return (
      <div className="newProduct">
        <h1 className="addProductTitle">Update Profile</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>userName</label>
            <input
              name="username"
              type="text"
              placeholder={user.username}
              onChange={handleUpdate}
            />
          </div>
          <div className="addProductItem">
            <label>Email</label>
            <input
              name="email"
              type="text"
              placeholder={user.email}
              onChange={handleUpdate}
            />
          </div>
          <div className="addProductItem">
            <label>password</label>
            <input name="password" type="password" onChange={handlePassword} />
          </div>
          <div className="addProductItem">
            <label>confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleConfirmPassword}
            />
          </div>
          <button className="addProductButton" onClick={handleClick}>
            update
          </button>

        </form>
      </div>
    );
  } else {
    return (
      <ReactLoading
        className="loadingScreen"
        type={"bars"}
        color={"#9A9AD6"}
        height={100}
        width={100}
      />
    );
  }
}
