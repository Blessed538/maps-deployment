import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";
import Widget from "../../../components/Widget";
import Select from "react-select";
import { registerUser, authError } from "../../../actions/auth";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      roleOptions: [
        { value: "Admin", label: "Admin" },
        { value: "Reporter", label: "Reporter" },
        { value: "Viewer", label: "Viewer" },
      ],
      role: "",
    };

    this.doRegister = this.doRegister.bind(this);
    // this.googleLogin = this.googleLogin.bind(this);
    // this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeFirstname = this.changeFirstname.bind(this);
    this.changeLastname = this.changeLastname.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  changeRole(selectedOption) {
    this.setState({ role: selectedOption });
  }

  changeLastname(event) {
    this.setState({ lastName: event.target.value });
  }

  changeFirstname(event) {
    this.setState({ firstName: event.target.value });
  }
  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.props.dispatch(authError("Password field is empty"));
      } else {
        this.props.dispatch(authError("Passwords are not equal"));
      }
      setTimeout(() => {
        this.props.dispatch(authError());
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  doRegister(e) {
    e.preventDefault();
    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.props.dispatch(
        registerUser({
          email: this.state.email,
          password: this.state.password,
          lastName: this.state.lastName,
          firstName: this.state.firstName,
          role: this.state.role.value,
        })
      );
    }
  }

  //   googleLogin() {
  //     this.props.dispatch(loginUser({ social: "google" }));
  //   }

  //   microsoftLogin() {
  //     this.props.dispatch(loginUser({ social: "microsoft" }));
  //   }

  render() {
    return (
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Create an account</h3>}
          >
            <p className="widget-auth-info">Please fill all fields below</p>
            <form className="mt" onSubmit={this.doRegister}>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="mt">
                <InputGroup className="input-group-no-border">
                  <InputGroupText>
                    <i className="la la-user text-white" />
                  </InputGroupText>

                  <Input
                    id="firstName"
                    className="input-transparent ps-3"
                    value={this.state.firstName}
                    onChange={this.changeFirstname}
                    type="text"
                    required
                    name="firstName"
                    placeholder="firstName"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <InputGroup className="input-group-no-border">
                  <InputGroupText>
                    <i className="la la-user text-white" />
                  </InputGroupText>

                  <Input
                    id="lastName"
                    className="input-transparent ps-3"
                    value={this.state.lastName}
                    onChange={this.changeLastname}
                    type="text"
                    required
                    name="lastName"
                    placeholder="lastName"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup row className="mt input-group-no-border">
                <Select
                  classNamePrefix="react-select"
                  placeholder="Role"
                  className="selectCustomization input-group-no-border"
                  options={this.state.roleOptions}
                  onChange={this.changeRole}
                  value={this.state.role}
                  //    defaultValue={this.state.role[0]}
                />
              </FormGroup>
              <FormGroup className="mt">
                <InputGroup className="input-group-no-border">
                  <InputGroupText>
                    <i className="la la-user text-white" />
                  </InputGroupText>

                  <Input
                    id="email"
                    className="form-control ps-3"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-no-border">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>

                  <Input
                    id="password"
                    className="input-transparent ps-3"
                    value={this.state.password}
                    onChange={this.changePassword}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-no-border">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>

                  <Input
                    id="password"
                    className="input-transparent ps-3"
                    value={this.state.confirmPassword}
                    onChange={this.changeConfirmPassword}
                    onBlur={this.checkPassword}
                    type="password"
                    required
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </InputGroup>
              </FormGroup>
              <Button
                type="submit"
                color="inverse"
                className="auth-btn mb-3"
                size="sm"
              >
                {this.props.isFetching ? "Loading..." : "Register"}
              </Button>
              <div className="bg-widget auth-widget-footer">
                <p className="widget-auth-info mt-4">
                  Already have the account? Login now!
                </p>
                <Link className="d-block text-center" to="login">
                  Enter the account
                </Link>
                <p className="widget-auth-info mt-4 mb-4">
                  Don't have an account? Sign up now!
                </p>
              </div>
            </form>
          </Widget>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
