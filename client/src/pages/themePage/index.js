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
          cover: "/assets/theme/default_demo.svg",
          href: "",
          subDescription: "没有你，良辰美景更与何人说！",
        },
        {
          id: "tech",
          title: "科技主题",
          cover: "/assets/theme/tech_demo.svg",
          href: "",
          subDescription: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
        },
        {
          id: "nostalgic",
          title: "复古主题",
          cover: "/assets/theme/nostalgic_demo.svg",
          href: "",
          subDescription: "人生就像一盒巧克力，你永远不知道下一颗是什么味道。",
        },
        {
          id: "blur",
          title: "毛玻璃主题",
          cover: "/assets/theme/blur_demo.svg",
          href: "",
          subDescription: "我把你的衬衫放进我的衬衫里，以为这样就可以保护你了",
        },
        {
          id: "black_yellow",
          title: "黄黑主题",
          cover: "/assets/theme/black_yellow_demo.svg",
          href: "",
          subDescription:
            "当我站在瀑布前，觉得非常的难过，我总觉得，应该是两个人站在这里",
        },
        {
          id: "blue_white",
          title: "蓝白主题",
          cover: "/assets/theme/blue_white_demo.svg",
          href: "",
          subDescription:
            "一直以为我跟他不一样，原来寂寞的时候，所有的人都一样",
        },
        {
          id: "blue_gray",
          title: "灰蓝主题",
          cover: "/assets/theme/blue_gray_demo.svg",
          href: "",
          subDescription: "人生和电影不一样，人生辛苦多了",
        },
        {
          id: "purple_yellow",
          title: "黄紫主题",
          cover: "/assets/theme/purple_yellow_demo.svg",
          href: "",
          subDescription: "人生本就是苦还是只有童年苦？生命就是如此",
        },
        {
          id: "black_blue",
          title: "黑蓝主题",
          cover: "/assets/theme/black_blue_demo.svg",
          href: "",
          subDescription: "一个时代结束了，属于那个时代的一切都不复存在",
        },
        {
          id: "dark_blue",
          title: "暗蓝主题",
          cover: "/assets/theme/dark_blue_demo.svg",
          href: "",
          subDescription: "我一个人只能全力以赴，等待命运去揭晓答案",
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
