import React from "react";
import { Form, Input, Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateCouponCodeMutation } from "../../redux/features/couponCodeApi/couponCode";
import { toast } from "sonner";

const CreateCouponCode = () => {
  const [form] = Form.useForm();
  const [createCouponCode, { isLoading }] = useCreateCouponCodeMutation();
  const onFinish: SubmitHandler<FieldValues> = async (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here

    try {
      toast.loading("Creating Product", { id: "product" });

      const res = await createCouponCode(values).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("create coupon successfully", {
          id: "product",
          duration: 2000,
        });
      }
      form.resetFields();
    } catch (err) {
      toast.error(" Product create fail", { id: "product", duration: 2000 });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
       
      }}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{border:'2px solid ', padding:'20px', borderRadius:'10px'}}
      ><h3 className="mb-6 text-center text-2xl">Create Coupon Code</h3>
        <Form.Item
          name="couponCode"
          rules={[
            { required: true, message: "Please input your Coupon Code!" },
          ]}
        >
          <Input placeholder="Coupon Code" />
        </Form.Item>
        <Form.Item
          name="discountNumber"
          rules={[
            { required: true, message: "Please input your Discount Number!" },
          ]}
        >
          <Input type="number" placeholder="Discount Number" />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isLoading}
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCouponCode;
