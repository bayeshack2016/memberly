import React from "react";
import { Descriptions } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AboutPage = (props) => {
  return (
    <Descriptions title="账户信息" style={{ padding: 20 }}>
      <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
      <Descriptions.Item label="注册日期">{props.user.date}</Descriptions.Item>
      <Descriptions.Item label="项目地址">
        <a
          href="https://github.com/troyeguo/memberly"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Descriptions.Item>
    </Descriptions>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.form.user,
    setting: state.product.setting,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(withRouter(AboutPage));
