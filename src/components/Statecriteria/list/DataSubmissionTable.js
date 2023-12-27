// import * as dataFormat from "components/Users/list/UsersDataFormatters";
import actions from "../../../actions/usersListActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import Widget from "components/Widget";

import s from "../Users.module.scss";
// import dummyStates from "./dummyStateData";

class DataSubmissionTable extends Component {
  state = {
    modalOpen: false,
    idToDelete: null,
  };

  handleDelete() {
    const userId = this.props.idToDelete;
    this.props.dispatch(actions.doDelete(userId));
  }

  openModal(cell) {
    const userId = cell;
    this.props.dispatch(actions.doOpenConfirm(userId));
  }

  closeModal() {
    this.props.dispatch(actions.doCloseConfirm());
  }

  actionFormatter(cell) {
    return (
      <div className={`d-flex justify-content-between`}>
        <Button
          className={s.controBtn}
          color="info"
          onClick={() => this.props.dispatch(push(`/admin/users/${cell}`))}
        >
          View
        </Button>
        <Button
          className={s.controBtn}
          color="danger"
          onClick={() => this.props.dispatch(push(`/admin/users/${cell}/edit`))}
        >
          Edit
        </Button>
        <Button
          className={s.controBtn}
          color="success"
          onClick={() => this.openModal(cell)}
        >
          Publish
        </Button>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch({}));
  }

  renderSizePerPageDropDown = (props) => {
    const limits = [];
    props.sizePerPageList.forEach((limit) => {
      limits.push(
        <DropdownItem
          key={limit}
          onClick={() => props.changeSizePerPage(limit)}
        >
          {limit}
        </DropdownItem>
      );
    });

    return (
      <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
        <DropdownToggle color="default" caret>
          {props.currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>{limits}</DropdownMenu>
      </Dropdown>
    );
  };

  render() {
    // const { rows, home } = this.props;
    // const options = {
    //   sizePerPage: 10,
    //   paginationSize: 5,
    //   sizePerPageDropDown: this.renderSizePerPageDropDown,
    // };

    return (
      <div>
        <Widget title="Data Submission">
          <div className={s.usersTableWrapper}>
            <BootstrapTable
              bordered={false}
              // data={[]}
              version="4"
              // pagination
              // options={options}
              tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile}`}
            >
              <TableHeaderColumn dataField="state" dataSort>
                <span className="fs-sm">State</span>
              </TableHeaderColumn>

              <TableHeaderColumn dataField="nameOfOfficer" dataSort>
                <span className="fs-sm">Name of Officer</span>
              </TableHeaderColumn>

              <TableHeaderColumn dataField="status" dataSort>
                <span className="fs-sm">Status</span>
              </TableHeaderColumn>

              <TableHeaderColumn dataField="submittedDate" dataSort>
                <span className="fs-sm">Submitted On</span>
              </TableHeaderColumn>

              <TableHeaderColumn dataField="publishedBy" dataSort>
                <span className="fs-sm">Published By</span>
              </TableHeaderColumn>

              <TableHeaderColumn dataField="publishedOn" dataSort>
                <span className="fs-sm">Published On</span>
              </TableHeaderColumn>

              <TableHeaderColumn
                isKey
                dataField="id"
                dataFormat={this.actionFormatter.bind(this)}
              >
                <span className="fs-sm">Actions</span>
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </Widget>

        <Modal
          size="sm"
          isOpen={this.props.modalOpen}
          toggle={() => this.closeModal()}
        >
          <ModalHeader toggle={() => this.closeModal()}>
            Confirm delete
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this item?</ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => this.closeModal()}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.handleDelete()}>
              Publish
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.users.list.loading,
    rows: store.users.list.rows,
    modalOpen: store.users.list.modalOpen,
    idToDelete: store.users.list.idToDelete,
  };
}

export default connect(mapStateToProps)(DataSubmissionTable);
