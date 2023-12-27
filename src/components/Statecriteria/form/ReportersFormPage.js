import React, { Component } from "react";
import ReportersForm from "./ReportersForm";
import { push } from "connected-react-router";
import actions from "../../../actions/usersFormActions";
import { connect } from "react-redux";

class ReportersFormPage extends Component {
  state = {
    dispatched: false,
    promoAlert: false,
  };

  doSubmit = async (data) => {
    try {
      await this.props.dispatch(actions.doCreate(data));
      // Optionally, add a redirect here if the operation was successful.
    } catch (error) {
      // Handle any errors specific to the doSubmit function.
      console.error("An error occurred during doSubmit:", error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-top-line">
          <h2 className="page-title">
            User - <span className="fw-semi-bold">Form</span>
          </h2>
        </div>

        <ReportersForm
          saveLoading={this.props.saveLoading}
          findLoading={this.props.findLoading}
          currentUser={this.props.currentUser}
          // record={
          //   this.isEditing() || this.isProfile() ? this.props.record : {}
          // }
          onSubmit={this.doSubmit}
          onCancel={() => this.props.dispatch(push("/admin/users"))}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    findLoading: store.users.form.findLoading,
    saveLoading: store.users.form.saveLoading,
    record: store.users.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(ReportersFormPage);
