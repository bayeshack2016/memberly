import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import "./index.css";
import $axios from "../../axios/$axios";

const Logo = (props) => {
  const [url, setUrl] = useState(props.url ? props.url : null);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", props.productId);
    formData.append("uid", props.uid);
    $axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        message.success("更换Logo成功");
        setLoading(false);
        setUrl(window.webkitURL.createObjectURL(file));
      })
      .catch((error) => {
        message.error(error.response.data.message);
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
