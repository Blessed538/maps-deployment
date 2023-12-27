import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cx from "classnames";
import { Col, Row, Progress } from "reactstrap";
import Widget from "../../components/Widget";
import MainChart from "./components/Charts/DummyChart";
import TableContainer from "./components/TableContainer/TableContainer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mock from "./mock";
import s from "./Analitycs.module.scss";
import { receiveDataRequest } from "../../actions/analytics";

class Analytics extends Component {
  static propTypes = {
    visits: PropTypes.any,
    performance: PropTypes.any,
    server: PropTypes.any,
    revenue: PropTypes.any,
    mainChart: PropTypes.any,
    isReceiving: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visits: {},
    performance: {},
    server: {},
    revenue: [],
    mainChart: [],
    isReceiving: false,
  };

  getRandomData = () => {
    const arr = [];
    for (let i = 0; i < 25; i += 1) {
      arr.push(Math.random().toFixed(1) * 10);
    }
    return arr;
  };

  donut = () => {
    let series = [
      {
        name: "Revenue",
        data: this.props.revenue.map((s) => {
          return {
            name: s.label,
            y: s.data,
          };
        }),
      },
    ];
    return {
      chart: {
        type: "pie",
        height: 120,
        backgroundColor: "rgba(0,0,0,0)",
      },
      credits: {
        enabled: false,
      },
      title: false,
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          borderWidth: 0,
          showInLegend: true,
          innerSize: 80,
          size: 100,
          states: {
            hover: {
              halo: {
                size: 1,
              },
            },
          },
        },
      },
      colors: ["#2d8515", "#2477ff", "#db2a34"],
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          color: "rgba(244, 244, 245, 0.6)",
          fontWeight: 400,
        },
        itemHoverStyle: {
          color: "#cccccc",
        },
        itemMarginBottom: 5,
        symbolRadius: 0,
      },
      exporting: {
        enabled: false,
      },
      series,
    };
  };

  componentDidMount() {
    this.props.dispatch(receiveDataRequest());
  }

  render() {
    const { visits, isReceiving, performance, mainChart } = this.props;
    return (
      <div>
        <h1 className="page-title">Analytics</h1>
        <div className={s.sidesWrapper}>
          <div className={s.analyticsSide}>
            <Row>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    className="mb-0 h-100"
                    bodyClass="mt-lg"
                    fetchingData={isReceiving}
                    title={<h5>Total Visits </h5>}
                  >
                    <div className="d-flex justify-content-between align-items-center mb h3">
                      <h2 style={{ fontSize: "2.1rem" }}>{visits.count}</h2>
                      <i className="la la-arrow-right text-success rotate-315" />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className={cx("mt")}>
                        <h6>+{visits.logins}</h6>
                        <p className="text-muted mb-0 me-2">
                          <small>Logins</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>{visits.sign_out_pct}%</h6>
                        <p className="text-muted mb-0">
                          <small>Sign Out</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>{visits.rate_pct}%</h6>
                        <p className="text-muted mb-0 me-2">
                          <small>Rate</small>
                        </p>
                      </div>
                    </div>
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    bodyClass="mt"
                    className="mb-0 h-100"
                    fetchingData={isReceiving}
                    title={<h5>Total Submitted States</h5>}
                  >
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.donut()}
                    />
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    bodyClass="mt"
                    className="mb-0 h-100"
                    fetchingData={isReceiving}
                    title={<h5>Active Users</h5>}
                  >
                    <p className="text-muted d-flex flex-wrap">
                      <small className="me-3 d-flex align-items-center">
                        <span
                          className="circle bg-success text-success me-1"
                          style={{ fontSize: "4px" }}
                        >
                          .
                        </span>
                        This Period
                      </small>
                      <small className="me-3 d-flex align-items-center">
                        <span
                          className="circle bg-primary text-primary me-1"
                          style={{ fontSize: "4px" }}
                        >
                          .
                        </span>
                        Last Period
                      </small>
                    </p>
                    <h6 className="fs-sm text-muted">Admins</h6>
                    <Progress
                      color="success"
                      className="progress-sm"
                      style={{ height: "10px", marginBottom: "5px" }}
                      value={performance.sdk?.this_period_pct}
                    />
                    <Progress
                      color="primary"
                      className="progress-sm"
                      style={{ height: "10px" }}
                      value={performance.sdk?.last_period_pct}
                    />
                    <h6 className="mt fs-sm text-muted">Reporters</h6>
                    <Progress
                      color="success"
                      className="progress-sm"
                      style={{ height: "10px", marginBottom: "5px" }}
                      value={performance.integration?.this_period_pct}
                    />
                    <Progress
                      color="primary"
                      className="progress-sm"
                      style={{ height: "10px" }}
                      value={performance.integration?.last_period_pct}
                    />
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    className="mb-0 h-100"
                    bodyClass="mt-lg"
                    fetchingData={isReceiving}
                    title={<h5>Total Submissions</h5>}
                  >
                    <div className="d-flex justify-content-between align-items-center mb h3">
                      <h2 style={{ fontSize: "2.1rem" }}>{visits.count}</h2>
                      <i className="la la-arrow-right text-success rotate-315" />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className={cx("mt")}>
                        <h6>+{visits.logins}</h6>
                        <p className="text-muted mb-0 me-2">
                          <small>States</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>{visits.sign_out_pct}%</h6>
                        <p className="text-muted mb-0">
                          <small>Reporters</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>50%</h6>
                        <p className="text-muted mb-0 me-2">
                          <small>Rate</small>
                        </p>
                      </div>
                    </div>
                  </Widget>
                </div>
              </Col>
              <Col lg={12} xs={12}>
                <MainChart data={mainChart} isReceiving={isReceiving} />
              </Col>

              {/* <Col xs={12} className="mb-lg">
                <Widget
                  className="pb-0"
                  bodyClass={`mt p-0`}
                  title={<h4> Submissions</h4>}
                  close settings

                >
                  <TableContainer data={mock.table} />
                </Widget>
              </Col> */}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visits: state.analytics.visits,
    isReceiving: state.analytics.isReceiving,
    performance: state.analytics.performance,
    revenue: state.analytics.revenue,
    server: state.analytics.server,
    mainChart: state.analytics.mainChart,
  };
}

export default connect(mapStateToProps)(Analytics);
