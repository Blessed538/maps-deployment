import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_SIDEBAR_POSITION,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  CHANGE_ACTIVE_SIDEBAR_ITEM,
} from "../actions/navigation";

const initialState = {
  sidebarOpened: false,
  activeItem: window.location.pathname,
  sidebarPosition: "left",
  sidebarVisibility: "show",
  dashboardTheme: "default",
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
  

    default:
      return state;
  }
}
