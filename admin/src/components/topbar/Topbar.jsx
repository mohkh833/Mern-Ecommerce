import React from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import {useDispatch} from "react-redux"
import {logOutCall} from "../../redux/apiCalls"
import ReactLoading from "react-loading";
export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const [open, isOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const handleClick = () => {
    open && isOpen(false);

    !open && isOpen(true);
  };

  const handleLogOut = () => {
    logOutCall(dispatch)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await userRequest.get("users/find/" + user._id);
        setuserName(res.data.username);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  });

  
  if (!loading) {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">Admin</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <Settings onClick={handleClick} />
            </div>
            {open && (
              <div className="dropdown">
                <ul>
                  <li>
                    <Link  className="showProfileButton" to="/profile">Show Profile</Link>
                  </li>
                  
                  <li onClick={handleLogOut}>LogOut</li>
                </ul>
              </div>
            )}
            
            <span className="topAvatarName"> {userName}</span>
          </div>
        </div>
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
