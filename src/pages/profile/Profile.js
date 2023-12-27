import React from "react";
import cx from "classnames";
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget";
import { push } from "connected-react-router";
import p19 from "../../images/pictures/19.jpg";
import a5 from "../../images/jimmy.jpg";
// import a1 from "../../images/people/a1.jpg";
// import a3 from "../../images/people/a3.jpg";
// import avatar from "../../images/avatar.png";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import s from "./Profile.module.scss";
// import Messaging from "./messaging";

const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const userObj = storedUser ? JSON.parse(storedUser) : null;
  const dispatch = useDispatch();

  return (
    <div className={s.root}>
      <h1 className="page-title">
        My <span className="fw-semi-bold">Profile</span>
      </h1>

      <Row>
        <Col lg={6} xs={12}>
          <Widget>
            <div className="widget-top-overflow text-white">
              <div className="height-250 overflow-hidden">
                <img className="img-fluid" src={p19} alt="..." />
              </div>
            </div>
            <Row>
              <Col md={5} xs={12} className="text-center">
                <div className={s.profileContactContainer}>
                  <span className="thumb-xl mb-3">
                    <img
                      className={[s.profileAvatar, "rounded-circle"].join(" ")}
                      src={a5}
                      alt="..."
                    />
                  </span>
                  <h5 className="fw-normal">
                    {userObj.firstName}{" "}
                    <span className="fw-semi-bold"> {userObj.lastName}</span>
                  </h5>

                  <p>{userObj.role}</p>

                  <button
                    onClick={() => dispatch(push("/app/edit_profile"))}
                    className="btn btn-success btn-sm mb-3"
                  >
                    Edit
                  </button>
                  <div>
                    <ul className={cx(s.profileContacts, "mt-sm")}>
                      {/* <li>
                        <i className="fa fa-lg fa-phone fa-fw me-2" />
                        <button className="btn-link"> +375 29 555-55-55</button>
                      </li> */}
                      <li className="d-flex align-items-center">
                        <i className="fa fa-lg fa-envelope fa-fw me-2" />
                        <button className="btn-link">{userObj.email}</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              {/* <Col md={7} xs={12}></Col> */}
            </Row>
          </Widget>
        </Col>
        <Col lg={6} xs={12}>
          {/* <section className="activities"></section> */}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
