import { Formik } from "formik";
import React, { Component } from "react";
// import Loader from "components/Loader";
import InputFormItem from "components/FormItems/items/InputFormItem";
import usersFields from "../usersFields";
import IniValues from "components/FormItems/iniValues";
// import PreparedValues from "components/FormItems/preparedValues";
import FormValidations from "components/FormItems/formValidations";
import Widget from "components/Widget";
import DropdownFormItem from "../../FormItems/items/DropdownFormItem";
// import RadioFormItem from "../../FormItems/items/RadioFormItem";
// import ImagesFormItem from "../../FormItems/items/ImagesFormItem";

class ReportersForm extends Component {
  iniValues = () => {
    return IniValues(usersFields, this.props.record || {});
  };

  formValidations = () => {
    return FormValidations(usersFields, this.props.record || {});
  };

  handleSubmit = async (values) => {
    try {
      await this.props.onSubmit(values);
    } catch (error) {
      console.error("An error occurred during handleSubmit:", error);
    }
  };

  renderForm() {
    return (
      <Widget title={<h4>Add User</h4>}>
        <Formik
          onSubmit={this.handleSubmit}
          // initialValues={this.iniValues()}
          // validationSchema={this.formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <InputFormItem name={"firstName"} schema={usersFields} />
                <InputFormItem name={"lastName"} schema={usersFields} />
                <InputFormItem name={"email"} schema={usersFields} />
                <InputFormItem name={"password"} schema={usersFields} />
                <DropdownFormItem name={"role"} schema={usersFields} />

                {/* <DropdownFormItem name={"states"} schema={usersFields} /> */}
                {/* <RadioFormItem name={"disabled"} schema={usersFields} /> */}

                {/* <ImagesFormItem
                  name={"avatar"}
                  schema={usersFields}
                  path={"users/avatar"}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                /> */}

                <div className="form-buttons mt-4">
                  <button
                    className="btn btn-primary me-3"
                    // disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button>
                  {/* <button
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
                    Edit
                  </button> */}
                </div>
              </form>
            );
          }}
        />
      </Widget>
    );
  }

  render() {
    // const { isEditing, findLoading, record } = this.props;

    // if (findLoading) {
    //   return <Loader />;
    // }

    // if (isEditing && !record) {
    //   return <Loader />;
    // }

    return this.renderForm();
  }
}

export default ReportersForm;
