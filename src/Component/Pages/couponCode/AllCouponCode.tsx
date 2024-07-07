import { Row, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllCouponCodeQuery } from "../../redux/features/couponCodeApi/couponCode";
interface DataType {
  key: React.Key;
  couponCode: string;

  discountNumber: number;
}
export type TCoupon = {
  _id: string;
  discountNumber: string;
  couponCode: string;
};
const AllCouponCode = () => {
  const { data: couponData } = useGetAllCouponCodeQuery(undefined);
  console.log(couponData);

  const data: DataType[] = couponData?.data?.map((item: TCoupon) => {
    return {
      key: item._id,
      discountNumber: `${item.discountNumber} %`,
      couponCode: item.couponCode,
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "couponCode",
      key: "key",
      dataIndex: "couponCode",
      align: "center",
    },
    {
      title: "discountNumber",
      key: "key",
      dataIndex: `discountNumber`,
      align: "center",
    },
  ];

  return (
    <div style={{}}>
      <Table
        style={{ justifyContent: "center"  }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default AllCouponCode;
