import React, { useState } from "react";
import { Card, List, message } from "antd";
import "./index.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import { isMobile } from "react-device-detect";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
const ThemePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [themeIndex, setThemeIndex] = useState(-1);
  const handleApply = (theme, index) => {
    setLoading(true);
    setThemeIndex(index);
    $axios
      .post(`/setting/update`, {
        ...props.setting,
        themeOption: theme,
      })
      .then(() => {
        setLoading(false);
        setThemeIndex(-1);
        message.success("应用成功，快去商品页查看效果吧");
      })
      .catch(() => {
        setLoading(false);
        setThemeIndex(-1);

        message.error("应用失败，请稍后重试");
      });
  };
  const cardList = (
    <List
      rowKey="id"
      // loading={loading}
      grid={{
        gutter: 24,
        xl: 3,
        lg: 3,
        md: 2,
        sm: 2,
        xs: 1,
      }}
      dataSource={[
        {
          id: "default",
          title: "默认主题",
          cover: "/assets/theme/default_demo.svg",
          href: "",
        },
        {
          id: "tech",
          title: "科技主题",
          cover: "/assets/theme/tech_demo.svg",
          href: "",
        },
        {
          id: "nostalgic",
          title: "复古主题",
          cover: "/assets/theme/nostalgic_demo.svg",
          href: "",
        },
        {
          id: "blur",
          title: "毛玻璃主题",
          cover: "/assets/theme/blur_demo.svg",
          href: "",
        },
        {
          id: "black_yellow",
          title: "黄黑主题",
          cover: "/assets/theme/black_yellow_demo.svg",
          href: "",
        },
        {
          id: "blue_white",
          title: "蓝白主题",
          cover: "/assets/theme/blue_white_demo.svg",
          href: "",
        },
        {
          id: "blue_gray",
          title: "灰蓝主题",
          cover: "/assets/theme/blue_gray_demo.svg",
          href: "",
        },
        {
          id: "purple_yellow",
          title: "黄紫主题",
          cover: "/assets/theme/purple_yellow_demo.svg",
          href: "",
        },
        {
          id: "black_blue",
          title: "黑蓝主题",
          cover: "/assets/theme/black_blue_demo.svg",
          href: "",
        },
        {
          id: "dark_blue",
          title: "暗蓝主题",
          cover: "/assets/theme/dark_blue_demo.svg",
          href: "",
        },
      ]}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            className={"theme-card"}
            hoverable
            cover={
              <img
                alt={item.title}
                src={item.cover}
                className="theme-card-cover"
              />
            }
            actions={[
              <div
                key="apply"
                onClick={() => {
                  handleApply(item.id, index);
                }}
              >
                {loading && index === themeIndex ? (
                  <LoadingOutlined />
                ) : (
                  <CheckOutlined />
                )}
                &nbsp; 应用主题
              </div>,
            ]}
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="product-page-container">
      <div
        className={"cardList"}
        style={isMobile ? { margin: "5px" } : { margin: "20px" }}
      >
        {cardList}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    setting: state.product.setting,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(withRouter(ThemePage));
