import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import { MainReducer } from "./Redux/Reducers/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { compose } from "redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Check if Redux DevTools Extension is available, otherwise use a regular compose function
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store with the enhanced compose function
const store = createStore(
  MainReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
