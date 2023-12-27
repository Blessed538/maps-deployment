import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget";
import peopleA1 from "../../images/people/a1.jpg";
import peopleA2 from "../../images/people/a2.jpg";
import peopleA5 from "../../images/people/a5.jpg";
import peopleA4 from "../../images/people/a4.jpg";

import s from "./Profile.module.scss";

const Messaging = () => (
  <div className={s.root}>
    <Row>
      <Col lg={12} xs={12}>
        <Widget
          title={
            <h6>
              <span className="badge bg-danger">New</span> Messages
            </h6>
          }
        >
          <div className="widget-body undo_padding">
            <div className="list-group list-group-lg">
              <button className="list-group-item text-start">
                <span className="thumb-sm float-start me-3">
                  <img className="rounded-circle" src={peopleA2} alt="..." />
                  <i className="status status-bottom bg-success" />
                </span>
                <div>
                  <h6 className="m-0">Chris Gray</h6>
                  <p className="help-block text-ellipsis m-0">
                    Hey! What&apos;s up? So many times since we
                  </p>
                </div>
              </button>
              <button className="list-group-item text-start">
                <span className="thumb-sm float-start me-3">
                  <img className="rounded-circle" src={peopleA4} alt="..." />
                  <i className="status status-bottom bg-success" />
                </span>
                <div>
                  <h6 className="m-0">Jamey Brownlow</h6>
                  <p className="help-block text-ellipsis m-0">
                    Good news coming tonight. Seems they agreed to proceed
                  </p>
                </div>
              </button>
              <button className="list-group-item text-start">
                <span className="thumb-sm float-start me-3">
                  <img className="rounded-circle" src={peopleA1} alt="..." />
                  <i className="status status-bottom bg-primary" />
                </span>
                <div>
                  <h6 className="m-0">Livia Walsh</h6>
                  <p className="help-block text-ellipsis m-0">
                    Check my latest email plz!
                  </p>
                </div>
              </button>
              <button className="list-group-item text-start">
                <span className="thumb-sm float-start me-3">
                  <img className="rounded-circle" src={peopleA5} alt="..." />
                  <i className="status status-bottom bg-danger" />
                </span>
                <div>
                  <h6 className="m-0">Jaron Fitzroy</h6>
                  <p className="help-block text-ellipsis m-0">
                    What about summer break?
                  </p>
                </div>
              </button>
            </div>
          </div>
          <footer className="bg-widget-transparent mt">
            <input
              type="search"
              className="form-control form-control-sm bg-custom-dark border-0"
              placeholder="Search"
            />
          </footer>
        </Widget>
      </Col>
    </Row>
  </div>
);

export default Messaging;
