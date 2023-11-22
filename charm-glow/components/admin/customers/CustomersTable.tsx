import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { User } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomersAsync } from '@/store/action/customers/customersSlice';




const CustomersTable: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const { customers, loading } = useAppSelector((state) => state.customers)
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function fetchCustomers() {
            await dispatch(fetchCustomersAsync()).unwrap().then((originalPromiseResult) => {
                // messageApi.success("Customers retrieved successfully")
            }).catch((rejectedValueOrSerializedError) => {
                //   handle error here
                messageApi.error(rejectedValueOrSerializedError?.error)
            })
        }
        fetchCustomers()
    }, [dispatch, messageApi])
    type DataIndex = keyof User;
    var data: User[] = customers;
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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
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

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'shipping Address',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            ...getColumnSearchProps('shippingAddress'),
            render: (text) => (
                <div>
                    {Object.values(text).every(value => typeof value === 'string' && value === '') ? 'Not Updated' : Object.values(text).filter(value => typeof value === 'string' && value !== '').join(' ')}
                </div>
            )
        },
    ];

    return (<>
        {contextHolder}
        <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} />
    </>
    );
};

export default CustomersTable;