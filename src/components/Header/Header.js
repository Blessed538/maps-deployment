import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupText,
  InputGroup,
  Input,
  // UncontrolledAlert,
  // Dropdown,
  Collapse,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Badge,
  // ButtonGroup,
  // Button,
  // Form
} from "reactstrap";
// import Notifications from '../Notifications';
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
// import BellIcon from "../Icons/HeaderIcons/BellIcon";
// import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
// import MessageIcon from "../Icons/HeaderIcons/MessageIcon";
// import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
// import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
// import ArrowIcon from "../Icons/HeaderIcons/ArrowIcon";

import { logoutUser } from "../../actions/auth";
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility,
} from "../../actions/navigation";

// import sender1 from '../../images/people/a1.jpg';
// import sender2 from '../../images/people/a5.jpg';
// import sender3 from '../../images/people/a4.jpg';

import adminDefault from "../../images/chat/chat2.png";

import s from "./Header.module.scss";

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false,
    };
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    const userRole = JSON.parse(localStorage.getItem("user"));
    const user = this.props.currentUser;
    const avatar =
      user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;

    const firstUserLetter =
      user && (user.firstName || user.email)[0].toUpperCase();
    return (
      <Navbar className={`d-print-none`}>
        <div className={s.burger}>
          <NavLink
            onClick={this.toggleSidebar}
            className={`d-md-none ${s.navItem} text-white`}
            href="#"
          >
            {/* <BurgerIcon className={s.headerIcon} /> */}
          </NavLink>
        </div>
        <div className={`d-print-none ${s.root}`}>
          {/* <UncontrolledAlert className={`me-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}>
                Check out Light Blue
                <button
                  className="btn-link"
                  onClick={() => this.setState({ settingsOpen: true })}
                >
                  <SettingsIcon className={`${s.settingsIcon} btn-link`} />
                </button> on the right!
            </UncontrolledAlert> */}
          <Collapse
            className={`${s.searchCollapse} ms-lg-0 me-md-3`}
            isOpen={this.state.searchOpen}
          >
            <InputGroup
              className={`${s.navbarForm} ${
                this.state.searchFocused ? s.navbarFormFocused : ""
              }`}
            >
              <InputGroupText className={s.inputAddon}>
                <i className="fa fa-search" />
              </InputGroupText>

              <Input
                id="search-input-2"
                placeholder="Search..."
                className="input-transparent"
                onFocus={() => this.setState({ searchFocused: true })}
                onBlur={() => this.setState({ searchFocused: false })}
              />
            </InputGroup>
          </Collapse>
          {/* <Form className="d-md-down-none mx-3 my-auto">
            <InputGroup className={`input-group-no-border ${s.searchForm}`} >
              <InputGroupText className={s.inputGroupText}>
                <SearchIcon className={s.headerIcon} />
              </InputGroupText>
              <Input id="search-input" className="input-transparent" placeholder="Search Dashboard" />
            </InputGroup>
          </Form> */}

          <Nav className="ms-md-0">
            {/* <Dropdown
              nav
              isOpen={this.state.notificationsOpen}
              toggle={this.toggleNotifications}
              id="basic-nav-dropdown"
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle
                nav
                caret
                style={{ color: "#C1C3CF", padding: 0 }}
              ></DropdownToggle>
            </Dropdown> */}
            <div className="d-flex align-items-center">
              <span className={`${s.avatar} rounded-circle float-start`}>
                <img src={adminDefault} />
              </span>
              <span className={`small d-sm-down-none mr-2 ${s.adminEmail}`}>
                {userRole.role}
              </span>
            </div>

            <NavItem className={`${s.divider} d-none d-sm-block`} />

            <NavItem>
              <NavLink
                onClick={this.doLogout}
                className={`${s.navItem} text-white`}
                href="#"
              >
                <PowerIcon className={s.headerIcon} />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
    currentUser: store.auth.currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
