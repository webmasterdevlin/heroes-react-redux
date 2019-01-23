import { combineReducers, createStore, applyMiddleware } from "redux";
import { heroReducer } from "./hero/hero-reducer";
import { villainReducer } from "./villain/villain-reducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  heroState: heroReducer,
  villainState: villainReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
