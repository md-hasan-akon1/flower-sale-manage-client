import { Button, Table, TableColumnsType } from "antd";
import {
  useGetAllUserQuery,
  useUpdateRoleMutation,
} from "../../redux/features/user/userApi";
import { TAllUser } from "../../types/Globale";
import { useAppSelector } from "../../redux/hooks";
import { TUser, getCurrenToken } from "../../redux/features/user/UserSlice";
import { verifyToken } from "../../utils/verifyToken";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const UserManagement = () => {
  const { data: userData } = useGetAllUserQuery(undefined);
  const token = useAppSelector(getCurrenToken);
  const user = verifyToken(token! as string);
  const [updateRole] = useUpdateRoleMutation();
  const data: DataType[] = userData?.data?.map((item: TAllUser) => ({
    key: item._id,
    name: item.name,
    email: item.email,
    role: item.role,
  }));

  const handelRole = async (id: string, role: string) => {
    const data = {
      id,
      role,
    };
    const res = await updateRole(data);
    console.log(res);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      key: "key",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "key",
      dataIndex: "email",
    },
    {
      title: "role",
      key: "key",
      dataIndex: "role",
    },
    {
      title: `${user&& (user as TUser).role==='Admin'?"Make Manager":''}`,
      key: "key",
      render: (item) => {
        return (
       user&&(user as TUser).role==='Admin'?   <Button 
       disabled={item.role === 'Manager'} onClick={() => handelRole(item.key, "Manager")}>
       Make Manager role
     </Button>:''
        );
      },
    },
    {
      title: "Make Seller",
      key: "key",
      render: (item) => {
        return (
          <Button disabled={item.role === 'Seller'}  onClick={() => handelRole(item.key, "Seller")}>
            Make Seller role
          </Button>
        );
      },
    },
    {
      title: "Make User",
      key: "key",
      render: (item) => {
        return (
          <Button disabled={item.role === 'User'}  onClick={() => handelRole(item.key, "User")}>
            Make user role
          </Button>
        );
      },
    },
  ];

  //       for (let i = 0; i < 100; i++) {
  //         data.push({

  //         });
  //       }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default UserManagement;
