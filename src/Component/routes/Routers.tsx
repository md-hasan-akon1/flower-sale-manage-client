import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import { routeGenerator } from "../utils/routesGenerator";
import { SellerPath } from "./Seller.routes";
import { ManagerPath } from "./ManagerRoute";
import { AdminPath } from "./AdminRoute";
import { userPath } from "./UserRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

  },
  {
    path: "/Manager",
    element: <App></App>,
    children: routeGenerator(ManagerPath),
  },
  {
    path: "/Seller",
    element: <App></App>,
    children: routeGenerator(SellerPath),
  },
  {
    path: "/Admin",
    element: <App></App>,
    children: routeGenerator(AdminPath),
  },
  {
    path: "/User",
    element: <App></App>,
    children: routeGenerator(userPath),
  },

  {
    path: "registration",
    element: <Registration></Registration>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);
export default router;
