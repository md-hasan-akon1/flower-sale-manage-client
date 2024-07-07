import { Form, Input, InputNumber, Button, DatePicker, Col, Row } from "antd";
import { Store } from "antd/lib/form/interface";
import { useCreateProductMutation } from "../../redux/features/flower/flowerApi";
import { toast } from "sonner";
import { ReactNode } from "react";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [createProduct, { data, error }] = useCreateProductMutation();
  const onFinish = async (values: Store) => {
  try{
        toast.loading("Creating Product",{id:'product'});
      
       const res= await createProduct(values).unwrap()
       
       if(res.success){
            toast.success("Created Product successfully",{id:'product',duration:2});
       }
        form.resetFields();
  }catch(err){ toast.error(" Product create fail",{id:'product'});}
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: " calc(100vh - 150px)",
        padding:'17px'
      }}
    >
      <Form
        form={form}
        name="productForm"
        onFinish={onFinish}
        labelCol={{ span: 24 }} 
        wrapperCol={{ span: 24 }} 
        style={{ maxWidth: "700px", paddingLeft:'25px'}}
      >
        <Row gutter={16} >
          {/* First row */}
          <Col span={10}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please enter the product name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter the price!" },
                {
                  type: "number",
                  min: 0,
                  message: "Price must be a positive number!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Second row */}
          <Col span={10}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please enter the quantity!" },
                {
                  type: "number",
                  min: 0,
                  message: "Quantity must be a positive number!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Bloom Date"
              name="bloomDate"
              rules={[
                { required: true, message: "Please select the bloom date!" },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Third row */}
          <Col span={10}>
            <Form.Item
              label="Color"
              name="color"
              rules={[
                { required: true, message: "Please enter at least one color!" },
              ]}
            >
              <Input placeholder="Enter colors separated by commas" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please enter the type!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Fourth row */}
          <Col span={10}>
            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: "Please enter the size!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Fragrance"
              name="fragrance"
              rules={[
                { required: true, message: "Please enter the fragrance!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Fifth row */}
          <Col span={10}>
            <Form.Item
              label="Arrangement Style"
              name="arrangementStyle"
              rules={[
                {
                  required: true,
                  message: "Please enter the arrangement style!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Occasion"
              name="occasion"
              rules={[
                { required: true, message: "Please enter the occasion!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item >
          <Button
          
            className="login-form-button"
            htmlType="submit"
            style={{ width: '83%', marginTop: 5, display: 'flex', justifyContent: 'center' }}
            
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
