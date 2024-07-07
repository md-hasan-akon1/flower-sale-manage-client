import { Button, Table, TableColumnsType } from "antd";
import { TUser, getCurrenUser } from "../../redux/features/user/UserSlice";
import { useGetMeQuery, useGetMemberMutation } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { TAllUser } from "../../types/Globale";
interface DataType {
  key: React.Key;
  name: string;
  role: string;
  username:string;
  isMember:boolean;
  email: string;
}
const GetMemberShip = () => {
  const user = useAppSelector(getCurrenUser);

  const username = user?.username;
  const { data: currentUser } = useGetMeQuery(username, { skip: !username });
  const [memberShip]=useGetMemberMutation()
  
  const handleMemberShip=(data:string)=>{
     memberShip({username:data})
}
  const getSalesData = [
    {
      key: currentUser?.data?._id,
      name: currentUser?.data?.name,
      role: currentUser?.data?.role,
      email: currentUser?.data?.email,
      username: currentUser?.data?.username,
      isMember:currentUser?.data?.isMember
    },
  ];

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

export default GetMemberShip;
