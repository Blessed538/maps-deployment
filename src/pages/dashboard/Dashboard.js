import React, { useEffect, useState } from "react";
import { Row, Col, Progress } from "reactstrap";
import Widget from "../../components/Widget";
import s from "./Dashboard.module.scss";
import { useSelector } from "react-redux";
import AnimateNumber from "react-animated-number";
import NigeriaGoogleMap2 from "./components/googleMap/googleMap2";
import { IndicatorsQuestions } from "./utils";

const Dashboard = () => {
  const stateName = useSelector((state) => state.reports.stateName);
  const [currentQuestion, setCurrentQuestions] = useState({});
  const currentIndicatorQuestions = useSelector(
    (state) => state.reports.currentIndicator
  );

  useEffect(() => {
    setCurrentQuestions(
      IndicatorsQuestions[stateName][currentIndicatorQuestions]
    );
  }, [stateName, currentIndicatorQuestions, currentIndicatorQuestions]);

  return (
    <div className={s.root}>
      <Row>
        <Col lg={7}>
          <Widget className="bg-transparent">
            <NigeriaGoogleMap2 />
          </Widget>
        </Col>
        {/* <Col lg={1} /> */}

        <Col lg={5}>
          <Widget
            className="bg-transparent"
            title={
              <h5>
                Map
                <span className="fw-semi-bold">&nbsp;Statistics</span>
              </h5>
            }
          >
            <p>
              Status: <strong>Live</strong>
            </p>
            <p>
              <span className="circle bg-default text-white">
                <i className="fa fa-map-marker" />
              </span>{" "}
              &nbsp; {stateName} State
            </p>
            {Object.values(currentQuestion).map((indicator, index) => (
              <div key={index} className="row progress-stats">
                <div className="col-md-9 col-12">
                  <p className="description deemphasize mb-xs text-white">
                    {indicator.question}
                  </p>
                  <Progress
                    color="success"
                    value="80"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={indicator.value} />%
                    </small>
                  </span>
                </div>
              </div>
            ))}
            {/* <div className="row progress-stats">
              <div className="col-md-9 col-12">
                <p className="description deemphasize mb-xs text-white">
                  Use of technology to upscale agricultural output
                </p>
                <Progress
                  color="danger"
                  value="39"
                  className="bg-subtle-blue progress-xs"
                />
              </div>
              <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimateNumber value={84} />%
                  </small>
                </span>
              </div>
            </div> */}
            {/* <div className="row progress-stats"> */}
            {/* <div className="col-md-9 col-12">
                <p className="description deemphasize mb-xs text-white">
                  Direct jobs were created through start ups
                </p>
                <Progress
                  color="success"
                  value="80"
                  className="bg-subtle-blue progress-xs"
                />
              </div> */}
            {/* <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimateNumber value={92} />%
                  </small>
                </span>
              </div> */}
            {/* </div> */}
            <h6 className="fw-semi-bold mt">Map Distributions</h6>
            <p>
              {/* Tracking: <strong>Active</strong> */}
              36 States & FCT
            </p>
            <p>
              <span className="circle bg-default text-white">
                <i className="fa fa-cog" />
              </span>
              &nbsp; 30 Evaluation Datasets, & Focus Areas
            </p>
            <div className="input-group mt">
              <input
                type="text"
                className="form-control bg-custom-dark border-0"
                placeholder="Search Map"
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className={`btn btn-subtle-blue ${s.searchBtn}`}
                >
                  <i className="fa fa-search text-light" />
                </button>
              </span>
            </div>
          </Widget>
        </Col>
      </Row>

      <Row>
        <Col lg={6} xl={4} xs={12}>
          <Widget title={<h6> USERBASE GROWTH </h6>}>
            <div className="stats-row">
              <div className="stat-item">
                <h6 className="name">Overall Growth</h6>
                <p className="value">76.38%</p>
              </div>
              <div className="stat-item">
                <h6 className="name">Montly</h6>
                <p className="value">10.38%</p>
              </div>
              <div className="stat-item">
                <h6 className="name">24h</h6>
                <p className="value">3.38%</p>
              </div>
            </div>
            <Progress
              color="success"
              value="60"
              className="bg-subtle-blue progress-xs"
            />
            <p>
              <small>
                <span className="circle bg-default text-white me-2">
                  <i className="fa fa-chevron-up" />
                </span>
              </small>
              <span className="fw-semi-bold">&nbsp;17% higher</span>
              &nbsp;than last month
            </p>
          </Widget>
        </Col>
        <Col lg={6} xl={4} xs={12}>
          <Widget title={<h6> TRAFFIC VALUES </h6>}>
            <div className="stats-row">
              <div className="stat-item">
                <h6 className="name">Overall Values</h6>
                <p className="value">17 567 318</p>
              </div>
              <div className="stat-item">
                <h6 className="name">Montly</h6>
                <p className="value">55 120</p>
              </div>
              <div className="stat-item">
                <h6 className="name">24h</h6>
                <p className="value">9 695</p>
              </div>
            </div>
            <Progress
              color="danger"
              value="60"
              className="bg-subtle-blue progress-xs"
            />
            <p>
              <small>
                <span className="circle bg-default text-white me-2">
                  <i className="fa fa-chevron-down" />
                </span>
              </small>
              <span className="fw-semi-bold">&nbsp;8% lower</span>
              &nbsp;than last month
            </p>
          </Widget>
        </Col>
        <Col lg={6} xl={4} xs={12}>
          <Widget title={<h6> STATE STATS </h6>}>
            <div className="stats-row">
              <div className="stat-item">
                <h6 className="name fs-sm">Overcome T.</h6>
                <p className="value">104.85%</p>
              </div>
              <div className="stat-item">
                <h6 className="name fs-sm">Takeoff Angle</h6>
                <p className="value">14.29&deg;</p>
              </div>
              <div className="stat-item">
                <h6 className="name fs-sm">World Pop.</h6>
                <p className="value">7,211M</p>
              </div>
            </div>
            <Progress
              color="bg-primary"
              value="60"
              className="bg-subtle-blue progress-xs"
            />
            <p>
              <small>
                <span className="circle bg-default text-white me-2">
                  <i className="fa fa-plus" />
                </span>
              </small>
              <span className="fw-semi-bold">&nbsp;8 734 higher</span>
              &nbsp;than last month
            </p>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
