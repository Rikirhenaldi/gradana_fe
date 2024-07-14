'use client'
import Image from 'next/image'
import React from 'react'
import type { FormProps } from 'antd';
import { Card, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { register } from '@/features/reducer/auth/authSlice';
import { useRouter } from 'next/navigation';

type Props = {}

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
  name: string;
  phone: string;
};

export default function Signup({ }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password, name, phone } = values;
    try {
      await dispatch(register({ name, email, password, phone, navigation: router }));
      // router.push('/auth/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error, e.g., show error message
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className='h-screen bg-white'>
      <div className='flex flex-row'>
        <div className="w-full flex p-10 justify-center items-start">
          <Card style={{ width: "40%" }} className='shadow-sm shadow-slate-400 py-10'>
            <div className='text-center'>
              <h4 className='font-bold mb-4 text-4xl'>Welcome to Job portal</h4>
              <h5 className='text-lg mb-10'>Please register account below</h5>
            </div>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^\d+$/, message: 'Please enter only numbers!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one number, and be at least 8 characters long.',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className='py-4 px-10'>
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </Card>
        </div>
      </div>
    </main>
  )
}
