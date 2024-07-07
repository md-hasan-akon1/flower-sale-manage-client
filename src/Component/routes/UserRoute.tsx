
import GetMemberShip from "../Pages/User/GetMemberShip";
import BuyHistory from "../Pages/sale/BuyHistory";
import SaleHistory from "../Pages/sale/SaleHistory";
import { TUserPath } from "../types";
import PrivetRoute from "./PrivetRoute";

export const userPath:TUserPath[] = [
  {
    name: "User Management",
    children: [
      
      {
        name: "Get MemberShip",
        path: "get-memberShip",
        element:  <PrivetRoute role="User"> <GetMemberShip></GetMemberShip></PrivetRoute>,
      },
    ],
  },
 
  {
    name: "Buy History  Manage",
    children: [
      {
        name: "Buy history",
        path: "buy-history",
        element: <PrivetRoute role="User"> <BuyHistory></BuyHistory></PrivetRoute>,
      },
    ],
  },
];
