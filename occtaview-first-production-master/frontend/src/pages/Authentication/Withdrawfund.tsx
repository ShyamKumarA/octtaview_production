import React from 'react';
import Headers from '../../components/Layouts/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../Slice';
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
import { WithdrawFunds, fetchUserProfile } from '../../Slice/userSlice';
import { IRootState, useAppDispatch, useAppSelector } from '../../Slice/index';
import { Show_Toast } from '../Components/Toastify';
import IconEye from '../../components/Icon/IconEye';

const Withdrawfund = () => {
    const [amount, setAmount] = useState('');
    const [serviceCharge, setServiceCharge] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [transpassword, setTransPassword] = useState('');

    const [showpassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: userProfile, loading, error } = useAppSelector((state) => state.userProfileReducer);

    const { data:data2, error: withdrawFundError } = useAppSelector((state: any) => state.getWithdrawFundReducer);
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
        dispatch(fetchUserProfile());

    }, [dispatch]);

    useEffect(() => {
        const withdrawalAmount = parseFloat(amount);

        if (!isNaN(withdrawalAmount)) {
            const deduction = withdrawalAmount * 0.04;
            const deductedAmount = withdrawalAmount - deduction;
            setServiceCharge(deduction);
            setTotalAmount(deductedAmount);
        }
    }, [amount]);
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        const numericAmount = Number(amount);
        const minWithdrawalAmount = 15;
        const minPasswordLength = 6;
    
        try {
            if (!isNaN(numericAmount) && numericAmount >= minWithdrawalAmount && transpassword.length >= minPasswordLength) {
                const response = await dispatch(WithdrawFunds({ amount: numericAmount, transpassword, paymentUrl }));
                console.log(response?.type,"response from api reached")    
                if (response?.type === "addNewFund/fulfilled") {
                    navigate('/reportstatus');
                    Show_Toast({ message: 'Withdraw confirmed..', type: true });
                    setAmount('');
                    setTotalAmount(0);
                    setServiceCharge(0);
                    setTransPassword('');
                    setPaymentUrl('');
                } else {
                    Show_Toast({ message: withdrawFundError, type: false });

                }
            } else {
                if (numericAmount < minWithdrawalAmount) {
                    Show_Toast({ message: `Minimum withdrawal amount is $${minWithdrawalAmount}.`, type: false });
                } else {
                    Show_Toast({ message: `Transaction Password must be at least ${minPasswordLength} characters.`, type: false });
                }
            }
        } catch (error) {
            console.error("Error from the server:", error);
            Show_Toast({ message: 'An error occurred while processing your request.', type: false });
        }
    };
    

    
    return (
        <div>
            <Headers />

            <div className="panel mt-6">
                <div>
                    <h2 className="text-xl text-white">Withdraw Fund</h2>
                </div>
            </div>
          
            <div className="mb-5 flex flex-col sm:flex-row items-center justify-center mt-10">
                {/* <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none flex flex-col justify-center items-center mb-5 sm:mb-0">
                    <h1 className="text-white">Available Balance</h1>
                    <div className="py-7 px-6">
                        {' '}
                        <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">0</div>
                        <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">0</h5>
                    </div>
                </div> */}
                

                <div className="max-w-[26rem] ml-0 sm:ml-10 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                    <div className="flex flex-col">
                        <h2 className='text-white'>Available wallet amount : $ {userProfile && userProfile.totalIncome}</h2>
                        <h1 className="text-white mt-3">Withdraw as much as you want, but never less than $15.</h1>
                    </div>
                    <form className="py-5"onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="fullname">Amount</label>
                        <input type="number" placeholder="Amount" className="form-input" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                        {amount && Number(amount) < 15 && <p className="text-red-500">Minimum withdrawal amount is $15.</p>}

                        <label htmlFor="fullname">Service Charge $4% deducted</label>
                        <input type="number" placeholder="Service Charge" className="form-input" value={serviceCharge.toFixed(2)} readOnly />
                        <label htmlFor="fullname">Total amount</label>
                        <input type="number" placeholder="Total Amount" className="form-input" value={totalAmount.toFixed(2)} readOnly />
                        <label htmlFor="fullname">Payment URL</label>
                        <input type="text" placeholder="URL" className="form-input" required value={paymentUrl} onChange={(e) => setPaymentUrl(e.target.value)} />

                        <label htmlFor="fullname">Transaction Password</label>
                        <div className="relative">
                            <input
                                type={showpassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                className="form-input"
                                required
                                value={transpassword}
                                onChange={(e) => setTransPassword(e.target.value)}
                            />
                            <span className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showpassword)}>
                                {showpassword ? <IconLockDots /> : <IconEye />}
                            </span>
                        </div>

                        {transpassword && transpassword.length < 6 && <p className="text-red-500">Transaction Password must be at least six digits.</p>}

                        <div className="flex justify-center items-center">
                            <button type="submit" className="btn btn-primary mt-6">
                                Withdraw
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Withdrawfund;
