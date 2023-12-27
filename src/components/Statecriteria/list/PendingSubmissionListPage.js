import React, { Component } from "react";
import PendingSubmissionListTable from "./PendingSubmissionListTable";

class PendingSubmissionListPage extends Component {
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
        <PendingSubmissionListTable />
      </div>
    );
  }
}

export default PendingSubmissionListPage;
