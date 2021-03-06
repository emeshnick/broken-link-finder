import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import data from "./data.js";

const reducer = combineReducers({ data });
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
      predicate: () => process.env.NODE_ENV !== "production",
    })
  )
);
const store = createStore(reducer, middleware);

export default store;
