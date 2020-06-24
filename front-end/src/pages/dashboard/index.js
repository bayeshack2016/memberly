import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardChart from "@/components/dashboardChart";
import PageLoading from "../../components/pageLoading";

import { connect } from "react-redux";
const Dashboard = (props) => {
  const [loading, setLoading] = useState(
    !(
      props.salesByPeriod &&
      props.visitsByPeriod &&
      props.ordersByPeriod &&
      props.allSales &&
      props.allVisits &&
      props.allOrders &&
      props.salesByYear &&
      props.visitsByYear &&
      props.ordersByYear &&
      props.salesByMonth &&
      props.visitsByMonth &&
      props.ordersByMonth &&
      props.salesByWeek &&
      props.visitsByWeek &&
      props.ordersByWeek &&
      props.period &&
      props.alipay &&
      props.wechatPay &&
      props.paypal &&
      props.email
    )
  );
  const addScript = (url) => {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);
  };
  useEffect(() => {
    setLoading(
      !(
        props.salesByPeriod &&
        props.visitsByPeriod &&
        props.ordersByPeriod &&
        props.allSales &&
        props.allVisits &&
        props.allOrders &&
        props.salesByYear &&
        props.visitsByYear &&
        props.ordersByYear &&
        props.salesByMonth &&
        props.visitsByMonth &&
        props.ordersByMonth &&
        props.salesByWeek &&
        props.visitsByWeek &&
        props.ordersByWeek &&
        props.period &&
        props.alipay &&
        props.wechatPay &&
        props.paypal &&
        props.email
      )
    );
  }, [props]);
  useEffect(() => {
    const echartsUrl = "/lib/echarts.min.js";
    addScript(echartsUrl);
  }, []);

  return (
    <div>
      {loading ? (
        <PageLoading />
      ) : (
        <div className="dahboard-container" style={{ padding: "20px" }}>
          <DashboardHeader />
          <DashboardChart />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    salesByPeriod: state.periodData.salesByPeriod,
    visitsByPeriod: state.periodData.visitsByPeriod,
    ordersByPeriod: state.periodData.ordersByPeriod,
    allSales: state.periodData.allSales,
    allVisits: state.periodData.allVisits,
    allOrders: state.periodData.allOrders,
    period: state.periodData.period,
    salesByYear: state.yearData.salesByYear,
    visitsByYear: state.yearData.visitsByYear,
    ordersByYear: state.yearData.ordersByYear,
    salesByMonth: state.monthData.salesByMonth,
    visitsByMonth: state.monthData.visitsByMonth,
    ordersByMonth: state.monthData.ordersByMonth,
    salesByWeek: state.weekData.salesByWeek,
    visitsByWeek: state.weekData.visitsByWeek,
    ordersByWeek: state.weekData.ordersByWeek,
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
    email: state.form.email,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(Dashboard);
