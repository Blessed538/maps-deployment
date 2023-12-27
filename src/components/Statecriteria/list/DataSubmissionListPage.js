import React, { Component } from "react";
import DataSubmissionTable from "./DataSubmissionTable";

class DataSubmissionListPage extends Component {
  state = {
    popovers: {},
    promoAlert: false,
  };

  render() {
    return (
      <div>
        <div className="page-top-line">
          <h2 className="page-title">
            Report - <span className="fw-semi-bold">Management</span>
          </h2>
        </div>
        <DataSubmissionTable home="home" />
      </div>
    );
  }
}

export default DataSubmissionListPage;
