import React, { ReactNode, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./updateflower.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetSingleFlowerQuery,
  useUpdateFlowerMutation,
} from "../../redux/features/flower/flowerApi";
import { toast } from "sonner";
import { TUser, getCurrenUser } from "../../redux/features/user/UserSlice";
import { useAppSelector } from "../../redux/hooks";

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

const Duplicate = () => {
  const { id } = useParams();
  const { data: flowerData, isFetching, isError } = useGetSingleFlowerQuery(id);
  const user = useAppSelector(getCurrenUser);
  const navigate = useNavigate();
  const flower: FlowerData = {
    arrangementStyle: flowerData?.data.arrangementStyle,
    bloomDate: flowerData?.data.bloomDate,
    color: flowerData?.data.color,
    fragrance: flowerData?.data.fragrance,
    occasion: flowerData?.data.occasion,
    price: flowerData?.data.price,
    productName: flowerData?.data.productName,
    quantity: flowerData?.data.quantity,
    size: flowerData?.data.size,
    type: flowerData?.data.type,
  };


  const [duplicateProduct, { data: updateData, isLoading }] =
    useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: flower });
  useEffect(() => {
    if (flower && flower) {
      // Set default values once data is available
      Object.entries(flower).forEach(([key, value]) => {
        setValue(key as keyof FlowerData, value);
      });
    }
  }, [flower, setValue]);


  const onSubmit:SubmitHandler<FieldValues>= async (data) => {
    console.log(data)
    toast.loading("Creating Product", { id: "product" });
    try {
      toast.loading("Creating Product", { id: "product" });
      console.log(data);
      const res = await duplicateProduct(data).unwrap();

      if (res.success) {
        toast.loading("Created Product successfully", {
          id: "product",
          duration: 2000,
        });
        navigate(`/${(user as TUser)?.role}/all-flowers`)
      }
      reset();
    } catch (err) {
      toast.error(" Product create fail", { id: "product", duration: 3000 });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
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
        <form  className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="containar">
            <div className="input-dev">
              <label htmlFor="productName">Product Name</label>
              <br />
              <input
                className="input"
                type="text"
                {...register("productName")}
              />
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
              <input
                type="number"
                className="input"
                {...register("quantity")}
              />
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
              {errors.productName && (
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
    </div>
  );
};

export default Duplicate;
