import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./user.css";
import { userRequest } from "../../requestMethods";
import ReactLoading from "react-loading";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("users/find/" + userId);
        setUserInfo(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, );

  const handleDelete = async () => {
    try {
      await userRequest.delete("users/" + userId);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!loading) {
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">View User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{userInfo.username}</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{userInfo.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{userInfo.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
        </div>
        <Link to="/users">
          <button className="userAddButton" onClick={handleDelete}>
            Delete
          </button>
        </Link>
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
