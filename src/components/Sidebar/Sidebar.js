import React from "react";
import cx from "classnames";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { dismissAlert } from "../../actions/alerts";
import { useDispatch, useSelector } from "react-redux";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";
import ILogo from "../../images/ipmp.png";
// import DashboardIcon from "../Icons/SidebarIcons/basil/Home";
import UserIcon from "../Icons/SidebarIcons/basil/User";
// import EcommerceIcon from '../Icons/SidebarIcons/basil/ShoppingCart';
// import LBPackageIcon from '../Icons/SidebarIcons/basil/Stack';
// import EmailIcon from "../Icons/SidebarIcons/basil/Envelope";
// import DocumentationIcon from '../Icons/SidebarIcons/basil/Document';
import CoreIcon from "../Icons/SidebarIcons/basil/Apps";
import UIElementsIcon from "../Icons/SidebarIcons/basil/Asana";
// import GridIcon from '../Icons/SidebarIcons/basil/Columns';
// import FormsIcon from '../Icons/SidebarIcons/basil/ChartPieAlt';
// import ChartsIcon from '../Icons/SidebarIcons/basil/Layout';
// import TablesIcon from '../Icons/SidebarIcons/basil/Rows';
// import MapsIcon from '../Icons/SidebarIcons/basil/Rows';
// import ExtraIcon from '../Icons/SidebarIcons/basil/Fire';
import MenuIcon from "../Icons/SidebarIcons/basil/Menu";

import { changeActiveSidebarItem } from "../../actions/navigation";
// import { logoutUser } from "../../actions/auth";

// class Sidebar extends React.Component {
//   static propTypes = {
//     sidebarStatic: PropTypes.bool,
//     sidebarOpened: PropTypes.bool,
//     dispatch: PropTypes.func.isRequired,
//     activeItem: PropTypes.string,
//     location: PropTypes.shape({
//       pathname: PropTypes.string,
//     }).isRequired,
//   };

//   static defaultProps = {
//     sidebarStatic: false,
//     activeItem: "",
//     currentRole: localStorage.getItem("user"),
//   };

//   constructor(props) {
//     super(props);

//     this.doLogout = this.doLogout.bind(this);
//   }

//   componentDidMount() {
//     this.element.addEventListener(
//       "transitionend",
//       () => {
//         if (this.props.sidebarOpened) {
//           this.element.classList.add(s.sidebarOpen);
//         }
//       },
//       false
//     );
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
//       if (nextProps.sidebarOpened) {
//         this.element.style.height = `${this.element.scrollHeight}px`;
//       } else {
//         this.element.classList.remove(s.sidebarOpen);
//         setTimeout(() => {
//           this.element.style.height = "";
//         }, 0);
//       }
//     }
//   }

//   dismissAlert(id) {
//     this.props.dispatch(dismissAlert(id));
//   }

//   doLogout() {
//     this.props.dispatch(logoutUser());
//   }

const SidebarMenu = ({ currentUserRole }) => {
  console.log({ currentUserRole });

  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.auth.currentUser);
  // const sidebarOpened = useSelector((state) => state.navigation.sidebarOpened);
  // const sidebarStatic = useSelector((state) => state.navigation.sidebarStatic);
  // const alertsList = useSelector((state) => state.alerts.alertsList);
  const activeItem = useSelector((state) => state.navigation.activeItem);

  return (
    <nav
      className={cx(s.root)}
      ref={(nav) => {
        // this.element = nav;
      }}
    >
      <header className={s.logo}>
        <img src={ILogo} alt="app logo" className={s.sidebarLogo} />
      </header>

      <ul className={s.nav}>
        {/* <h5 className={[s.navTitle, s.groupTitle].join(" ")}>APP</h5> */}

        {currentUserRole === "Admin" ? (
          <>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Dashboard"
              isHeader
              iconName={<CoreIcon className={s.menuIcon} />}
              link="/app/main"
              index="main"
              childrenLinks={[
                {
                  header: "Dashboard",
                  link: "/app/main/dashboard",
                },
                {
                  header: "Analytics",
                  link: "/app/main/analytics",
                },
              ]}
              //
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Manage Users"
              isHeader
              labelColor="primary"
              iconName={<UserIcon className={s.menuIcon} />}
              link="/admin"
              index="admin"
              // label="Real App"
              exact={false}
              childrenLinks={[
                {
                  header: "Users",
                  link: "/admin/users",
                },
                {
                  header: "Create User",
                  link: "/admin/users/new",
                },

                {
                  header: "Profile",
                  link: "/app/profile",
                },
              ]}
            />

            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Report "
              isHeader
              labelColor="primary"
              iconName={<UIElementsIcon className={s.menuIcon} />}
              link="/report"
              index="report"
              exact={false}
              childrenLinks={[
                {
                  header: "Pen. Submission",
                  link: "/app/report/pending",
                },
                {
                  header: "Data Submission",
                  link: "/app/report/datasubmission",
                },
                {
                  header: "Pen. Questionnaire",
                  link: "/app/report/create",
                },
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="States"
              isHeader
              labelColor="primary"
              iconName={<MenuIcon className={s.menuIcon} />}
              link="/states"
              index="states"
              exact={false}
              childrenLinks={[
                {
                  header: "States Submissions",
                  link: "/admin/states/submissions",
                },
              ]}
            />
          </>
        ) : currentUserRole === "Reporter" ? (
          <>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Dashboard"
              isHeader
              iconName={<CoreIcon className={s.menuIcon} />}
              link="/app/main"
              index="main"
              childrenLinks={[
                {
                  header: "Dashboard",
                  link: "/app/main/dashboard",
                },
                {
                  header: "Analytics",
                  link: "/app/main/analytics",
                },
              ]}
              //
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Manage Users"
              isHeader
              labelColor="primary"
              iconName={<UserIcon className={s.menuIcon} />}
              link="/admin"
              index="admin"
              // label="Real App"
              exact={false}
              childrenLinks={[
                {
                  header: "Profile",
                  link: "/app/profile",
                },
              ]}
            />

            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Report Management"
              isHeader
              labelColor="primary"
              iconName={<UIElementsIcon className={s.menuIcon} />}
              link="/report"
              index="report"
              exact={false}
              childrenLinks={[
                {
                  header: "Pen. Questionnaire",
                  link: "/app/report/create",
                },
              ]}
            />
          </>
        ) : (
          <>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Dashboard"
              isHeader
              iconName={<CoreIcon className={s.menuIcon} />}
              link="/app/main/dashboard"
              index="main"
            />
          </>
        )}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
