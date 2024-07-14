'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUserData } from '@/features/reducer/user/userSlice';
import { Card, List } from 'antd';
import { UserOutlined, DollarOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state?.users?.userData);
  const userBalance = useSelector((state: RootState) => state?.users?.balance);
  const topUpHistoryList = useSelector((state: RootState) => state?.users?.topUpHistory);
  const status = useSelector((state: RootState) => state?.users?.status);
  const error = useSelector((state: RootState) => state?.users?.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className='min-h-screen'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='min-h-screen'>Error: {error}</div>;
  }

  console.log("tets >>>>", status, error, userData)

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <section className="min-h-screen w-full bg-white pb-10 px-10 pt-10 rounded-md">
        <div className='text-lg mb-4'>Halo, Selamat Datang, {userData?.name}</div>
        {userData && (
          <Card
            bordered={true}
            style={{ width: 300, borderWidth: 2, marginBottom: 10}}
          >
            <p className='mb-2'><UserOutlined /> Name: {userData?.name}</p>
            <p className='mb-2'><PhoneOutlined /> Phone: {userData?.phone}</p>
            <p className='mb-2'><MailOutlined /> Email: {userData?.email}</p>
            <p className='mb-2'><DollarOutlined /> Balance: {userBalance?.amount}</p>
          </Card>
        )}
        { topUpHistoryList &&
          <List
            header={<div>Top-Up History</div>}
            bordered
            dataSource={topUpHistoryList}
            renderItem={(item) => (
              <List.Item>
                <div>Amount: {item?.amount}</div>
                <div>Date: {new Date(item?.date).toLocaleString()}</div>
              </List.Item>
            )}
          />}
      </section>
    </main>
  );
};

export default Home;
