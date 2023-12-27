import React from "react";
import { Formik } from "formik";
// import usersFields from "components/Users/usersFields";
import IniValues from "components/FormItems/iniValues";
import PreparedValues from "components/FormItems/preparedValues";
import FormValidations from "components/FormItems/formValidations";
import Widget from "components/Widget";
import { useSelector, useDispatch } from "react-redux";
import EditInputFormItem from "../../FormItems/items/EditInputFormItem";
import { push } from "connected-react-router";
import actions from "../../../actions/usersListActions";
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
const EditProfile = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const dispatch = useDispatch();

  const iniValues = () => {
    return IniValues(userFields, user || {});
  };

  const formValidations = () => {
    return FormValidations(userFields, user || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(userFields, values || {});
    dispatch(actions.updateUser(userId, data));
  };

  const renderForm = () => {
    const { saveLoading } = props;

    return (
      <Widget title={<h4>Edit User</h4>}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={iniValues()}
          validationSchema={formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <EditInputFormItem
                  name={"firstName"}
                  label="FirstName"
                  defaultValue={user.firstName}
                  schema={currentUser}
                />

                <EditInputFormItem
                  name={"lastName"}
                  label="lastName"
                  defaultValue={user.lastName}
                  schema={currentUser}
                />

                {/* <EditInputFormItem
                  name={"role"}
                  label="Role"
                  defaultValue={currentUser.role}
                  schema={currentUser}
                /> */}

                <EditInputFormItem
                  label="Email"
                  defaultValue={user.email}
                  name={"email"}
                  schema={currentUser}
                />

                <div className="form-buttons mt-4">
                  <button
                    className="btn btn-primary me-3"
                    // disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-light me-3"
                    type="button"
                    onClick={() => dispatch(push("/app/profile"))}
                  >
                    Back
                  </button>
                </div>
              </form>
            );
          }}
        />
      </Widget>
    );
  };

  return renderForm();
};

export default EditProfile;
