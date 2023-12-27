import { Formik } from "formik";
import React, { Component } from "react";
import Loader from "components/Loader";
import InputFormItem from "components/FormItems/items/InputFormItem";
import usersFields from "components/Users/usersFields";
import IniValues from "components/FormItems/iniValues";
import PreparedValues from "components/FormItems/preparedValues";
import FormValidations from "components/FormItems/formValidations";
import Widget from "components/Widget";

class UsersForm extends Component {
  iniValues = () => {
    return IniValues(usersFields, this.props.record || {});
  };

  formValidations = () => {
    return FormValidations(usersFields, this.props.record || {});
  };

  handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(usersFields, values || {});
    this.props.onSubmit(id, data);
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <Widget title={<h4>Edit User</h4>} collapse>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.iniValues()}
          validationSchema={this.formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <InputFormItem name={"firstName"} schema={usersFields} />

                <InputFormItem name={"lastName"} schema={usersFields} />

                {/* <InputFormItem name={"role"} schema={usersFields} /> */}

                <InputFormItem name={"email"} schema={usersFields} />

                <div className="form-buttons mt-4">
                  <button
                    className="btn btn-primary me-3"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button>{" "}
                  <button
                    className="btn btn-light me-3"
                    type="button"
                    disabled={saveLoading}
                    onClick={form.handleReset}
                  >
                    Reset
                  </button>{" "}
                  <button
                    className="btn btn-light"
                    type="button"
                    disabled={saveLoading}
                    onClick={() => this.props.onCancel()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            );
          }}
        />
      </Widget>
    );
  }

  render() {
    const { saveLoading } = this.props;

    if (saveLoading) {
      return <Loader />;
    }

    return this.renderForm();
  }
}

export default UsersForm;
