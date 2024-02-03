import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../Slice/themeConfigSlice';
import { fetchDirectIncome } from '../../Slice/userSlice';
import { useAppDispatch, useAppSelector } from '../../Slice';

const Basic = () => {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state: any) => state.directIncomeReducer);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);

    useEffect(() => {
        dispatch(fetchDirectIncome());
    }, [dispatch]);

    useEffect(() => {
        if (data?.directIncome) {
            setInitialRecords(data.directIncome);
            setRecordsData(data.directIncome.slice(0, pageSize));
        }
    }, [data?.directIncome, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        dispatch(setPageTitle('Basic Table'));
    }, [dispatch, initialRecords]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Direct Income</h5>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: '_id', title: 'id' },
                            { accessor: 'name', title: 'Name' },
                            { accessor: 'userID', title: 'User ID' },
                            { accessor: 'amountCredited', title: 'Amount Credited' },
                            { accessor: 'transactionCode', title: 'Transaction Code' },
                            { accessor: 'status', title: 'Status' },
                            { accessor: 'createdAt', title: 'Created At' },
                            { accessor: 'updatedAt', title: 'Updated At' },
                        ]}
                        totalRecords={initialRecords ? initialRecords.length : 0}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Basic;
