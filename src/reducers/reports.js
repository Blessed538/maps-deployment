const initialData = {
  loadingReport: false,
  reports: null,
  stateName: "",
  stateTotalScore: "",
  report: null,
  currentIndicator: "",
  reportAvailabilityMessage: "",
};

export const GET_STATE_NAME = "GET_STATE_NAME";
export const GET_STATE_TOTAL_SCORES = "GET_STATE_TOTAL_SCORES";
export const GET_CURRENT_INDICATOR = "GET_CURRENT_INDICATOR";
export const GET_REPORT = "GET_REPORT";
export default (state = initialData, { type, payload }) => {
  if (type === "REPORT_REQUEST") {
    return {
      ...state,
      reports: null,
      loadingReport: true,
    };
  }

  if (type === "REPORT_SUCCESS") {
    return {
      ...state,
      reports: payload,
      loadingReport: false,
    };
  }

  if (type === "REPORT_SUCCESS") {
    return {
      ...state,
      reportAvailabilityMessage: payload,
    };
  }

  if (type === "GET_STATE_NAME") {
    return {
      ...state,
      stateName: payload,
    };
  }
  if (type === "GET_STATE_TOTAL_SCORES") {
    return {
      ...state,
      stateTotalScore: payload,
    };
  }

  if (type === GET_REPORT) {
    console.log({ payload }, "from the report reducers");
    return {
      ...state,
      report: payload,
    };
  }
  if (type === "GET_CURRENT_INDICATOR") {
    return {
      ...state,
      currentIndicator: payload,
    };
  }

  if (type === "REPORT_FAILURE") {
    return {
      ...state,
      loadingReport: false,
    };
  }

  return state;
};
