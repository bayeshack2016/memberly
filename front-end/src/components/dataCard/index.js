import React from "react";
import { Col, Row } from "antd";
import numeral from "numeral";
import "./index.css";
import BasicChart from "../basicChart";
import { chartData } from "@/utils/fetchChartData";
import { isMobile } from "react-device-detect";
const DataCard = (props) => {
  const rankingListData =
    props.currentRange === "year"
      ? props.rankingListData.year
      : props.currentRange === "month"
      ? props.rankingListData.month
      : props.rankingListData.week;
  return (
    <>
      <Row type="flex">
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <div className={"salesBar"}>
            {props.currentRange === "year" ? (
              <BasicChart
                chartData={chartData(
                  props.catergory,
                  props.currentRange,
                  props.dataByYear
                )}
                height={"300px"}
                currentRange={props.currentRange}
              />
            ) : props.currentRange === "month" ? (
              <BasicChart
                chartData={chartData(
                  props.catergory,
                  props.currentRange,
                  props.dataByMonth
                )}
                height={"300px"}
                currentRange={props.currentRange}
              />
            ) : props.currentRange === "week" ? (
              <BasicChart
                chartData={chartData(
                  props.catergory,
                  props.currentRange,
                  props.dataByWeek
                )}
                height={"300px"}
                currentRange={props.currentRange}
              />
            ) : null}
          </div>
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div
            className={"salesRank"}
            style={isMobile ? { display: "none" } : {}}
          >
            <h4 className={"rankingTitle"}>
              {props.catergory === "sales"
                ? "销售额排行"
                : props.catergory === "visits"
                ? "访问量排行"
                : "订单数排行"}
            </h4>
            <ul className={"rankingList"}>
              {rankingListData.map((item, i) => (
                <li key={i}>
                  <span
                    className={`rankingItemNumber ${i < 3 ? "active" : ""}`}
                  >
                    {i + 1}
                  </span>
                  <span className={"rankingItemTitle"} title={item.title}>
                    {item.title}
                  </span>
                  <span className={"rankingItemValue"}>
                    {numeral(item.total).format("0,0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DataCard;
