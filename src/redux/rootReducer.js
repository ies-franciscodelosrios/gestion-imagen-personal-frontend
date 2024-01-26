// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import auth from "./authentication";
import clients from "@src/views/apps/client/store";
import users from "@src/views/apps/student/store";
import profesor from "@src/views/apps/profesor/store";
import calendar from "@src/views/apps/calendar/store";
import ecommerce from "@src/views/apps/ecommerce/store";

const rootReducer = {
  auth,
  clients,
  users,
  profesor,
  navbar,
  layout,
  calendar,
  ecommerce,
};

export default rootReducer;
