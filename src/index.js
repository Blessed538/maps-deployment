import React from "react";
import ReactDOM from "react-dom/client";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import App from "./components/App";
import config from "./config";
import createRootReducer from "./reducers";
import { doInit } from "./actions/auth";
import { createHashHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";

const history = createHashHistory();

export function getHistory() {
  return history;
}

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const persistConfig = {
  key: "root",
  storage,
  // stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(routerMiddleware(history), ReduxThunk))
);

const persistor = persistStore(store);

store.dispatch(doInit());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
