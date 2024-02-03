import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../Slice/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { Header } from '@mantine/core';
import Headers from '../../components/Layouts/Header';
import { useAppDispatch, useAppSelector } from '../../Slice';
import { fetchAddFundHistory } from '../../Slice/packageSlice';

const Contacts = () => {
    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector((state) => state.addFundHistoryReducer);

    useEffect(() => {
        dispatch(fetchAddFundHistory());
    }, [dispatch]);

    let rowData: any;
    if (data) {
        rowData = (data as { addFundHistory: any }).addFundHistory;
    }

    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData || []);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        if (initialRecords) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setRecordsData([...initialRecords.slice(from, to)]);
        }
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return (
                rowData &&
                rowData.filter((item: any) => {
                    return (
                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.topUpAmount.toLowerCase().includes(search.toLowerCase()) ||
                        item.transactionCode.toLowerCase().includes(search.toLowerCase()) ||
                        item.status.toLowerCase().includes(search.toLowerCase())
                    );
                })
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, rowData]);

    return (
        <div className="space-y-6">
            <Headers />
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div> */}
            {/* Skin: Striped  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Deposit History</h5>
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {loading && <>Loading...</>}
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'name', title: 'Name' },
                            { accessor: 'topUpAmount', title: 'Top Up Amount' },
                            { accessor: 'transactionCode', title: 'Transaction Code' },
                            { accessor: 'status', title: 'User Status' },
                        ]}
                        totalRecords={initialRecords ? initialRecords.length : 0}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contacts;
