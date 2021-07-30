import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import search from "./search";
import user_requests from "./user_requests";
import peer_requests from "./peer_requests";

export default combineReducers({
  alert,
  auth,
  profile,
  search,
  user_requests,
  peer_requests,
});
