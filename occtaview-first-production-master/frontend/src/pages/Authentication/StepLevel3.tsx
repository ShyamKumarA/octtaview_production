import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Slice/index';
import { fetchLevelIncome3 } from '../../Slice/userSlice';

// interface StepLevelComponentProps {
//     level: any;
// }

const StepLevel3 = () => {
    const dispatch = useAppDispatch();
    const { loading, data, error } = useAppSelector((state: any) => state.levelIncomeReducer3);

    let levelData: any;
    if (data) {
        levelData = data.level3Income;
    }

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(levelData || []);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        dispatch(fetchLevelIncome3());
    }, [dispatch]);

    useEffect(() => {
        setInitialRecords(() => {
            return Array.isArray(levelData)
                ? levelData.filter((item: any) => {
                      return (
                          item.userID.toLowerCase().includes(search.toLowerCase()) ||
                          item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.capitalAmount.toLowerCase().includes(search.toLowerCase()) ||
                          item.LevelAmountCredited.toLowerCase().includes(search.toLowerCase())
                      );
                  })
                : [];
        });
    }, [search, levelData]);

    return (
        <div className="space-y-6">
            <div className="panel">
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'userID', title: 'userID' },
                            { accessor: 'name', title: 'name' },
                            { accessor: 'capitalAmount', title: 'Sponsor ID' },
                            { accessor: 'LevelAmountCredited', title: 'LevelAmountCredited' },
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

export default StepLevel3;
