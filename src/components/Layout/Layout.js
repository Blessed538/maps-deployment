import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Footer from "../Footer/footer";
import Profile from "../../pages/profile";
// import UIButtons from "../../pages/ui-elements/buttons";
// import UIIcons from "../../pages/ui-elements/icons";
// import UITabsAccordion from "../../pages/ui-elements/tabs-accordion/";
// import UINotifications from "../../pages/ui-elements/notifications";
// import UIListGroups from "../../pages/ui-elements/list-groups";
// import FormsElements from "../../pages/forms/elements";
// import FormsValidation from "../../pages/forms/validation";
// import FormsWizard from "../../pages/forms/wizard";
// import TablesStatic from "../../pages/tables/static";
// import TablesDynamic from "../../pages/tables/dynamic";
// import MapsGoogle from "../../pages/maps/google";
// import MapsVector from "../../pages/maps/vector";
// import ExtraCalendar from "../../pages/extra/calendar";
// import ExtraInvoice from "../../pages/extra/invoice";
// import ExtraSearch from "../../pages/extra/search";
// import ExtraTimeline from "../../pages/extra/timeline";
// import ExtraGallery from "../../pages/extra/gallery";
// import Grid from "../../pages/grid";
// import Widgets from "../../pages/widgets";
// import Products from "../../pages/products";
// import Management from "../../pages/management";
// import Product from "../../pages/product";
// import Package from "../../pages/package";
// import Email from "../../pages/email";
// import CoreTypography from "../../pages/core/typography";
// import CoreColors from "../../pages/core/colors";
// import CoreGrid from "../../pages/core/grid";
// import UIAlerts from "../../pages/ui-elements/alerts";
// import UIBadge from "../../pages/ui-elements/badge";
// import UICard from "../../pages/ui-elements/card";
// import UICarousel from "../../pages/ui-elements/carousel";
// import UIJumbotron from "../../pages/ui-elements/jumbotron";
// import UIModal from "../../pages/ui-elements/modal";
// import UIProgress from "../../pages/ui-elements/progress";
// import UINavbar from "../../pages/ui-elements/navbar";
// import UINav from "../../pages/ui-elements/nav";
// import UIPopovers from "../../pages/ui-elements/popovers";
// import Charts from "../../pages/charts";
// import ApexCharts from "../../pages/charts/apex";
// import Echarts from "../../pages/charts/echarts";
// import HighCharts from "../../pages/charts/highcharts";
import DashboardAnalytics from "../../pages/analytics";
import Dashboard from "../../pages/dashboard";
// import UserFormPage from "../Users/form/UsersFormPage";
import UserListPage from "../Users/list/UsersListPage";
import UserViewPage from "../Users/view/UsersViewPage";
// import ChangePasswordFormPage from "../Users/changePassword/ChangePasswordFormPage";
import PendingSubmissionListPage from "../Statecriteria/list/PendingSubmissionListPage";
import { DashboardThemes, SidebarTypes } from "../../reducers/layout";

import Header from "../Header";
// import Sidebar from "../Sidebar";
// import Helper from '../Helper';
// import BreadcrumbHistory from "../BreadcrumbHistory";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";
// import ProductEdit from "../../pages/management/components/productEdit";
import DataSubmissionListPage from "../Statecriteria/list/DataSubmissionListPage";
import ReportersFormPage from "../Statecriteria/form/ReportersFormPage";
// import Messaging from "../../pages/messaging/Messaging";
import StatesSubmissions from "../../pages/states/statesSubmission/StatesSubmissions";
import ReportersQuestionnairePage from "../Statecriteria/form/ReportersQuestionnaireForm";
import SidebarMenu from "../Sidebar";
import EditProfile from "../Users/form/EditProfile";
import ViewReport from "../Statecriteria/list/ViewReport";
import EditReportForm from "../Statecriteria/list/EditReportForm";
class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dashboardTheme: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    dashboardTheme: DashboardThemes.DARK,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div
        className={[
          s.root,
          `dashboard-${
            localStorage.getItem("sidebarType") === SidebarTypes.TRANSPARENT
              ? "light"
              : localStorage.getItem("dashboardTheme")
          }`,
          `theme-${
            localStorage.getItem("themeColor")
              ? localStorage.getItem("themeColor").replace("#", "")
              : "333964"
          }`,
          "light-blue-dashboard",
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
          `dashboard-${this.props.dashboardTheme}`,
        ].join(" ")}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Helper /> */}
          {/* <Sidebar /> */}
          <SidebarMenu currentUserRole={currentUser.role} />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              {/* <BreadcrumbHistory url={this.props.location.pathname} /> */}
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/main/dashboard" />}
                    />
                    <Route
                      path="/app/main/dashboard"
                      exact
                      component={Dashboard}
                    />

                    <Route
                      path="/app/main/analytics"
                      exact
                      component={DashboardAnalytics}
                    />
                    <Route
                      path="/admin"
                      exact
                      render={() => <Redirect to="/admin/users" />}
                    />
                    <Route path="/admin/users" exact component={UserListPage} />
                    {/* Create user form and route */}
                    <Route
                      path="/admin/users/new"
                      exact
                      component={ReportersFormPage}
                    />
                    <Route
                      path="/admin/users/:id/edit"
                      exact
                      // component={UserFormPage}
                      component={UserViewPage}
                    />
                    <Route
                      path="/admin/users/:id"
                      exact
                      component={UserViewPage}
                    />
                    <Route
                      path="/admin/states/submissions"
                      exact
                      component={StatesSubmissions}
                    />
                    <Route path="/app/profile" exact component={Profile} />
                    <Route
                      path="/app/edit_profile"
                      exact
                      component={EditProfile}
                    />
                    <Route
                      path="/app/report/create"
                      exact
                      component={ReportersQuestionnairePage}
                    />
                    <Route
                      path="/app/report/pending"
                      exact
                      component={PendingSubmissionListPage}
                    />
                    <Route
                      path="/app/report/datasubmission"
                      exact
                      component={DataSubmissionListPage}
                    />
                    <Route
                      path="/app/report/:id"
                      exact
                      component={ViewReport}
                    />

                    <Route
                      path="/app/report/:id/edit"
                      exact
                      component={EditReportForm}
                    />

                    <Route
                      path="/app/report"
                      exact
                      component={ReportersFormPage}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <Footer />
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
    // dashboardTheme: store.navigation.dashboardTheme,
    themeColor: store.layout.themeColor,
    dashboardTheme: store.layout.dashboardTheme,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
