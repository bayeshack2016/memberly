import React from "react";
import { List, Switch, message } from "antd";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";

const NotifyPage = (props) => {
  const data = [
    {
      title: "通过邮箱发送订单",
      name: "isSendOrderByEmail",
      isChecked: props.setting.isSendOrderByEmail,
    },
    {
      title: "通过邮箱发送登录提醒",
      name: "isSendLoginByEmail",
      isChecked: props.setting.isSendLoginByEmail,
    },
    {
      title: "通过邮箱发送验证码",
      name: "isSendVerByEmail",
      isChecked: props.setting.isSendVerByEmail,
    },
    {
      title: "通过Telegram发送订单",
      name: "isSendOrderByTele",
      isChecked: props.setting.isSendOrderByTele,
    },
    {
      title: "通过Telegram发送登录提醒",
      name: "isSendLoginByTele",
      isChecked: props.setting.isSendLoginByTele,
    },
    {
      title: "通过Telegram发送验证码",
      name: "isSendVerByTele",
      isChecked: props.setting.isSendVerByTele,
    },
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{ margin: "20px", marginTop: "0px" }}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                // eslint-disable-next-line
                <Switch
                  defaultChecked={item.isChecked}
                  onChange={(checked) => {
                    props.setting[item.name] = checked;
                    $axios
                      .post("/setting/update", props.setting)
                      .then((res) => {
                        message.success("设置成功");
                      })
                      .catch((error) => {
                        message.warning(error.response.data.message);
                        console.log(error, "error");
                      });
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {item.title}
                  </span>
                }
              />
            </List.Item>
          );
        }}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return { setting: state.product.setting };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(NotifyPage);
