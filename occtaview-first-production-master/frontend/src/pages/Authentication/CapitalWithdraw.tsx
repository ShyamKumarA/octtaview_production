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

const CapitalWithdraw = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo } = useAppSelector((state: any) => state.getCapitalWithdrawFundreducer);
    // const amount = searchParams.get('amount');

    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const amountInput = e.currentTarget.amount;
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const deductedAmount = amount * 0.9; // 10% deduction

        dispatch(capitalWithdrawFunds({ amount: deductedAmount }));

        if (userInfo) {
            // Use SweetAlert2 for a better user experience
            await Swal.fire('Withdrawal confirmed!', 'Redirecting to capital history...', 'success');

            // Use the navigate function to redirect to the specified route
            navigate('/capitalhistory');
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
                    <form className="" onClick={handleSubmit}>
                        <div>
                            <p>Available Capital For Withdraw</p>
                            <input type="text" placeholder="Some Text..." className="form-input w-96" required />
                            <p className="text-red-600">10% will be deducted as transaction fees on every withdrawal.</p>

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
