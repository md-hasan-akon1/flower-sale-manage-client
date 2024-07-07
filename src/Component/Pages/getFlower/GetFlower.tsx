import { SearchOutlined } from "@ant-design/icons";
import React, { Key, useRef, useState } from "react";

import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { FaRegEdit } from "react-icons/fa";
import { GrDuplicate } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import {
  useDeleteFlowerMutation,
  useGetFlowerQuery,
} from "../../redux/features/flower/flowerApi";
import { TFlowerProduct } from "../../types/ProductType";
import Sale from "../sale/Sale";
import { useAppSelector } from "../../redux/hooks";
import { getCurrenToken, TUser } from "../../redux/features/user/UserSlice";
import { verifyToken } from "../../utils/verifyToken";
import moment from "moment";
type InputRef = GetRef<typeof Input>;

interface DataType {
  arrangementStyle: string;
  bloomDate: Date;
  color: [string];
  fragrance: string;
  occasion: string;
  price: number;
  quantity: number;
  productName: string;
  size: string;
  type: string;
  key: string;
}

type DataIndex = keyof DataType;

const GetFlower = () => {
  const token = useAppSelector(getCurrenToken);

  const user = verifyToken(token! as string);
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [id, setId] = useState("");
  const selectedId: string[] = [];
  const { data: flower, isLoading, isError } = useGetFlowerQuery(undefined);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const flowerData = flower?.data?.map((item: TFlowerProduct) => {
    return {
      arrangementStyle: item.arrangementStyle,
      bloomDate: moment(item.bloomDate).format("MMM Do YY"),
      color: item.color,
      fragrance: item.fragrance,
      occasion: item.occasion,
      price: item.price,
      productName: item.productName,
      quantity: item.quantity,
      size: item.size,
      type: item.type,
      key: item._id,
    };
  });
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "productName",
      dataIndex: "productName",
      key: "productName",
      ...getColumnSearchProps("productName"),
    },
    {
      title: "arrangementStyle",
      dataIndex: "arrangementStyle",
      key: "arrangementStyle",
      ...getColumnSearchProps("arrangementStyle"),
    },
    {
      title: "bloomDate",
      dataIndex: "bloomDate",
      key: "bloomDate",
      ...getColumnSearchProps("bloomDate"),
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      ...getColumnSearchProps("color"),
    },
    {
      title: "fragrance",
      dataIndex: "fragrance",
      key: "fragrance",
      ...getColumnSearchProps("fragrance"),
    },
    {
      title: "occasion",
      dataIndex: "occasion",
      key: "occasion",
      ...getColumnSearchProps("occasion"),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },

    {
      title: "size",
      dataIndex: "size",
      key: "size",
      ...getColumnSearchProps("size"),
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: `${user && (user as TUser)?.role === "Manager" ? "Update" : ""}`,
      key: "update",
      fixed: "right",
      render: (record) =>
        user && (user as TUser)?.role === "Manager" ? (
          <Button style={{ background: "goldenRod", margin: "0", gap: "0" }}>
            <NavLink to={`/Manager/update/${record?.key}`}>
              <FaRegEdit />
            </NavLink>
          </Button>
        ) : (
          ""
        ),
    },
    {
      title: `${
        user && (user as TUser)?.role === "Manager" ? "Duplicate" : ""
      }`,
      key: "key",
      fixed: "right",
      render: (record) =>
        user && (user as TUser)?.role === "Manager" ? (
          <Button style={{ background: "goldenRod", margin: "0", gap: "0" }}>
            <NavLink to={`/${(user as TUser)?.role}/duplicate/${record?.key}`}>
              <GrDuplicate />
            </NavLink>
          </Button>
        ) : (
          ""
        ),
    },
    {
      title: `${user && (user as TUser)?.role === "Seller" ? "Sell" : ""}`,
      key: "key",
      fixed: "right",
      render: (text, record) =>
        user && (user as TUser).role === "Seller" ? (
          <Button
            onClick={() => {
              setOpen(true);
              setId(record?.key);
            }}
            style={{ background: "goldenRod", margin: "0", gap: "0" }}
          >
            sale
          </Button>
        ) : (
          ""
        ),
    },
   
  ];
  const [deleteFlower, { isLoading: deleteLoading }] =
    useDeleteFlowerMutation();
  const handelDelete = async (selectedRowKeys: Key[]) => {
    const res = await deleteFlower(selectedRowKeys);

    console.log(res);
  };
  return (
    <div>
      {(user as TUser).role === "Manager" ||
      (user as TUser).role === "Admin" ? (
        <Button
          disabled={deleteLoading}
          onClick={() => handelDelete(selectedRowKeys)}
        >
          Delete
        </Button>
      ) : (
        ""
      )}
      <Sale open={open} setOpen={setOpen} id={id}></Sale>
      <Table
        columns={columns}
        scroll={{ x: true }}
        dataSource={flowerData}
        pagination={{ pageSize: 6 }}
        rowSelection={rowSelection}
        rowKey={flowerData?.key}
      />
    </div>
  );
};

export default GetFlower;
