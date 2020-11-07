import React, { useState } from "react";
import { Card, List, message } from "antd";
import "./index.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import $axios from "@/axios/$axios";
import PageHeader from "../../components/pageHeader";
import { isMobile } from "react-device-detect";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
const ThemePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [themeIndex, setThemeIndex] = useState(-1);
  const handleApply = (theme, index) => {
    setLoading(true);
    setThemeIndex(index);
    $axios
      .post(`/setting/${props.setting._id}`, {
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
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      dataSource={[
        {
          id: "default",
          title: "默认主题",
          cover: "/assets/default.svg",
          href: "",
          subDescription: "没有你，良辰美景更与何人说！",
        },
        {
          id: "tech",
          title: "科技主题",
          cover: "/assets/tech.svg",
          href: "",
          subDescription: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
        },
        {
          id: "nostalgic",
          title: "复古主题",
          cover: "/assets/nostalgic.svg",
          href: "",
          subDescription: "人生就像一盒巧克力，你永远不知道下一颗是什么味道。",
        },
        {
          id: "blur",
          title: "毛玻璃主题",
          cover: "/assets/blur.svg",
          href: "",
          subDescription: "我把你的衬衫放进我的衬衫里，以为这样就可以保护你了",
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
          >
            <Card.Meta title={item.title} description={item.subDescription} />
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div className="product-page-container" style={{ position: "relative" }}>
      <PageHeader title="主题设置" desc="在这里选择商品页的主题" />
      <div
        className={"coverCardList"}
        style={isMobile ? { margin: "5px" } : { margin: "20px" }}
      >
        <div
          className={"cardList"}
          style={isMobile ? { margin: "5px" } : { margin: "20px 0px" }}
        >
          {cardList}
        </div>
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
