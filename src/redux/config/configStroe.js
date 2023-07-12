import { createStore } from "redux";
import { combineReducers } from "redux";
// import todos from "../modules/todos";

// store 만들기
// 중앙 데이터 관리소
const rootReducer = combineReducers({});
const store = createStore(rootReducer);

export default store;
