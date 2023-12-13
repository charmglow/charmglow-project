"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import { fetchAnalyticsAsync } from "@/store/action/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import Image from "next/image";
import React from "react";

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { analytics } = useAppSelector(state => state.dashboardAdmin);
    React.useEffect(() => {
        dispatch(fetchAnalyticsAsync())
    }, [dispatch])
    return (<Row gutter={16} style={{ paddingTop: "20px" }}>
        <Col span={8}>
            <Card bordered={false} className="bg-pink-200">
                <UserOutlined style={{ fontSize: 30 }} />
                <Statistic title="Users" value={analytics.customerCount} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false} className="bg-orange-200">
                <Image alt="Orders_icon" src="/purchase-order.png" width={30} height={30} />
                <Statistic title="Orders" value={analytics.orderCount} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false} className="bg-green-200">
                <Image alt="Orders icon" src="/box.png" width={30} height={30} />
                <Statistic title="Products" value={analytics.productCount} />
            </Card>
        </Col>
    </Row>)
};

export default withAdminAuth(DashboardPage);
