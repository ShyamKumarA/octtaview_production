import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../Slice';
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

const ChangeTxnPassword = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Change Transaction Update'));
    });
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

    const submitForm = () => {
        navigate('/');
    };
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
                        <form className="space-y-5 dark:text-white">
                            <div>
                                <label htmlFor="Password">Current Transaction Password</label>
                                <div className="relative text-white-dark">
                                    <input id="Name" type="text" placeholder="User ID" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>
                            {/*  */}

                            <div>
                                <label htmlFor="Password">New Transaction Password</label>
                                <div className="relative text-white-dark">
                                    <input id="Name" type="password" placeholder="......" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>
                            {/*  */}
                            <div>
                                <label htmlFor="Password">Confirm Password</label>
                                <div className="relative text-white-dark">
                                    <input id="Name" type="password" placeholder="......" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                Submit
                            </button>
                        </form>
                        <div className="relative my-7 text-center md:mb-9">
                            <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                            <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                        </div>
                        <div className="mb-10 md:mb-[60px]">
                            <ul className="flex justify-center gap-3.5 text-white">
                                <li>
                                    <Link
                                        to="#"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                        style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                    >
                                        <IconInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                        style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                    >
                                        <IconFacebookCircle />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                        style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                    >
                                        <IconTwitter fill={true} />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                        style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                    >
                                        <IconGoogle />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center dark:text-white">
                            Already have an account ?&nbsp;
                            <Link to="/auth/boxed-signin" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                Confirm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeTxnPassword;
