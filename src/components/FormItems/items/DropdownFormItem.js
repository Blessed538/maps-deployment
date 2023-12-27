import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "../formErrors";
import { FastField } from "formik";
import Select from "react-select";
// import "../../Statecriteria/Users.module.scss";

export class DropdownFormItemNotFast extends Component {
  render() {
    const {
      name,
      form,
      hint,
      size,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      defaultValue,
      errorMessage,
      required,
    } = this.props;
    const { label, options } = this.props.schema[name];

    const sizeLabelClassName =
      {
        small: "col-form-label-sm",
        large: "col-form-label-lg",
      }[size] || "";

    const sizeInputClassName =
      {
        small: "form-control-sm",
        large: "form-control-lg",
      }[size] || "";

    return (
      <div className="">
        {!!label && (
          <label
            className={`col-form-label ${
              required ? "required" : null
            } ${sizeLabelClassName}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <Select
          id={name}
          classNamePrefix="react-select"
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          placeholder={placeholder || undefined}
          className={` 
          selectCustomization
          } ${sizeInputClassName} ${FormErrors.validateStatus(
            form,
            name,
            errorMessage
          )}`}
          options={options}
          onChange={(event) => {
            form.setFieldValue(name, event.value);
            form.setFieldTouched(name);
          }}
          // {...inputProps}
          defaultValue={
            defaultValue && { label: defaultValue, value: defaultValue }
          }
        />
        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>
        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

DropdownFormItemNotFast.defaultProps = {
  required: false,
};

DropdownFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class DropdownFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <DropdownFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default DropdownFormItem;
