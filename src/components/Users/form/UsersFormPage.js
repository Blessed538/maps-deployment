import React, { Component } from "react";
import UsersForm from "components/Users/form/UsersForm";
import { push } from "connected-react-router";
import actions from "../../../actions/usersListActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UsersFormPage extends Component {
  state = {
    dispatched: false,
    promoAlert: false,
  };

  showPromoAlert() {
    this.setState({ promoAlert: true });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing() || this.isProfile()) {
      dispatch(actions.doUpdate(id, data, this.isProfile()));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  async fetchData() {
    const { match, dispatch, row } = this.props;
    console.log({ row }, "rowercoster");
    const userId = match.params.id;

    try {
      await dispatch(actions.findOne(userId));
    } catch (error) {
      // toast.error(error.response.data.message);
      console.error("Error in fetchData:", error);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-top-line">
          <h2 className="page-title">
            User - <span className="fw-semi-bold">Form</span>
          </h2>
        </div>
        <UsersForm
          saveLoading={this.props.saveLoading}
          currentUser={this.props.row}
          // onSubmit={this.doSubmit}
          onCancel={() => this.props.dispatch(push("/admin/users"))}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    row: store.users.list.row,
    saveLoading: store.users.list.loading,
  };
}

export default connect(mapStateToProps)(withRouter(UsersFormPage));
