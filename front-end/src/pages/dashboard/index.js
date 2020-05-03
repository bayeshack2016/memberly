import React, { Component } from "react";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardChart from "@/components/dashboardChart";
import PageLoading from "../../components/pageLoading";
import { connect } from "react-redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !(
        this.props.salesByPeriod &&
        this.props.visitsByPeriod &&
        this.props.ordersByPeriod &&
        this.props.allSales &&
        this.props.allVisits &&
        this.props.allOrders &&
        this.props.salesByYear &&
        this.props.visitsByYear &&
        this.props.ordersByYear &&
        this.props.salesByMonth &&
        this.props.visitsByMonth &&
        this.props.ordersByMonth &&
        this.props.salesByWeek &&
        this.props.visitsByWeek &&
        this.props.ordersByWeek &&
        this.props.period &&
        this.props.alipay &&
        this.props.wechatPay &&
        this.props.paypal &&
        this.props.email
      ),
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      loading: !(
        nextProps.salesByPeriod &&
        nextProps.visitsByPeriod &&
        nextProps.ordersByPeriod &&
        nextProps.allSales &&
        nextProps.allVisits &&
        nextProps.allOrders &&
        nextProps.salesByYear &&
        nextProps.visitsByYear &&
        nextProps.ordersByYear &&
        nextProps.salesByMonth &&
        nextProps.visitsByMonth &&
        nextProps.ordersByMonth &&
        nextProps.salesByWeek &&
        nextProps.visitsByWeek &&
        nextProps.ordersByWeek &&
        nextProps.period &&
        nextProps.alipay &&
        nextProps.wechatPay &&
        nextProps.paypal &&
        nextProps.email
      ),
    });
  }
  componentDidMount() {
    const echartsUrl = "/lib/echarts.min.js";
    this.addScript(echartsUrl);
  }

  addScript = (url) => {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);
  };
  render() {
    const { loading } = this.state;
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
  }
}
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
export default connect(mapStateToProps, null)(Dashboard);
