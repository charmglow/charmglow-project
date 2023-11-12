/* eslint-disable @next/next/no-img-element */
"use client"
import { DeleteOutlined, EditOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import type { FormInstance, InputRef } from 'antd';
import { Button, Form, Image, Input, InputNumber, Modal, Popconfirm, Space, Table, Upload, message, Carousel, TreeSelect } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { addProductAsync, deleteProductAsync, getProductsAsync, updateProductAsync } from "@/store/action/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from '@/store/types';
import { Typography } from 'antd';
import withAdminAuth from '@/components/admin/auth/withAdminAuth';
import { UploadFile, UploadProps, RcFile } from 'antd/lib/upload/interface';
import { calculateFinalPrice, jewelryCategories } from '@/utils/utils';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

type DataIndex = keyof Product;


const SubmitButton = ({ form, btnText }: { form: FormInstance, btnText: string }) => {
    const [submittable, setSubmittable] = React.useState(false);
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
    }, [form, values]);
    return (
        <Button className='uppercase bg-[#876553]' htmlType="submit" disabled={!submittable} type="primary">
            {btnText}
        </Button>
    );
};
const ProductsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector(state => state.products);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<Product>({
        price: 0,
        _id: '',
        category: '',
        createdAt: '',
        productImage: [''],
        title: '',
        description: '',
        finalPrice: 0,
        discount: 0
    });
    const showAddModal = (text: string, record?: any) => {
        if (text === "Add") {
            setIsUpdate(false);
            form.resetFields()
        } else {
            setIsUpdate(true);
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
    var data: Product[] = products;
    useEffect(() => {
        dispatch(getProductsAsync())
    }, [dispatch]);
    const handleDelete = async (record: Product) => {
        dispatch(deleteProductAsync({
            id: record._id
        }))
        dispatch(getProductsAsync())
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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Product> => ({
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
                        className='bg-[#876553]'
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
        onFilter: (value, record: any) =>
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

    const columns: ColumnsType<Product> = [
        {
            title: "Product Image",
            dataIndex: 'productImage',
            width: '20%',
            key: 'productImage',
            render: (text) => (
                <Image
                    key={text}
                    width={100}
                    height={100}
                    src={`${text[0]}`}
                    alt={text}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '12%',
            ...getColumnSearchProps('title'),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            ...getColumnSearchProps('description'),
            render: (text) => (
                <Text>${text}</Text>
            )

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
                        okType="primary"
                        okButtonProps={{
                            style: {
                                backgroundColor: 'red'
                            }
                        }}

                    >
                        <Button type="default" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button type="primary" className='uppercase bg-[#876553]' icon={<EditOutlined />} onClick={() => showAddModal("Update", record)} >
                        Update
                    </Button>
                </Space>
            ),
        }
    ];
    const onFinish = async (values: any) => {

        if (!isUpdate) {
            values.productImage = values.productImage.map((item: { response: { images: any[]; }; }, index: any) => (item.response.images[0]));
            dispatch(addProductAsync(
                values
            )).unwrap().then((originalPromiseResult) => {
                message.success(originalPromiseResult?.message)
                setOpen(false);
                form.resetFields()
            }).catch((rejectedValueOrSerializedError) => {
            });
        } else {
            values.id = updateId?._id
            dispatch(updateProductAsync(
                values
            )).unwrap().then((originalPromiseResult) => {
                message.success(originalPromiseResult?.message)
                setOpen(false);
                form.resetFields()
            }).catch((rejectedValueOrSerializedError) => {

            });

        }

    };
    const props: UploadProps = {
        name: 'images',
        action: `http://api.charmglowjewelry.com/api/admin/products/upload-images`,
        // action: `http://localhost:8080/api/admin/products/upload-images`,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(info) {
        },
        accept: "image/*",
        maxCount: 12,
        multiple: true,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
        // beforeUpload(file) {
        //     return new Promise((resolve, reject) => {
        //         if (file.size > 2) {
        //             reject('File size exceed')
        //             message.error("File size exceed")
        //         }
        //         else {
        //             resolve('success')
        //         }
        //     })
        // }
    };
    let productValue = Form.useWatch('price', form);
    let discountValue = Form.useWatch('discount', form)
    form.setFieldValue('finalPrice', calculateFinalPrice(productValue || 0, discountValue || 0))
    return (
        <>
            <Space direction='horizontal' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px' }}>
                <Modal
                    confirmLoading={loading}
                    title="Create Product"
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    okText="Create"
                >
                    <Form scrollToFirstError form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                        {
                            isUpdate == false &&
                            <Form.Item name="productImage" label="Product Image"
                                valuePropName='fileList'
                                getValueFromEvent={(event) => {
                                    return event?.fileList

                                }} rules={[{ required: true, message: 'Please upload images' }]} >
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        }

                        <Form.Item name="title" label="Product Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Product Description" rules={[{ required: true }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <div className='flex flex-row justify-between items-center'>
                            <Form.Item name="price" label="Product Price" rules={[{ required: true }]}>
                                <InputNumber
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    name='price'
                                    min={0}
                                />
                            </Form.Item>
                            <Form.Item name="discount" label="Discount" >
                                <InputNumber
                                    max={100}
                                    min={0}
                                    formatter={(value) => `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    name='discount'
                                />
                            </Form.Item>
                            <Form.Item name="finalPrice" label="Final Price">
                                <InputNumber
                                    disabled
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    name='finalPrice'
                                />
                            </Form.Item>

                        </div>
                        <Form.Item name="category" label="Product Category" rules={[{ required: true }]}>
                            <TreeSelect
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={jewelryCategories}
                                placeholder="Please select"
                                treeDefaultExpandAll
                            />
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
                <Button type="primary" className='uppercase bg-[#876553]' onClick={() => showAddModal("Add")}>
                    Add
                </Button>
            </Space>

            <Table columns={columns} dataSource={data} rowKey="_id" />
        </>
    );
};

export default withAdminAuth(ProductsPage);