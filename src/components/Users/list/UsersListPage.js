import React, { Component } from "react";
import UsersListTable from "components/Users/list/UsersListTable";

class UsersListPage extends Component {
  state = {
    popovers: {},
    promoAlert: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.showPromoAlert();
    }, 100);
  }

  showPromoAlert() {
    this.setState({ promoAlert: true });
  }
  render() {
    console.log("using class component");
    return (
      <div>
        <div className="page-top-line">
          <h2 className="page-title">
            User - <span className="fw-semi-bold">Management</span>
          </h2>
        </div>
        <UsersListTable />
      </div>
    );
  }
}

export default UsersListPage;
