import React from "react";
import "./index.css";
const Contact = (props) => {
  const renderContact = () => {
    return props.productInfo.contact.map((item, index) => {
      return (
        <div className="contact-info" key={index}>
          {item}
        </div>
      );
    });
  };
  return (
    <div className="contact-container">
      <div className="contact-talk">联系我们</div>
      {renderContact()}
      <img src="/assets/contact-header.png" alt="" className="contact-header" />
      <img src="/assets/contact-footer.png" alt="" className="contact-footer" />
    </div>
  );
};

export default Contact;
