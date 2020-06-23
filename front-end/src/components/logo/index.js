import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import "./index.css";
import $axios from "../../axios/$axios";
import { devHost, prodHost } from "../../config";
const baseURL =
  process.env.NODE_ENV === "development"
    ? `${devHost}/uploads/`
    : `${prodHost}/uploads/`;
const Logo = (props) => {
  const [url, setUrl] = useState(props.url ? baseURL + props.url : null);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", props.productId);
    $axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        message.success("更换Logo成功");
        setLoading(false);
        setUrl(window.webkitURL.createObjectURL(file));
      })
      .catch((err) => {
        console.log(err);
        message.error("更换Logo失败");
        setLoading(false);
      });
  };
  return (
    <div className="logo-container">
      <input
        type="file"
        name="logo"
        id="logo"
        onChange={(event) => {
          handleChange(event);
        }}
        className="logo-upload"
        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
      />
      {url ? (
        <img src={url} alt="" className="logo-img" />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="logo-text">上传</div>
        </div>
      )}
    </div>
  );
};

export default Logo;
