import React from "react";
import { Spin, Flex } from "antd"
const SettingsLoading = () => {
    return <Flex align="center" justify="center" gap="middle" className="min-h-screen min-w-screen" vertical>
        <Spin size="large" />
        <span>Loading...</span>
    </Flex>;
};

export default SettingsLoading;
