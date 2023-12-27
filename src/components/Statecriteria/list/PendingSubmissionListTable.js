import React, { useState, useEffect } from "react";
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
import dummyStates from "./dummyStateData";
import actions from "../../../actions/usersListActions";
import { getReports } from "../../../actions/reports";
import { useSelector } from "react-redux";

const PendingSubmissionListTable = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const reports = useSelector((state) => state.reports.reports);

  console.log({ reports });
  const handleDelete = () => {
    props.dispatch(actions.doDelete(userIdToDelete));
  };

  const openModal = (cell) => {
    setUserIdToDelete(cell);
    props.dispatch(actions.doOpenConfirm(cell));
  };

  const closeModal = () => {
    props.dispatch(actions.doCloseConfirm());
  };

  const actionFormatter = (cell) => (
    <div className={`d-flex justify-content-between`}>
      <Button
        className={s.controBtn}
        color="info"
        onClick={() => props.dispatch(push(`/app/report/${cell}`))}
      >
        View
      </Button>
      <Button
        className={s.controBtn}
        color="danger"
        onClick={() => props.dispatch(push(`/app/report/${cell}/edit`))}
      >
        Edit
      </Button>
      {/* <Button
        className={s.controBtn}
        color="success"
        onClick={() => openModal(cell)}
      >
        Publish
      </Button> */}
    </div>
  );

  useEffect(() => {
    const { dispatch } = props;
    dispatch(getReports());
  }, []);

  const renderSizePerPageDropDown = (props) => {
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

  return (
    <div>
      <Widget title="Pending Submission">
        <div className={s.usersTableWrapper}>
          <BootstrapTable
            bordered={false}
            data={reports}
            version="4"
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

            <TableHeaderColumn dataField="createdAt" dataSort>
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
              dataFormat={actionFormatter}
            >
              <span className="fs-sm">Actions</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </Widget>

      <Modal size="sm" isOpen={modalOpen} toggle={() => closeModal()}>
        <ModalHeader toggle={() => closeModal()}>Confirm delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button color="default" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDelete()}>
            Publish
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.list.loading,
    rows: store.users.list.rows,
    modalOpen: store.users.list.modalOpen,
    idToDelete: store.users.list.idToDelete,
  };
}

export default connect(mapStateToProps)(PendingSubmissionListTable);
