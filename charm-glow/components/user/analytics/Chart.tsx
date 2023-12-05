"use client"
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Statistic, Card } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getOrderAnalyticsAsync } from '@/store/action/auth/authSlice';
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
const { Title } = Typography;
const Chart = () => {
    const { OrderAnalytics } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getOrderAnalyticsAsync())
    }, [dispatch])
    let total = OrderAnalytics.reduce((acc, monthData) => ({
        totalOrders: acc.totalOrders + monthData.totalOrders,
        totalSpend: acc.totalSpend + monthData.totalSpend,
    }), { totalOrders: 0, totalSpend: 0 });
    return <div className='h-[40vh] w-full my-4'>
        <Title level={3} italic className='uppercase mx-4'>Order Analytics</Title>
        <Card bordered={false} className='m-4 bg-blue-100'>
            <Statistic
                title="Total Orders"
                value={total.totalOrders}
                // precision={2}
                valueStyle={{ color: '#876553' }}
                prefix={<MdOutlineShoppingCart />}
            // suffix=""
            />
        </Card>
        <Card bordered={false} className='m-4 bg-lime-100'>
            <Statistic
                title="Total Spent"
                value={total.totalSpend}
                precision={2}
                valueStyle={{ color: '#876553' }}
                prefix={<BsCurrencyDollar />}
            // suffix=""
            />
        </Card>
        <ResponsiveContainer width="100%" height="100%">

            <BarChart
                width={500}
                height={300}
                data={OrderAnalytics}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalOrders" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="totalSpend" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    </div>;
};

export default Chart;
