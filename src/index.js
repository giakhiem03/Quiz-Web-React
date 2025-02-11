import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Layout";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-awesome-lightbox/build/style.css";
// import i18n (needs to be bundled ;))
import i18n from "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </React.StrictMode>
        </PersistGate>
    </Provider>
);

reportWebVitals();
