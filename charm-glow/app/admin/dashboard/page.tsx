"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import { fetchAnalyticsAsync } from "@/store/action/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import CountUp from "react-countup";


const formatter = (value: number) => <CountUp end={value} separator="," />;
const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { analytics } = useAppSelector(state => state.dashboardAdmin);
    React.useEffect(() => {
        dispatch(fetchAnalyticsAsync())
    }, [dispatch])
    return (<Row gutter={16} style={{ paddingTop: "20px" }}>
        <Col span={8}>
            <Card bordered={false}>
                <UserOutlined style={{ fontSize: 30 }} />
                <Statistic title="Users" value={analytics.customerCount} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false}>
                <Image alt="Orders_icon" src="/purchase-order.png" width={30} height={30} />
                <Statistic title="Orders" value={25} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false}>
                <Image alt="Orders_icon" src="/box.png" width={30} height={30} />
                <Statistic title="Products" value={analytics.productCount} />
            </Card>
        </Col>
    </Row>)
};

export default withAdminAuth(DashboardPage);
