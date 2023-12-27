import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import actions from "../../../actions/usersListActions";
import Widget from "components/Widget";
import IniValues from "components/FormItems/iniValues";
import PreparedValues from "components/FormItems/preparedValues";
import FormValidations from "components/FormItems/formValidations";
import EditInputFormItem from "../../FormItems/items/EditInputFormItem";
import { push } from "connected-react-router";

const userFields = {
  firstName: {
    type: "string",
    label: "First Name",
    required: true,
  },
  lastName: {
    type: "string",
    label: "Last Name",
    required: true,
  },
  email: {
    type: "string",
    label: "Email",
    required: true,
  },
  role: {
    type: "string",
    label: "Role",
    required: true,
  },
};

const UsersView = (props) => {
  const { match } = props;
  const userId = match.params.id;
  const row = useSelector((state) => state.users.list.row);
  const loading = useSelector((state) => state.users.list.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(actions.findOne(userId));
      } catch (error) {
        toast.error(error.response.data.message);
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, [dispatch, userId]);

  const iniValues = () => {
    return IniValues(userFields, row.row || {});
  };

  const formValidations = () => {
    return FormValidations(userFields, row.row || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(userFields, values || {});
    dispatch(actions.editOne(userId, data));
  };

  console.log("loading", loading);
  const renderView = () => {
    return (
      <Widget title={<h4>{"View User"}</h4>} collapse>
        <Formik
          onSubmit={handleSubmit}
          initialValues={iniValues()}
          validationSchema={formValidations()}
        >
          {(form) => (
            <form onSubmit={form.handleSubmit}>
              <EditInputFormItem
                name={"firstName"}
                label="FirstName"
                defaultValue={row.row.firstName}
                schema={row.row}
              />

              <EditInputFormItem
                name={"lastName"}
                defaultValue={row.row.lastName}
                label="LastName"
                schema={row.row}
              />

              <EditInputFormItem
                label="Role"
                name={"role"}
                defaultValue={row.row.role}
                schema={row.row}
              />

              <EditInputFormItem
                label="Email"
                name={"email"}
                defaultValue={row.row.email}
                schema={row.row}
              />

              <div className="form-buttons mt-4">
                <button
                  className="btn btn-primary me-3"
                  type="button"
                  disabled={loading}
                  onClick={form.handleSubmit}
                >
                  {loading ? "Loading" : "Edit"}
                </button>
                <button
                  className="btn btn-light me-3"
                  type="button"
                  onClick={() => dispatch(push("/admin/users"))}
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Widget>
    );
  };

  return renderView();
};

export default connect()(withRouter(UsersView));
