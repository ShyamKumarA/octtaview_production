import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../Slice/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconLinkedin from '../../components/Icon/IconLinkedin';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconX from '../../components/Icon/IconX';
import { Header } from '@mantine/core';
import Headers from '../../components/Layouts/Header';
import { capitalWithdrawFunds } from '../../Slice/userSlice';
import { useAppDispatch, useAppSelector } from '../../Slice';
import { useNavigate } from 'react-router-dom';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconEye from '../../components/Icon/IconEye';
import { Show_Toast } from '../Components/Toastify';

const CapitalWithdraw = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo } = useAppSelector((state: any) => state.getCapitalWithdrawFundreducer);
    // const amount = searchParams.get('amount');
    const [amount,setAmount]=useState('')
    const [paymentUrl, setPaymentUrl] = useState('');
    const [transpassword, setTransPassword] = useState('');
    console.log(amount,"amount")
    console.log(paymentUrl,"amount")
    console.log(transpassword,"amount")
    const [showpassword, setShowPassword] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const amountInput = e.currentTarget.amount;
    //     const amount = parseFloat(amountInput.value);

    //     if (isNaN(amount)) {
    //         alert('Please enter a valid amount.');
    //         return;
    //     }

    //     const deductedAmount = amount * 0.9; // 10% deduction

    //     dispatch(capitalWithdrawFunds({ amount: deductedAmount }));

    //     if (userInfo) {
    //         // Use SweetAlert2 for a better user experience
    //         await Swal.fire('Withdrawal confirmed!', 'Redirecting to capital history...', 'success');

    //         // Use the navigate function to redirect to the specified route
    //         navigate('/capitalhistory');
    //     }
    // };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        const numericAmount = Number(amount);
        const minWithdrawalAmount = 15;
        const minPasswordLength = 6;
    
        if (!isNaN(numericAmount) && numericAmount >= minWithdrawalAmount && transpassword.length >= minPasswordLength) {
            dispatch(capitalWithdrawFunds({ amount: numericAmount, transpassword, paymentUrl }));
            if (userInfo) 
            navigate('/capitalhistory');
            // Show_Toast({ message: 'Withdraw confirmed!', type: true });
            setAmount('');
        
            setTransPassword('');
            setPaymentUrl('');
        } else {
            if (numericAmount < minWithdrawalAmount) {
                Show_Toast({ message: `Minimum withdrawal amount is $${minWithdrawalAmount}.`, type: false });
            } else {
                Show_Toast({ message: `Transaction Password must be at least ${minPasswordLength} characters.`, type: false });
            }
        }
    };
    


    return (
        <div>
            <Headers />
            <div className="panel mt-6">
                <div>
                    <h2 className="text-xl text-white">Capital Withdraw</h2>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex justify-center items-center mt-10">
                    <form className="" 
onSubmit={(e) => handleSubmit(e)}                    >
                        <div>
                        <label htmlFor="fullname">Amount</label>
                        <input type="number" placeholder="Amount" className="form-input" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                        {amount && Number(amount) < 15 && <p className="text-red-500">Minimum withdrawal amount is $15.</p>}
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

                            <p className="text-red-600 mt-5">10% will be deducted as transaction fees on every withdrawal.</p>

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

export default CapitalWithdraw;
