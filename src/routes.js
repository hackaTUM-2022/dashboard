import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Login from "views/Login.js";


var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    component: UserProfile,
    layout: "/admin"
  },

  {
    path: "/login",
    name: "Login",
    rtlName: "Login",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin"
  },
];
export default routes;
