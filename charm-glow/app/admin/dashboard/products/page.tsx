/* eslint-disable @next/next/no-img-element */
"use client"
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import type { FormInstance, InputRef } from 'antd';
import { Avatar, Button, Form, Image, Input, InputNumber, Modal, Popconfirm, Space, Table, Upload, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { addProductAsync, deleteProductAsync, getProductsAsync, updateProductAsync } from "@/store/action/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from '@/store/types';
import { Typography } from 'antd';
import withAdminAuth from '@/components/admin/auth/withAdminAuth';

const { Title, Text } = Typography;

interface DataType {
    _id: string;
    productImage: string;
    title: number;
    description: string;
    price: number,
    category: string
}

type DataIndex = keyof DataType;


const SubmitButton = ({ form, btnText }: { form: FormInstance, btnText: string }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);
    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {btnText}
        </Button>
    );
};
const ProductsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const dispatch = useAppDispatch();
    const userToken = useAppSelector(state => state.auth.user?.token)
    const { loading, error } = useAppSelector(state => state.auth)
    const { products } = useAppSelector(state => state.products);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState({});
    const handleChange = (info: { fileList: any; }) => {
        let newFileList = [...info.fileList];

        // Limit the number of uploaded files to 1 (for a single image)
        newFileList = newFileList.slice(-1);

        // Update the state with the new file list
        setFileList(newFileList);
    };

    const showAddModal = (text: string, record?: any) => {
        if (text === "Add") {
            setIsUpdate(false);
            form.resetFields()
        } else {
            setIsUpdate(true);
            console.log('====================================');
            console.log("record: ", record);
            console.log('====================================');
            setUpdateId(record)
            form.setFieldsValue(
                record
            );
        }
        setOpen(true);

    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };
    var data: DataType[] = products;
    useEffect(() => {
        if (userToken) {
            dispatch(getProductsAsync(userToken))
        }
    }, [dispatch]);
    const handleDelete = async (record: DataType) => {
        // Filter out the record to be deleted
        // const newData = data.filter((item) => item._id !== record._id);
        if (userToken) {
            dispatch(deleteProductAsync({
                userToken,
                id: record._id
            }))
            dispatch(getProductsAsync(userToken))
        }
        message.success('Record deleted successfully');
    };
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
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

    const columns: ColumnsType<DataType> = [
        {
            title: "Product Image",
            dataIndex: 'productImage',
            width: '20%',
            key: 'productImage',
            render: (text) => (
                <Image
                    width={100}
                    height={100}
                    src={`http://localhost:3001/${text}`}
                    alt={text}
                    fallback="data:image/png;base64,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"
                />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '30%',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
                <Text strong>${text}</Text>
            )

        },
        {
            title: 'Category',
            dataIndex: 'category',
            ...getColumnSearchProps('category'),
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space wrap>
                    <Popconfirm
                        title="Are you sure you want to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default" danger icon={<DeleteOutlined />} loading={loading}>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button type="primary" className='uppercase' icon={<EditOutlined />} onClick={() => showAddModal("Update", record)}>
                        Update
                    </Button>
                </Space>
            ),
        }
    ];
    const onFinish = async (values: any) => {

        console.log("values ==>", values, fileList)
        values.userToken = userToken;
        if (!isUpdate) {
            dispatch(addProductAsync(
                values
            )).unwrap().then((originalPromiseResult) => {

                // handle result here
                message.success(originalPromiseResult?.message)
                setFileList([]);
                setOpen(false);
                form.resetFields()
            }).catch((rejectedValueOrSerializedError) => {
                //   handle error here
            });
        } else {
            values.id = updateId?._id
            dispatch(updateProductAsync(
                values
            )).unwrap().then((originalPromiseResult) => {
                // handle result here
                console.log('====================================');
                console.log("originalPromiseResult: ", originalPromiseResult);
                console.log('====================================');
                message.success(originalPromiseResult?.message)
                setFileList([]);
                setOpen(false);
                form.resetFields()
            }).catch((rejectedValueOrSerializedError) => {
                //   handle error here

                console.log('====================================');
                console.log("rejectedValueOrSerializedError: ", rejectedValueOrSerializedError);
                console.log('====================================');
            });

        }

    };

    return (
        <>
            <Space direction='horizontal' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px' }}>
                <Modal
                    title="Create Product"
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    okText="Create"
                >
                    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                        {
                            isUpdate == false &&
                            <Form.Item name="productImage" label="Product Image" rules={[{ required: true }]}>
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    beforeUpload={() => false}
                                    showUploadList={false} // Hide the default file list
                                >
                                    {fileList.length === 0 ? (
                                        <div>
                                            <UploadOutlined />
                                        </div>
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <Image
                                            src={URL.createObjectURL(fileList[0].originFileObj)}
                                            alt="Uploaded"
                                            style={{ width: '100%', maxHeight: '200px' }}
                                        />
                                    )}
                                </Upload>
                            </Form.Item>
                        }

                        <Form.Item name="title" label="Product Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Product Description" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Product Price" rules={[{ required: true }]}>
                            <InputNumber
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                name='price'
                            />
                        </Form.Item>
                        <Form.Item name="category" label="Product Category" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                {
                                    isUpdate ? <SubmitButton form={form} btnText="Update" /> : <SubmitButton form={form} btnText="Add" />
                                }
                                <Button htmlType="reset">Reset</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
                <Title level={4} className='uppercase'>Products</Title>
                <Button type="primary" className='uppercase' onClick={() => showAddModal("Add")}>
                    Add
                </Button>
            </Space>

            <Table columns={columns} dataSource={data} rowKey="_id" />
        </>
    );
};

export default withAdminAuth(ProductsPage);