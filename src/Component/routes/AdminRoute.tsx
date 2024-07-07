import GetMemberShip from "../Pages/User/GetMemberShip";
import UserManagement from "../Pages/UserManagement/UserManagement";
import CreateProduct from "../Pages/createProduct/CreateProduct";
import GetFlower from "../Pages/getFlower/GetFlower";
import BuyHistory from "../Pages/sale/BuyHistory";
import Duplicate from "../Pages/updateFlower/Duplicate";
import UpdateFlower from "../Pages/updateFlower/UpdateFlower";
import { TUserPath } from "../types";
import PrivetRoute from "./PrivetRoute";

export const AdminPath: TUserPath[] = [
        {
          name: "User Management",
          children: [
            {
              name: "User",
              path: "",
              element: <PrivetRoute role="Admin"><UserManagement></UserManagement></PrivetRoute>,
            },
          
            {
              name: "Get MemberShip",
              path: "get-memberShip",
              element: <PrivetRoute role="Admin"> <GetMemberShip></GetMemberShip></PrivetRoute>,
            },
          ],
        },
        {
          name: "Buy History  Manage",
          children: [
            {
              name: "Buy history",
              path: "buy-history",
              element: <PrivetRoute role="Admin"><BuyHistory></BuyHistory></PrivetRoute>, 
            },
          ],
        },
      ];