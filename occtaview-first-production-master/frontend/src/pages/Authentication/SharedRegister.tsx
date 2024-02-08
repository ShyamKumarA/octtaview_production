import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { addNewReferal, addNewUser } from '../../Slice/userSlice';
import React from 'react';
import Header from '../../components/Layouts/Header';
import { useAppDispatch, useAppSelector } from '../../Slice/index';
import { logout } from '../../Slice/authSlice';

const SharedRegister = () => {
    
    const { id } = useParams();
    console.log(id,"id")
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('');
    const [password, setPassword] = useState('');

    // const { loading, data: userData, error } = useAppSelector((state: any) => state.getAddNewUserReducer);

    const { data: registeredData } = useAppSelector((state: any) => state.getNewReferalReducer);

    // useEffect(() => {
    //     dispatch(setPageTitle('Register new member'));

    //     if (!userInfo) {
    //         navigate('/login');
    //     }
    // }, [userInfo]);

    

    const submitForm = (e: any) => {
        e.preventDefault();
        console.log(userName, email, phone, address, transactionPassword, password);

        const data = { userName, email, phone, address, transactionPassword, password, id };

        dispatch(addNewReferal(data));
        // if (userData) navigate('/');
    };

    // const logoutHandler = (e: any) => {
    //     e.preventDefault();
    //     dispatch(logout());
    // };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    return (
        <div>
            <div>
                <Header />
                <div className="panel mt-6 px-4">
                    <div>
                        <h2 className="text-xl text-white">Add New People</h2>
                    </div>
                </div>
                <div className="mx-auto w-full max-w-[440px] mt-5 px-4">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-2xl">Add New Member</h1>
                        <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                    </div>
                    <form className="space-y-5 dark:text-white " action="#">
                        {/* ----- */}
                        <div>
                            <label htmlFor="Name">User Name</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="Name"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter Name"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconUser fill={true} />
                                </span>
                            </div>
                        </div>
                        {/*  */}
                        <div>
                            <label htmlFor="Email">Email</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter mail"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconUser fill={true} />
                                </span>
                            </div>
                        </div>
                        {/*  */}

                        {/*  */}
                        <div>
                            <label htmlFor="Phone">Phone</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="Phone"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter number"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconMail fill={true} />
                                </span>
                            </div>
                        </div>
                        {/*  */}
                        <div>
                            <label htmlFor="Email">Address</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconMail fill={true} />
                                </span>
                            </div>
                        </div>

                        {/*  */}
                        <div>
                            <label htmlFor="Password">Transaction Password</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="transactionPassword"
                                    type="password"
                                    value={transactionPassword}
                                    onChange={(e) => setTransactionPassword(e.target.value)}
                                    placeholder="Enter Txn Password"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                </span>
                            </div>
                        </div>
                        {/*  */}
                        <div>
                            <label htmlFor="Password">Password</label>
                            <div className="relative text-white-dark">
                                <input
                                    id="Password"
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Txn Password"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                </span>
                            </div>
                        </div>

                        {/*  */}
                        <button onClick={submitForm} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            {/* {loading && <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>} */}
                            Add Member
                        </button>
                    </form>
                    <div className="text-center mt-7 dark:text-white">
                        {registeredData && (
                            <div>
                                Registered successfully!&nbsp;
                                {/* <Link to="/" onClick={logoutHandler} className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    Go to Home
                                </Link> */}
                            </div>
                        )}
                        {/* {error && <div className="text-red-600">{error}</div>} */}
                    </div>
                    {/* <div onClick={logoutHandler} className="text-center mt-7 dark:text-white cursor-pointer">
                        Logout
                    </div> */}
                </div>
            </div>
        </div>
    );
};
export default SharedRegister;
