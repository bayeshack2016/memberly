import React from "react";
import { Button, Result } from "antd";
import { withRouter } from "react-router-dom";

const Error500 = (props) => {
  const goback = () => {
    props.history.push("/productList");
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器错误"
      extra={
        <Button type="primary" onClick={goback}>
          返回首页
        </Button>
      }
    />
  );
};

export default withRouter(Error500);
