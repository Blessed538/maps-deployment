import React, { Component } from "react";
import ReportersQuestionnaireForm from "./ReportersQuestionnaireForm";
import { push } from "connected-react-router";
import actions from "../../../actions/reports";
import { connect } from "react-redux";

class ReportersQuestionnairePage extends Component {
  state = {
    dispatched: false,
    promoAlert: false,
  };

  showPromoAlert() {
    this.setState({ promoAlert: true });
  }

  doSubmit = (data) => {
    const { dispatch } = this.props;
    dispatch(actions.createReport(data));
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-top-line">
          <h2 className="page-title">
            ICT Adoption- <span className="fw-semi-bold">Questionnaire</span>
          </h2>
        </div>

        <ReportersQuestionnaireForm
          saveLoading={this.props.saveLoading}
          onSubmit={this.doSubmit}
          // onCancel={() => this.props.dispatch(push("/admin/users"))}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    saveLoading: store.reports.saveLoading,
  };
}

export default connect(mapStateToProps)(ReportersQuestionnairePage);
