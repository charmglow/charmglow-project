"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import { fetchAnalyticsAsync } from "@/store/action/dashboard/dashboardSlice";
import { getDeliveryStatusCountAsync } from "@/store/action/order/adminOrderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Card, Col, Row, Statistic, Typography } from "antd";
import Image from "next/image";
import React from "react";

import { UserOutlined, ShoppingCartOutlined, BoxPlotOutlined, ClockCircleOutlined, CopyOutlined, CarOutlined, CheckCircleOutlined } from "@ant-design/icons";
const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { analytics } = useAppSelector(state => state.dashboardAdmin);
    const { statusAnalytics } = useAppSelector(state => state.adminorders);
    React.useEffect(() => {
        dispatch(fetchAnalyticsAsync())
        dispatch(getDeliveryStatusCountAsync())
    }, [dispatch])
    return (
        <>
            <Row gutter={[20, 20]} style={{ paddingTop: "20px" }}>
                <Col xs={24} sm={12} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-pink-200">
                        <UserOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Users" value={analytics.customerCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-orange-200">
                        <ShoppingCartOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Orders" value={analytics.orderCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-green-200">
                        {/* <Image alt="Orders icon" src="/box.png" width={30} height={30} /> */}
                        <BoxPlotOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Products" value={analytics.productCount} />
                    </Card>
                </Col>
            </Row>
            <Typography.Title level={2} italic className="mx-4 my-2">Order Analytics</Typography.Title>
            <Row gutter={[20, 20]} style={{ paddingTop: "20px" }}>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-orange-50">
                        <ClockCircleOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Pending" value={statusAnalytics.totalPending} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-blue-100">
                        <CopyOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Processing" value={statusAnalytics?.totalProcessing} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-yellow-300">
                        <CarOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Shipped" value={statusAnalytics?.totalShipped} />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mx-4 my-2">
                    <Card bordered={false} className="bg-green-400">
                        <CheckCircleOutlined style={{ fontSize: 30 }} />
                        <Statistic title="Delivered" value={statusAnalytics?.totalDelivered} />
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default withAdminAuth(DashboardPage);
