'use client'
import Image from 'next/image'
import React from 'react'
import type { FormProps } from 'antd';
import { Card, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/features/reducer/auth/authSlice';
import { useRouter } from 'next/navigation';
type Props = {}

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function Login({ }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      await dispatch(login({ email, password }));
      router.push('/main/home');
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
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
              <h4 className='font-bold mb-4 text-4xl'>Welcome Back</h4>
              <h5 className='text-lg mb-10'>Please login below</h5>
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
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
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