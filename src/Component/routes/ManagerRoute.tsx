import GetMemberShip from "../Pages/User/GetMemberShip";
import UserManagement from "../Pages/UserManagement/UserManagement";
import AllCouponCode from "../Pages/couponCode/AllCouponCode";
import CreateCouponCode from "../Pages/couponCode/CreateCouponCode";
import CreateProduct from "../Pages/createProduct/CreateProduct";
import GetFlower from "../Pages/getFlower/GetFlower";
import BuyHistory from "../Pages/sale/BuyHistory";
import Duplicate from "../Pages/updateFlower/Duplicate";
import UpdateFlower from "../Pages/updateFlower/UpdateFlower";
import { TUserPath } from "../types";
import PrivetRoute from "./PrivetRoute";

export const ManagerPath: TUserPath[] = [
  {
    name: "Flower Manage",
    children: [
      {
        name: "Create Product",
        path: "",
        element: <PrivetRoute role="Manager"><CreateProduct></CreateProduct></PrivetRoute>,
      },
      {
        name: "All Flowers",
        path: "all-flowers",
        element:<PrivetRoute role="Manager"><GetFlower></GetFlower></PrivetRoute> ,
      },
      {
        path: "update/:id",
        element: <PrivetRoute role="Manager"><UpdateFlower></UpdateFlower></PrivetRoute>,
      },
      {
        path: "duplicate/:id",
        element: <PrivetRoute role="Manager"><Duplicate></Duplicate></PrivetRoute>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "User",
        path: "user-management",
        element: <PrivetRoute role="Manager"><UserManagement></UserManagement></PrivetRoute>,
      },
      {
        name: "Get MemberShip",
        path: "get-memberShip",
        element:  <PrivetRoute role="Manager"> <GetMemberShip></GetMemberShip></PrivetRoute>,
      },
     
    ],
  },
  {
    name: "Coupon Code Management",
    children: [
    
      {
        name: "Create Coupon Code",
        path: "create-coupon-code",
        element: <PrivetRoute role="Manager"><CreateCouponCode></CreateCouponCode></PrivetRoute>,
      },
      {
        name: " Coupon Code",
        path: "coupon-code",
        element: <PrivetRoute role="Manager"><AllCouponCode></AllCouponCode></PrivetRoute>,
      },
    
     
    ], 
  },
  {
    name: "Buy History  Manage",
    children: [
      {
        name: "Buy history",
        path: "buy-history",
        element: <PrivetRoute role="Manager"> <BuyHistory></BuyHistory>,</PrivetRoute>, 
      },
    ],
  },
];
