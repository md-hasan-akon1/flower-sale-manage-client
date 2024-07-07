import { useGetSalesQuery } from "../../redux/features/saleApi/saleApi";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TSaleData } from "../../types/Globale";
import moment from "moment";

interface DataType {
  key: React.Key;
  buyerName: string;
  quantity: number;
  saleDate: Date;
}

const SaleHistory = () => {
  const [date, setDate] = useState({});
  const { data: getSales } = useGetSalesQuery(date);

  const getSalesData = getSales?.data?.map((item: TSaleData) => ({
    key: item._id,
    buyerName: item.buyerName,
    quantity: item.quantity,
    saleDate:  moment(item.saleDate).format("MMM Do YY"),
    buyerUserName: `${
      item.buyerUserName ? item.buyerUserName : "Unknown buyer"
    }`,
    sellerName: item.sellerName,
    price: item.price,
  }));
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "buyerName",
      align: "center",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "saleDate",
      dataIndex: "saleDate",
      align: "center",
    },
    {
      title: "SellerName",
      dataIndex: "sellerName",
      align: "center",
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Buyer User Name",
      dataIndex: "buyerUserName",
      align: "center",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <div className="select-continar">
        <select
          onChange={(e) => {
            setDate({ data: e.target.value });
          }}
          className="sale-filter"
        >
          <option disabled>Filter By Date</option>
          <option value={"yearly"}>Yearly</option>
          <option value={"monthly"}>Monthly</option>
          <option value={"weekly"}>Weekly</option>
          <option value={"daily"}>Daily</option>
        </select>
        <p className="select-p">after filter data: {getSales?.data?.length}</p>
      </div>
      <Table
        columns={columns}
        dataSource={getSalesData}
        onChange={onChange}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default SaleHistory;
