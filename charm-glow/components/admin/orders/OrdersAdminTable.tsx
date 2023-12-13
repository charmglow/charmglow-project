import { fetchAdminOrdersAsync, updateDeliveryStatusAction, updateDeliveryStatusAsync } from "@/store/action/order/adminOrderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Order, OrderProduct } from "@/store/types";
import { Table, Descriptions, Image, Divider, Typography, Badge, Button, Modal, Form, Select, message } from 'antd'
import React from "react";
import type { ColumnType, ColumnsType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';

const { Text } = Typography;
const OrdersAdminTable = () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [deliveryStatus, setDeliveryStatus] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const dispatch = useAppDispatch();
    const { loading, orders } = useAppSelector(state => state.adminorders);
    type DataIndex = keyof Order;
    const [form] = Form.useForm();
    React.useEffect(() => {
        dispatch(fetchAdminOrdersAsync({
            page,
            limit: pageSize,
            delivery_status: deliveryStatus
        }))
    }, [dispatch, page, pageSize, deliveryStatus])
    const updateDeliveryStatus = (record: Order) => {
        // Set the default value for the 'status' field
        form.setFieldsValue({ status: record.delivery_status });

        // Implement the logic to update the delivery status
        // You may want to show a modal or use other UI components for updating the status
        Modal.confirm({
            title: 'Update Delivery Status',
            content: (
                <Form
                    form={form}
                    onFinish={async (values) => {
                        // Dispatch an action to update the delivery status in the store
                        const data = {
                            orderId: record._id,
                            newStatus: values?.status
                        }
                        dispatch(updateDeliveryStatusAction(data))
                        // updateDeliveryStatus(record._id, newStatus);
                        dispatch(updateDeliveryStatusAsync({
                            orderId: record._id,
                            newStatus: values?.status
                        })).unwrap().then((originalPromiseResult) => {
                            message.success(originalPromiseResult?.message)
                            form.resetFields()
                        }).catch((rejectedValueOrSerializedError) => {
                        });
                    }}
                >
                    <Form.Item name="status" label="Select the new delivery status:">
                        <Select>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="processing">Processing</Select.Option>
                            <Select.Option value="shipped">Shipped</Select.Option>
                            <Select.Option value="delivered">Delivered</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            ),
            onOk: () => {
                // Manually trigger form submission when OK button is clicked
                form.submit();
            },
            okButtonProps: {
                style: {
                    backgroundColor: '#876553'
                }
            }
        });

    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Order> => ({
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    var data: Order[] = orders;


    const columns: ColumnsType<Order> = [
        {
            title: "Order Details",
            dataIndex: 'products',
            render: (text: OrderProduct[]) => (
                <div>
                    <Descriptions size="small" layout="vertical" bordered items={[{
                        label: 'Detail',
                        children: (
                            <>
                                {text.map((product: OrderProduct, index: number) => {
                                    return (<div key={index} >
                                        <div className='flex flex-row'>

                                            <Image

                                                width={50}
                                                height={50}
                                                src={`${product.productImage[0]}`}
                                                alt={product.title}
                                                fallback="data:image/png;base64,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"
                                            />
                                            <div className='flex flex-col pl-1'>
                                                <span>
                                                    {product.title}
                                                </span>
                                                <span>
                                                    Quantity: {product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>)
                                })}
                            </>
                        ),
                    }]} />
                </div>
            )
        },
        {
            title: 'Address',
            dataIndex: 'shipping',
            ...getColumnSearchProps('shipping'),
            render: (text) => (
                <Text>{Object.keys(text.address).map((key) => {
                    return text.address[key] + ', '; // The return value is not used, map is used here for iteration
                })}</Text>
            )
        },

        {
            title: 'Date',
            dataIndex: 'createdAt',
            ...getColumnSearchProps('createdAt'),
            render: (text) => (
                <Text>{new Date(text).toLocaleDateString('en-CA')}</Text>
            )

        },

        {
            title: 'Total',
            dataIndex: 'total',
            ...getColumnSearchProps('total'),
            sorter: (a, b) => a.total - b.total,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
                <Text strong>${text / 100}</Text>
            )

        },
        {
            title: 'Status',
            dataIndex: 'delivery_status',
            ...getColumnSearchProps('delivery_status'),
            sortDirections: ['descend', 'ascend'],
            render: (text) => {
                let badgeStatus;
                let badgeColor;

                switch (text) {
                    case 'pending':
                        badgeStatus = 'Pending';
                        badgeColor = '#ff9800'; // Orange color for 'Pending'
                        break;
                    case 'processing':
                        badgeStatus = 'Processing';
                        badgeColor = '#2196f3'; // Blue color for 'Processing'
                        break;
                    case 'shipped':
                        badgeStatus = 'Shipped';
                        badgeColor = '#ffeb3b'; // Yellow color for 'Shipped'
                        break;
                    case 'delivered':
                        badgeStatus = 'Delivered';
                        badgeColor = '#4caf50'; // Green color for 'Delivered'
                        break;
                    default:
                        badgeStatus = text;
                        badgeColor = '#000'; // Default color for unknown status
                }

                return <Badge color={badgeColor} text={badgeStatus} />;
            },
            filters: [
                {
                    text: 'Pending',
                    value: 'pending',
                },
                {
                    text: 'Processing',
                    value: 'processing',
                },
                {
                    text: 'Shipped',
                    value: 'shipped',
                },
                {
                    text: 'Delivered',
                    value: 'delivered',
                },
            ],
            // onFilter: (value: string, record) => record.delivery_status.indexOf(value) === 0,
            onFilter: (value, record) => record.delivery_status === value,
            filterMode: 'tree'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => updateDeliveryStatus(record)} className='uppercase bg-[#876553]'>
                    Update Status
                </Button>
            ),
        },
    ];

    return (
        <div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                rowKey="_id"
                className='py-5'
            >

            </Table>
        </div>
    );
};

export default OrdersAdminTable;
