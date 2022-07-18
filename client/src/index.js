import React from "react";
import ReactDOM from "react-dom";

/* Routes */
import Layout from "./Layout";

/* Redux Store */
import { Provider } from "react-redux";
import store from "./State/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
