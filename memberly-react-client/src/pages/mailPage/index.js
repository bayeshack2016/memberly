import React from "react";
import { Tabs } from "antd";
import "./index.css";
import { connect } from "react-redux";
import Mail from "../../components/mail";
const { TabPane } = Tabs;
const MailPage = (props) => {
  return (
    <div className="shadow-radius">
      <div style={{ width: "100%" }}>
        <Tabs defaultActiveKey="1" centered={true} onChange={() => {}}>
          <TabPane tab="QQ 邮箱" key="1">
            <Mail
              mailName="qq"
              mailTitle="QQ"
              iconName="icon-QQyouxiango"
              mailLink="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
              email={props.email.filter((item) => item.mailName === "qq")[0]}
            />
          </TabPane>
          <TabPane tab="163 邮箱" key="2">
            <Mail
              mailName="163"
              mailTitle="163"
              iconName="icon-wangyi"
              mailLink="http://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac2cda80145a1742516"
              email={props.email.filter((item) => item.mailName === "163")[0]}
            />
          </TabPane>
          <TabPane tab="Gmail" key="3">
            <Mail
              mailName="gmail"
              mailTitle="gmail"
              iconName="icon-gmail"
              mailLink="https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/"
              email={props.email.filter((item) => item.mailName === "gmail")[0]}
            />
          </TabPane>
          <TabPane tab="SMTP" key="4">
            <Mail
              mailName="smtp"
              mailTitle="smtp"
              iconName="icon-Mail"
              mailLink="https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/"
              email={props.email.filter((item) => item.mailName === "smtp")[0]}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.form.email,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(MailPage);
