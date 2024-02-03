import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppSelector } from '../../Slice';
import { setPageTitle, toggleRTL } from '../../Slice/themeConfigSlice';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';

import React from 'react';
import Header from '../../components/Layouts/Header';
import { fetchTransactionChangePassword } from '../../Slice/userSlice';

const ChangeTxnPassword = () => {
    const [currentTransactionPassword, setCurrentTransactionPassword] = useState('');
    const [newTransactionPassword, setNewTransactionPassword] = useState('');
    const [confirmTransactionPassword, setConfirmTransactionPassword] = useState('');
    //
    const { userInfo } = useAppSelector((state: any) => state.addchangeTransactionPasswordreducer);
    //
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Change Transaction Update'));
    });

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTransactionPassword !== confirmTransactionPassword) {
            console.error('Passwords do not match');
            return;
        }

        dispatch(fetchTransactionChangePassword({ newTransactionPassword, confirmTransactionPassword }) as any);

        alert('Change transaction password request sent!');
    };

    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    return (
        <div>
            <div>
                <Header />
                <div className="panel mt-6">
                    <div>
                        <h2 className="text-xl text-white">Update Transaction Password</h2>
                    </div>
                </div>
                <div className="mb-5 flex flex-col sm:flex-row items-center justify-center mt-10 px-4">
                    <div className="mx-auto w-full max-w-[440px] ">
                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-2xl">TRANSACTION PASSWORD UPDATE</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">Enter your Transaction Password and New Transaction Password</p>
                        </div>
                        <form className="space-y-5 dark:text-white" onClick={submitForm}>
                            <div>
                                <label htmlFor="Password">Current Transaction Password</label>
                                <div className="relative text-white-dark">
                                    <input
                                        id="Name"
                                        type="text"
                                        placeholder="User ID"
                                        className="form-input ps-10 placeholder:text-white-dark"
                                        value={currentTransactionPassword}
                                        onChange={(e) => setCurrentTransactionPassword(e.target.value)}
                                    />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>
                            {/*  */}

                            <div>
                                <label htmlFor="Password">New Transaction Password</label>
                                <div className="relative text-white-dark">
                                    <input
                                        id="Name"
                                        type="password"
                                        placeholder="......"
                                        className="form-input ps-10 placeholder:text-white-dark"
                                        value={newTransactionPassword}
                                        onChange={(e) => setNewTransactionPassword(e.target.value)}
                                    />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>
                            {/*  */}
                            <div>
                                <label htmlFor="Password">Confirm Password</label>
                                <div className="relative text-white-dark">
                                    <input
                                        id="Name"
                                        type="password"
                                        placeholder="......"
                                        className="form-input ps-10 placeholder:text-white-dark"
                                        value={confirmTransactionPassword}
                                        onChange={(e) => setConfirmTransactionPassword(e.target.value)}
                                    />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                Submit
                            </button>
                        </form>
                        <div className="relative my-7 text-center md:mb-9"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeTxnPassword;
