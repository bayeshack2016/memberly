import React, { useState } from "react";
import { Card, Tabs } from "antd";
import "./index.css";
import { connect } from "react-redux";
import { getRankingList } from "../../utils/rankingListUtil";
import DataCard from "../dataCard";
const { TabPane } = Tabs;
const DashboardChart = (props) => {
  const [currentRange, setCurrentRange] = useState("year");
  const selectDate = (type) => {
    setCurrentRange(type);
  };
  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={"salesCard"}>
        <Tabs
          tabBarExtraContent={
            <div className={"salesExtraWrap"}>
              <div className={"salesExtra"}>
                {/* eslint-disable-next-line */}
                <a
                  className={currentRange === "week" ? "currentDate" : ""}
                  style={{ fontSize: "15px" }}
                  onClick={() => selectDate("week")}
                >
                  本周
                </a>
                {/* eslint-disable-next-line */}
                <a
                  className={currentRange === "month" ? "currentDate" : ""}
                  style={{ fontSize: "15px" }}
                  onClick={() => selectDate("month")}
                >
                  本月
                </a>
                {/* eslint-disable-next-line */}
                <a
                  className={currentRange === "year" ? "currentDate" : ""}
                  style={{ fontSize: "15px" }}
                  onClick={() => selectDate("year")}
                >
                  本年
                </a>
              </div>
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          style={{ height: "400px !important" }}
        >
          <TabPane tab="销售额" key="sales">
            <DataCard
              dataByYear={props.salesByYear}
              dataByMonth={props.salesByMonth}
              dataByWeek={props.salesByWeek}
              catergory="sales"
              currentRange={currentRange}
              rankingListData={{
                year: getRankingList(props.salesByYear, currentRange),
                month: getRankingList(props.salesByMonth, currentRange),
                week: getRankingList(props.salesByWeek, currentRange),
              }}
            />
          </TabPane>
          <TabPane tab="访问量" key="visits">
            <DataCard
              dataByYear={props.visitsByYear}
              dataByMonth={props.visitsByMonth}
              dataByWeek={props.visitsByWeek}
              catergory="visits"
              currentRange={currentRange}
              rankingListData={{
                year: getRankingList(props.visitsByYear, currentRange),
                month: getRankingList(props.visitsByMonth, currentRange),
                week: getRankingList(props.visitsByWeek, currentRange),
              }}
            />
          </TabPane>
          <TabPane tab="订单数" key="orders">
            <DataCard
              dataByYear={props.ordersByYear}
              dataByMonth={props.ordersByMonth}
              dataByWeek={props.ordersByWeek}
              catergory="orders"
              currentRange={currentRange}
              rankingListData={{
                year: getRankingList(props.ordersByYear, currentRange),
                month: getRankingList(props.ordersByMonth, currentRange),
                week: getRankingList(props.ordersByWeek, currentRange),
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    salesByYear: state.yearData.salesByYear,
    visitsByYear: state.yearData.visitsByYear,
    ordersByYear: state.yearData.ordersByYear,
    salesByMonth: state.monthData.salesByMonth,
    visitsByMonth: state.monthData.visitsByMonth,
    ordersByMonth: state.monthData.ordersByMonth,
    salesByWeek: state.weekData.salesByWeek,
    visitsByWeek: state.weekData.visitsByWeek,
    ordersByWeek: state.weekData.ordersByWeek,
  };
};
const actionCreator = {};

export default connect(mapStateToProps, actionCreator)(DashboardChart);
