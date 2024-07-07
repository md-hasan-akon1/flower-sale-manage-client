import React, { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./updateflower.css";
import { useParams } from "react-router-dom";
import {
  useGetSingleFlowerQuery,
  useUpdateFlowerMutation,
} from "../../redux/features/flower/flowerApi";
import { toast } from "sonner";

interface FlowerData {
  productName: string;
  price: string;
  quantity: number;
  bloomDate: string;
  color: string;
  type: string;
  size: string;
  fragrance: string;
  arrangementStyle: string;
  occasion: string;
}
const UpdateFlower = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetSingleFlowerQuery(id);
  const [updateFlower, { data: updateData, isLoading }] =
    useUpdateFlowerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: data?.data });
  useEffect(() => {
    if (data && data.data) {
      // Set default values once data is available
      Object.entries(data.data).forEach(([key, value]) => {
        setValue(key as keyof FlowerData, value);
      });
    }
  }, [data, setValue]);

  const onSubmit = (data: ReactNode) => {
    toast.loading("Creating Product", { id: "product" });
    try {
      updateFlower({ data: data, id });
      reset();
      toast.success("Created Product successfully", { id: "product" });
    } catch (err) {
      toast.error("Created Product failed", { id: "product" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: " calc(100vh - 150px)",
        padding: "17px",
        width: "100%",
      }}
    >
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="containar">
          <div className="input-dev">
            <label htmlFor="ProductName">Product Name</label>
            <br />
            <input className="input" type="text" {...register("productName")} />
          </div>
          <div className="input-dev">
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="text" {...register("price")} />
          </div>
        </div>
        <div className="containar">
          <div className="input-dev">
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input type="number" className="input" {...register("quantity")} />
            {errors.quantity && <span>{"quantity  is required"}</span>}
          </div>
          <div className="input-dev">
            <label htmlFor="bloomDate">Bloom Date</label>
            <br />
            <input type="date" className="input" {...register("bloomDate")} />
            {errors.bloomDate && <span>{"bloomDate is required"}</span>}
          </div>
        </div>
        <div className="containar">
          <div className="input-dev">
            <label htmlFor="color">Color</label>
            <br />
            <input type="text" className="input" {...register("color")} />
            {errors.color && <span>{"color is required"}</span>}
          </div>
          <div className="input-dev">
            <label htmlFor="type"> Type</label>
            <br />
            <input type="text" className="input" {...register("type")} />
            {errors.type && <span>{"type is required"}</span>}
          </div>
        </div>
        <div className="containar">
          <div className="input-dev">
            <label htmlFor="size">Size</label>
            <br />
            <input type="text" className="input" {...register("size")} />
            {errors.size && <span>{"size  is required"}</span>}
          </div>
          <div className="input-dev">
            <label htmlFor="fragrance">Fragrance</label>
            <br />
            <input className="input" type="text" {...register("fragrance")} />
            {errors.fragrance && <span>{"fragrance is required"}</span>}
          </div>
        </div>
        <div className="containar">
          <div className="input-dev">
            <label htmlFor="arrangementStyle">Arrangement Style</label>
            <br />
            <input
              className="input"
              type="text"
              {...register("arrangementStyle")}
            />
            {errors.ProductName && (
              <span>{"arrangementStyle is required"}</span>
            )}
          </div>
          <div className="input-dev">
            <label htmlFor="occasion">Occasion</label>
            <br />
            <input className="input" type="text" {...register("occasion")} />
            {errors.occasion && <span>{"0ccasion is required"}</span>}
          </div>
        </div>

        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default UpdateFlower;
