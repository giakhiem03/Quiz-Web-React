import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Layout";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
