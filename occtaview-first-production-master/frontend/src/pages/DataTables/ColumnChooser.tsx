import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Slice//index';
import { setPageTitle, toggleRTL } from '../../Slice/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { getAllUsers } from '../../Slice/userSlice';
import LevelTreeComponent from '../../pages/DataTables/LevelTreeComponent';
import Header from '../../components/Layouts/Header';

const ColumnChooser = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<any>(1);
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.getAllUsersReducer);

    // const { loading: level2Loading, data: level2Data, error: level2Error } = useAppSelector((state: any) => state.getAllUsersReducer);
    // const { loading: level3Loading, data: level3Data, error: level3Error } = useAppSelector((state: any) => state.getAllUsersReducer);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

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

    const [childComponentKey, setChildComponentKey] = useState(0);
    useEffect(() => {
        setPage(1);
    }, [pageSize]);
    
    useEffect(() => {
        if (Array.isArray(initialRecords)) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            
            setRecordsData([...initialRecords.slice(from, to)]);
        } else {
            console.error("initialRecords is not defined or is not an array");
        }
    }, [page, pageSize, initialRecords]);
    
    useEffect(() => {
        setInitialRecords(() => {
            return (rowData || []).isArray
                ? (rowData || []).filter((item: any) => {
                      return (
                          item.username.toLowerCase().includes(search.toLowerCase()) ||
                          item.email.toLowerCase().includes(search.toLowerCase()) ||
                          item.ownSponserId.toLowerCase().includes(search.toLowerCase()) ||
                          item.userStatus.toLowerCase().includes(search.toLowerCase())
                      );
                  })
                : [];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, rowData]);

    useEffect(() => {
        if (rowData) {
            setChildComponentKey((prevKey) => prevKey + 1);
        }
    }, [rowData]);

    return (
        <div className="inline-block w-full">
            <Header />
            <ul className="mb-5 grid grid-cols-4 gap-2 text-center">
                <li>
                    <div
                        className={`${activeTab === 1 ? '!bg-primary text-white' : ''}
                block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`}
                        onClick={() => setActiveTab(1)}
                    >
                        Level 1
                    </div>
                </li>
                <li>
                    <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={() => setActiveTab(2)}>
                        Level 2
                    </div>
                </li>
                <li>
                    <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={() => setActiveTab(3)}>
                        Level 3
                    </div>
                </li>
            </ul>
            <div>
                <div className="mb-5">{activeTab === 1 && <LevelTreeComponent key={childComponentKey} level={rowData && rowData.child1} />}</div>
                <div className="mb-5">{activeTab === 2 && <LevelTreeComponent level={rowData && rowData.child2} />}</div>
                <div className="mb-5">{activeTab === 3 && <LevelTreeComponent level={rowData && rowData.child3} />}</div>
            </div>
            <div className="flex justify-between">
                <button type="button" className={`btn btn-primary ${activeTab === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab(activeTab === 3 ? 2 : 1)}>
                    Back
                </button>
                <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab(activeTab === 1 ? 2 : 3)}>
                    {activeTab === 3 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};
export default ColumnChooser;
