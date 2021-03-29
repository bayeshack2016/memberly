import React from "react";
import { List, Modal, message } from "antd";
import { handleVerifyDialog } from "../../redux/actions/form";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";

const DevelopPage = (props) => {
  const data = [
    {
      title: "Memberly Token",
      subtitle: "Token 生成成功，请妥善保管",
      description: "您的 Memberly 开发者凭证",
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      style={{ margin: "20px", marginTop: "0px" }}
      renderItem={(item) => (
        // eslint-disable-next-line
        <List.Item
          actions={[
            // eslint-disable-next-line
            <a
              key="list-loadmore-edit"
              onClick={async () => {
                try {
                  const { data } = await $axios.post("/user/createToken", {
                    uid: props.user._id,
                  });
                  Modal.success({
                    title: item.subtitle,
                    content: <p style={{ userSelect: "text" }}>{data}</p>,
                  });
                } catch (error) {
                  message.error("创建 token 失败");
                }
              }}
            >
              生成
            </a>,
          ]}
        >
          <List.Item.Meta
            title={
              // eslint-disable-next-line
              <a style={{ fontSize: "16px", fontWeight: "bold" }}>
                {item.title}
              </a>
            }
            description={<p>{item.description}</p>}
          />
        </List.Item>
      )}
    />
  );
};
const mapStateToProps = (state) => {
  return { user: state.form.user };
};
const actionCreator = {
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(DevelopPage);
