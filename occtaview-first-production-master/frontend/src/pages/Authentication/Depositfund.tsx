import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../../Slice';
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
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Headers from '../../components/Layouts/Header';
import { addNewFund } from '../../Slice/userSlice';
//
import QRCode from 'react-qr-code';

// Assuming your QR code images are in the 'assets' folder
import QRcode1 from '../../../public/assets/qrcodes/QRcode1.png';
import QRcode2 from '../../../public/assets/qrcodes/QRcode2.png';
import QRcode3 from '../../../public/assets/qrcodes/QRcode3.png';
import QRcode4 from '../../../public/assets/qrcodes/QRcode4.png';
import QRcode5 from '../../../public/assets/qrcodes/QRcode5.png';
import QRcode6 from '../../../public/assets/qrcodes/QRcode6.png';
import QRcode7 from '../../../public/assets/qrcodes/QRcode7.png';
import QRcode8 from '../../../public/assets/qrcodes/QRcode8.png';
import QRcode9 from '../../../public/assets/qrcodes/QRcode9.png';
import QRcode10 from '../../../public/assets/qrcodes/QRcode10.png';
import { link } from 'fs';

//

const Depositfund = () => {
    const location = useLocation();

    const [amount, setAmount] = useState('');
    const [transactionid, setTransactionid] = useState('');

    const [currentQRIndex, setCurrentQRIndex] = useState(0);

    // const searchParams = new URLSearchParams(location.search);
    const { data } = useAppSelector((state: any) => state.getAddNewFundReducer);
    // const amount = searchParams.get('amount');

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });

    const handlePayment = (e: any) => {
        e.preventDefault();
        dispatch(addNewFund({ amount, transactionid }));
        if (data) navigate('/deposithistory');
        alert('Deposit confirmed!');
    };

    const qrCodeData = [
        { code: QRcode1, link: 'TCbs7bXoq99eHxquaBUpBptQy9rAM2x15P' },
        { code: QRcode2, link: 'TAKAkCCK7o426yYjHh2kpPadYhWRsbxRNS' },
        { code: QRcode3, link: 'TYmnBnbok3khnd3YQjanVHrpLPhvCwPWvR' },
        { code: QRcode4, link: 'TW3J65Pnxm9WDNUAgJz9Los1J8Lab5J9Ks' },
        { code: QRcode5, link: 'TEPc9WfK7CwgHV9QnVt1znhpTn1JxdLL9y' },
        { code: QRcode6, link: 'TScvoAtZwN4ouoSPN8reZSrWGF5BKNxyMK' },
        { code: QRcode7, link: 'TSXHQyM1JxjD94JbrCFeJQSVPPet269tc5' },
        { code: QRcode8, link: 'TEoYeyUrDZAbNGYKoVdmh9Nue61p1xi7pN' },
        { code: QRcode9, link: 'TTXzewFCuXAFSPL9u9Z1ST1KGWSyj3MD6q' },
        { code: QRcode10, link: 'TSqeTCsVwBziBEMT5DpbSFMkgrNjjVM6rr' },
    ];

    const [selectedQRCode, setSelectedQRCode] = useState({ code: '', link: '' });

    useEffect(() => {
        // Set a random QR code and its link on component mount or page refresh
        const randomIndex = Math.floor(Math.random() * qrCodeData.length);
        setSelectedQRCode(qrCodeData[randomIndex]);
    }, []);

    const copyToClipboard = () => {
        try {
            const textField = document.createElement('textarea');
            textField.innerText = selectedQRCode.link;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            document.body.removeChild(textField);
            console.log('Link copied to clipboard!');
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Error copying to clipboard: ', err);
            alert('Error copying to clipboard!');
        }
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
            <Headers />
            <div className="panel mt-6">
                <div>
                    <h2 className="text-xl text-white">Deposit Fund</h2>
                </div>
            </div>
            <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] ">
                <div className="flex justify-center   ">
                    <p className="text-white font-extrabold  sm:text-3xl md:text-3xl lg:text-3xl">Make Payment To Add Funds</p>
                </div>
                {/* <p className="text-white">Amount: {amount}</p> */}

                <div className="flex justify-center ">
                    <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{amount}</h1>
                </div>

                <div className="mb-5 flex flex-col lg:flex-row items-center lg:justify-evenly space-y-4 lg:space-y-0">
                    <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                        <div className="py-7 px-2">
                            <img src={selectedQRCode.code} alt="QR Code" className="max-w-full h-auto" />
                            <p className="mt-4 text-center text-blue-500 underline">
                                <a href={selectedQRCode.link} target="_blank" rel="noopener noreferrer">
                                    {selectedQRCode.link}
                                </a>
                            </p>

                            <div className="flex justify-center items-center mt-4 space-x-2">
                                <button className="flex justify-center items-center w-10 h-5 bg-orange-600 text-white" onClick={copyToClipboard}>
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* --------------------------------------- */}
                    <div className="flex flex-col items-center space-y-4 mt-4 lg:mt-0">
                        <div>
                            <p className="text-white">Add Amount</p>
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="form-input w-full max-w-[19rem] lg:w-72 mt-2"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <p className="text-red-600">Depositfund only tron TRC-20.</p>
                        </div>

                        <div className="flex flex-col ">
                            <p className="text-white">Transaction ID</p>
                            <input
                                type="text"
                                placeholder="Enter your transaction ID"
                                className="form-input w-full max-w-[19rem] lg:w-72 mt-2 "
                                value={transactionid}
                                onChange={(e) => setTransactionid(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center py-4">
                            <button className="bg-green-500 text-white w-full max-w-[19rem] lg:w-40 h-10 rounded-sm " onClick={handlePayment}>
                                Confirm Deposit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Depositfund;
