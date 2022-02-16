import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import ReactLoading from "react-loading";

export default function UserList() {
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
        setusers(res.data);
        setloading(false);
      } catch (err) {}
    };
    getUsers();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];
  if (!loading) {
    return (
      <div className="userList">
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
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
