import React, { Component } from "react";
import { debounce } from "../../utils/debounceUtil";
import { connect } from "react-redux";
class Chart extends Component {
  state = { chart: null };

  componentDidMount() {
    debounce(this.initChart.bind(this), 500)(); //初始化图表
    window.addEventListener("resize", () => this.resize()); // 监听窗口，变化时重置图表
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCollapsed !== this.props.isCollapsed) {
      this.resize();
    }
    if (nextProps.currentRange !== this.props.currentRange) {
      this.initChart();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  // 重置图表
  resize() {
    const chart = this.state.chart;
    if (chart) {
      debounce(chart.resize.bind(this), 300)();
    }
  }

  initChart() {
    if (!this.el) return;
    this.setState(
      {
        chart: window.echarts.init(this.el, "macarons"),
      },
      () => {
        this.state.chart.setOption(this.props.chartData, true);
      }
    );
  }

  dispose() {
    if (!this.state.chart) return;
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }
  render() {
    const { className, height, width, style } = this.props;
    return (
      <div
        className={className}
        ref={(el) => (this.el = el)}
        style={{ ...style, height, width }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isCollapsed: state.sidebar.isCollapsed,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(Chart);
