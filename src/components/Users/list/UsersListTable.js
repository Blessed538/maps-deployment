import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as dataFormat from "components/Users/list/UsersDataFormatters";
import actions from "../../../actions/usersListActions";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import Widget from "components/Widget";

import s from "../Users.module.scss";

const UsersListTable = (props) => {
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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
        onClick={() => {
          props.dispatch(push(`/admin/users/${cell}`));
          props.dispatch(actions.findOne(cell));
        }}
      >
        View
      </Button>
      <Button
        className={s.controBtn}
        color="success"
        onClick={() => props.dispatch(push(`/admin/users/${cell}/edit`))}
      >
        Edit
      </Button>
      <Button
        className={s.controBtn}
        color="danger"
        onClick={() => openModal(cell)}
      >
        Delete
      </Button>
    </div>
  );

  useEffect(() => {
    handleAllUsers();
  }, []);

  const handleAllUsers = async () => {
    try {
      const { dispatch } = props;
      await dispatch(actions.doFetch({}));
    } catch (error) {
      console.log(error);
    }
  };

  // const renderSizePerPageDropDown = (props) => {
  //   const limits = [];
  //   props.sizePerPageList.forEach((limit) => {
  //     limits.push(
  //       <DropdownItem
  //         key={limit}
  //         onClick={() => props.changeSizePerPage(limit)}
  //       >
  //         {limit}
  //       </DropdownItem>
  //     );
  //   }

  //   );

  //   return (
  //     <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
  //       <DropdownToggle color="default" caret>
  //         {props.currSizePerPage}
  //       </DropdownToggle>
  //       <DropdownMenu>{limits}</DropdownMenu>
  //     </Dropdown>
  //   );
  // };

  return (
    <div>
      <Widget title="Users">
        <div className={s.usersTableWrapper}>
          <BootstrapTable
            bordered={false}
            data={props.rows}
            version="4"
            tableContainerClass={`table-responsive table-striped table-hover ${s.usersListTableMobile}`}
          >
            <TableHeaderColumn dataField="firstName" dataSort>
              <span className="fs-sm">First Name</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="lastName" dataSort>
              <span className="fs-sm">Last Name</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="email" dataSort>
              <span className="fs-sm">E-mail</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="role" dataSort>
              <span className="fs-sm">Role</span>
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="disabled"
              dataSort
              dataFormat={dataFormat.booleanFormatter}
            >
              <span className="fs-sm">Disabled</span>
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

      <Modal size="sm" isOpen={props.modalOpen} toggle={() => closeModal()}>
        <ModalHeader toggle={() => closeModal()}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this User?</ModalBody>
        <ModalFooter>
          <Button color="default" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDelete()}>
            Delete
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

export default connect(mapStateToProps)(UsersListTable);
