import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router-dom";

const Error404 = (props) => {
  const goback = () => {
    props.history.push("/productList");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Button type="primary" onClick={goback}>
          返回首页
        </Button>
      }
    />
  );
};

export default withRouter(Error404);
