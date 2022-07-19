import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

let middleware = [];
if (process.env.NODE_ENV === "development") {
    middleware = [...middleware, thunkMiddleware, loggerMiddleware];
} else {
    middleware = [...middleware, thunkMiddleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
