import { Button, Table, TableColumnsType } from "antd";
import {
  useGetAllUserWithAdminQuery,
  useGetMemberMutation,
} from "../../redux/features/user/userApi";
import { TAllUser } from "../../types/Globale";
import { toast } from "sonner";
interface DataType {
  key: React.Key;
  name: string;
  role: string;
  username: string;
  isMember: boolean;
  email: string;
}
const MemberShipBySeller = () => {
  const { data: userData } = useGetAllUserWithAdminQuery(undefined);
  const [memberShip] = useGetMemberMutation();
  const getSalesData = userData?.data?.map((item: TAllUser) => {
    return {
      key: item._id,
      name: item.name,
      role: item.role,
      email: item.email,
      username: item.username,
      isMember: item.isMember,
    };
  });
  const handleMemberShip = async(data: string) => {
    try{
      toast.loading("Loading.....",{id:'product', duration:5000});
    
      const res=await memberShip({ username: data }).unwrap();
     
     if(res.success){
          toast.success("This user got 200 points",{id:'product',duration:2000});
     }
     
}catch(err){ toast.error(" member request failed",{id:'product'});}
 
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      key:'key',
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Role",
      key:'key',
      dataIndex: "role",
      align: "center",
    },
    {
      title: "Email",
      key:'key',
      dataIndex: "email",
      align: "center",
    },
    {
      title: "User Name",
      key:'key',
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Action",
      render:(item)=>{return <>{item.isMember?"Now You Are Member":<><Button disabled={item.isMember} onClick={()=>handleMemberShip(item.username)}>Get MemberShip</Button></>}</>},
      align: "center",
    },
  ];
  return (
    <div>
     <Table
        columns={columns}
        dataSource={getSalesData}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default MemberShipBySeller;
