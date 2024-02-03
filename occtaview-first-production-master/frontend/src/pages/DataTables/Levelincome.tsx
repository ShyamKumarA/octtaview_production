import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Slice/index';
import { setPageTitle, toggleRTL } from '../../Slice/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { fetchLevelIncome1, fetchLevelIncome2, fetchLevelIncome3 } from '../../Slice/userSlice';
import Header from '../../components/Layouts/Header';
import StepLevel from '../Authentication/StepLevel';
import StepLevel2 from '../Authentication/StepLevel2';
import StepLevel3 from '../Authentication/StepLevel3';

const Levelincome = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<any>(1);
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.levelIncomeReducer1);
    const { loading: level2Loading, data: level2Data, error: level2Error } = useAppSelector((state: any) => state.levelIncomeReducer2);
    const { loading: level3Loading, data: level3Data, error: level3Error } = useAppSelector((state: any) => state.levelIncomeReducer3);
    useEffect(() => {
        dispatch(fetchLevelIncome1());
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
    const levelTwoHandler = () => {
        setActiveTab(2);
    };
    const levelThreeHandler = () => {
        setActiveTab(3);
    };
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
                    <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={levelTwoHandler}>
                        Level 2
                    </div>
                </li>
                <li>
                    <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={levelThreeHandler}>
                        Level 3
                    </div>
                </li>
                <li></li>
            </ul>
            <div>
                <div className="mb-5">{activeTab === 1 && <StepLevel />}</div>
                <div className="mb-5">{activeTab === 2 && <StepLevel2 />}</div>
                <div className="mb-5">{activeTab === 3 && <StepLevel3 />}</div>
                {/* Additional components for other levels */}
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
export default Levelincome;
