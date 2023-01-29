import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { DataType } from './DataComponent';
const { Option } = Select;

type FormProps = {
    onSubmit: (val:DataType) => void
}

const FormComponent: React.FC<FormProps> = ({onSubmit}) => {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        onSubmit(values);
        form.resetFields();
    };
    
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return(
        <Form
            name="createUser"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select
                placeholder="Selectionner le role"
                allowClear
                >
                <Option value="guest">Guest</Option>
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    )
};

export default FormComponent;