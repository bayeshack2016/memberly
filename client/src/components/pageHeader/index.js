import React from "react";

const PageHeader = (props) => {
  return (
    <div className="product-page-header">
      <div className={"pageHeaderContent"} style={{ padding: "20px" }}>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#595959",
          }}
        >
          {props.title}
        </div>
        <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
          {props.desc}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
