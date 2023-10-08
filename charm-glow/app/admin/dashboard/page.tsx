"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";


const formatter = (value: number) => <CountUp end={value} separator="," />;
const DashboardPage = () => {
    return (<Row gutter={16} style={{ paddingTop: "20px" }}>
        <Col span={8}>
            <Card bordered={false}>
                <UserOutlined style={{ fontSize: 30 }} />
                <Statistic title="Users" value={32} formatter={formatter} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false}>
                <Image alt="Orders_icon" src="/purchase-order.png" width={30} height={30} />
                <Statistic title="Orders" value={25} formatter={formatter} />
            </Card>
        </Col>
        <Col span={8}>
            <Card bordered={false}>
                <Image alt="Orders_icon" src="/box.png" width={30} height={30} />
                <Statistic title="Products" value={5} formatter={formatter} />
            </Card>
        </Col>
    </Row>)
};

export default withAdminAuth(DashboardPage);
