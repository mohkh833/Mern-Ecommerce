import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";

import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleUpdate = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { ...inputs, img: downloadURL, categories: cat };
            updateProduct(productId, product, dispatch);
          });
        }
      );
    }
    const product = { ...inputs, categories: cat };
    updateProduct(productId, product, dispatch);
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  if (product) {
    return (
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product.img} alt="" className="productInfoImg" />
              <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">sales:</span>
                <span className="productInfoValue">5123</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">in stock:</span>
                <span className="productInfoValue">{product.inStock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input
                type="text"
                name="title"
                placeholder={product.title}
                onChange={handleUpdate}
              />
              <label>Product Description</label>
              <input
                type="text"
                name="desc"
                placeholder={product.desc}
                onChange={handleUpdate}
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder={product.price}
                onChange={handleUpdate}
              />

              <div className="addProductItem">
                <label>Categories</label>
                <input
                  type="text"
                  placeholder="jeans,skirts"
                  onChange={handleCat}
                />
              </div>
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleUpdate}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={product.img} alt="" className="productUploadImg" />
                <label for="file">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="productButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else
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
