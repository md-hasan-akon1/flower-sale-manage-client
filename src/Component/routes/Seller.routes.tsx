import GetMemberShip from "../Pages/User/GetMemberShip";
import MemberShipBySeller from "../Pages/User/MemberShipBySeller";
import CreateProduct from "../Pages/createProduct/CreateProduct";
import GetFlower from "../Pages/getFlower/GetFlower";
import BuyHistory from "../Pages/sale/BuyHistory";
import Sale from "../Pages/sale/Sale";
import SaleHistory from "../Pages/sale/SaleHistory";
import Duplicate from "../Pages/updateFlower/Duplicate";
import UpdateFlower from "../Pages/updateFlower/UpdateFlower";
import { TUserPath } from "../types";
import PrivetRoute from "./PrivetRoute";

export const SellerPath:TUserPath[] = [
  {
    name: "Flower Manage",
    children: [
      
      {
        name: "All Flowers",
        path: "",
        element:  <PrivetRoute role="Seller"> <GetFlower></GetFlower></PrivetRoute>,
      },
      // {
       
      //   path: "update/:id",
      //   element: <UpdateFlower></UpdateFlower>,
      // },
      // {
      
      //   path: "duplicate/:id",
      //   element: <Duplicate></Duplicate>,
      // },
    ],
  },
  {
    name: "Sale History  Manage",
    children: [
      {
        name: "sale History",
        path: "sale-history",
        element:  <PrivetRoute role="Seller">  <SaleHistory></SaleHistory>,</PrivetRoute>,
      },
    ],
  },
  {
    name: "Buy History  Manage",
    children: [
      {
        name: "Buy history",
        path: "buy-history",
        element: <PrivetRoute role="Seller"><BuyHistory></BuyHistory>,</PrivetRoute>, 
      },
    ],
  },
  {
    name: "Get MemberShip",
    path: "get-memberShip",
    element: <PrivetRoute role="Seller"> <GetMemberShip></GetMemberShip></PrivetRoute>,
  },
  {
    name: "MemberShip By seller",
    path: "memberShip-by-seller",
    element: <PrivetRoute role="Seller">  <MemberShipBySeller></MemberShipBySeller></PrivetRoute>,
  },
];
