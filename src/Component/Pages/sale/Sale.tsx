import React, { ReactNode, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import "./sale.css";
import { useCreateSaleMutation } from "../../redux/features/saleApi/saleApi";
import { useAppSelector } from "../../redux/hooks";
import { TUser, getCurrenUser } from "../../redux/features/user/UserSlice";
import { TAllUser, TQueryParam } from "../../types/Globale";
import { useGetSingleFlowerQuery } from "../../redux/features/flower/flowerApi";
import { useGetSingleCouponCodeQuery } from "../../redux/features/couponCodeApi/couponCode";
const Sale = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: any;
  id: string;
}) => {
  const [createSale, { isLoading }] = useCreateSaleMutation();
  const { data: singleFlower } = useGetSingleFlowerQuery(id);
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const [param, setParam] = useState<TQueryParam[] | undefined>(undefined);
  const user = useAppSelector(getCurrenUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const saleData = {
      productId: id,
      buyerName: data.buyerName,
      quantity: data.quantity,
      saleDate: data.saleDate,
      sellerName: user!.name,
      sellerRole: user!.role,
      couponCode: couponCode || data.couponCode || "",
      buyerUserName: data.buyerUserName,
      price: Number(singleFlower?.data?.price) * Number(data.quantity),
      usePoint:data.usePoint
    };
console.log(data,saleData)
    toast.loading("Creating .....", { id: "product" });
    try {
      const res = await createSale(saleData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Created sale successfully", {
          id: "product",
          duration: 2000,
        });
        setOpen(false);
      }
      reset();
    } catch (err) {
      setOpen(false);
      toast.error("Created  failed", { id: "product", duration: 2000 });
    }
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
      >
        <h3
          className="text-3xl"
          style={{ textAlign: "center", color: "goldenrod" }}
        >
          Product Sale
        </h3>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-dev">
            <label htmlFor="buyer Name">Buyer Name</label>
            <br />
            <input
              className="input"
              type="text"
              {...register("buyerName", { required: true })}
            />
            {errors.buyerName && <p>This field is required</p>}
          </div>

          <div className="input-dev">
            <label htmlFor="saleDate">Sale Date</label>
            <br />
            <input
              className="input"
              type="date"
              {...register("saleDate", { required: true })}
            />
            {errors.saleDate && <p>This field is required</p>}
          </div>

          <div className="input-dev">
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
              type="number"
              className="input"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && <span>{"quantity is required"}</span>}
          </div>
          <div className="input-dev">
            <label htmlFor="Coupon Code">
              Coupon Code
              <small className="text-gray-300"> *optional</small>{" "}
            </label>
            <br />
            <input
              className="input"
              type="text"
              onChange={(e) => {
                setCouponCode(e.target.value), register("couponCode");
              }}
            />
            <p>{message}</p>
          </div>
          <div className="input-dev">
            <label htmlFor="buyer User Name">
              Buyer User Name{" "}
              <small className="text-gray-300"> *optional</small>{" "}
            </label>
            <br />
            <input
              className="input"
              type="text"
              {...register("buyerUserName")}
            />
          </div>
          <div className="input-dev flex gap-5 mt-4">
            <label className="whitespace-nowrap" htmlFor="Use Point">
              use point <small className="text-gray-300"> *optional</small>
            </label>

            <input
              className="flex  justify-start items-start w-4  "
              type="checkbox"
              {...register("usePoint")}
            />
          </div>
          <input type="submit" className="submit-btn" />
        </form>
      </Modal>
    </div>
  );
};

export default Sale;
