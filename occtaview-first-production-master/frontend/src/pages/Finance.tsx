import { Form, Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../Slice';
import { setPageTitle } from '../Slice/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconEye from '../components/Icon/IconEye';
import IconBitcoin from '../components/Icon/IconBitcoin';
import IconEthereum from '../components/Icon/IconEthereum';
import IconLitecoin from '../components/Icon/IconLitecoin';
import IconBinance from '../components/Icon/IconBinance';
import IconTether from '../components/Icon/IconTether';
import IconSolana from '../components/Icon/IconSolana';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconInfoCircle from '../components/Icon/IconInfoCircle';
import { fetchUserProfile } from '../../src/Slice/userSlice';
import { useAppDispatch, useAppSelector } from '../../src/Slice/index';
import { log } from 'console';
import Modals from './Components/Modals';
import { Dialog, Transition } from '@headlessui/react';
import {  Fragment } from 'react';
import IconArrowForward from '../components/Icon/IconArrowForward';
import IconFolderPlus from '../components/Icon/IconFolderPlus';
import IconFile from '../components/Icon/IconFile';

const Finance = () => {
    const dispatch = useAppDispatch();
    const { data: userProfile, loading, error } = useAppSelector((state) => state.userProfileReducer);
    const [modal3, setModal3] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    console.log(selectedFile,"file")
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    console.log('User Profile:', userProfile);

    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    useEffect(() => {
        dispatch(setPageTitle('OCTTAVIEW'));
    });

    //bitcoinoption
    const bitcoin: any = {
        series: [
            {
                data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //ethereumoption
    const ethereum: any = {
        series: [
            {
                data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //litecoinoption
    const litecoin: any = {
        series: [
            {
                data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //binanceoption
    const binance: any = {
        series: [
            {
                data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //tetheroption
    const tether: any = {
        series: [
            {
                data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //solanaoption
    const solana: any = {
        series: [
            {
                data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    //   ----------------------
    const [copied, setCopied] = useState(false);
    const userProfileId = userProfile && userProfile.id;

    


    // const handleImageUpload2 = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file ? file.name : null);
    //   };
      

    const handleCopyClick = () => {
        // Create a text area element to temporarily hold the URL
        const textArea = document.createElement('textarea');
        textArea.value = `https://octtaview.com/register/${userProfileId}`;
        document.body.appendChild(textArea);

        // Select and copy the text
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Set copied to true
        setCopied(true);

        // Reset copied state after a short delay
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div>
    <div className='flex flex-col '>
  <div className="flex i">
    <button className="bg-primary text-white hover:underline rounded-md" onClick={handleCopyClick}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
    <span className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
      {`https://octtaview.com/register/${userProfileId}`}
    </span>
  </div>

  
    <div className="mt-4">
<div className="flex">
        <button type="button" onClick={() => setModal3(true)} className="btn btn-secondary text-sm">
        <IconFile className="ltr:mr-2 rtl:ml-2 shrink-0" />
          Upload Document
        </button>
      </div>
      <Transition appear show={modal3} as={Fragment}>
        <Dialog as="div" open={modal3} onClose={() => setModal3(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                  <div className="p-5">
                    {/* Two image upload buttons in two rows */}
                    <div className="flex flex-col">
                      
                      <div>
                        <label htmlFor="imageUpload2" className="btn btn-outline-primary text-sm p-2">
                          Select Document
                          <input
                            type="file"
                            id="imageUpload2"
                            className="hidden"
                            // onChange={handleImageUpload2}
                            accept="image/*"
                          />
                        </label>
                        {selectedFile && (
        <div className="flex items-center mt-2">
          <p className="text-sm text-white mt-2 mr-2">File selected: {selectedFile}</p>
          <button
            type="button"
            onClick={() => setSelectedFile(null)} // Nullify the selected file state
            className="text-white hover:text-gray-300"
          >
            &#10005; {/* Cross symbol */}
          </button>
        </div>
      )}
                      </div>
                    </div>
                    <div className="flex justify-end items-center mt-4">
                    <button
  type="button"
  onClick={() => {
    setModal3(false);
    setSelectedFile(null); // Set the selected file to null
  }}
  className="btn btn-outline-danger text-sm p-2"
>
  Discard
</button>

                      <button type="button" onClick={() => setModal3(false)} className="btn btn-primary text-sm ltr:ml-2 rtl:mr-2 p-2">
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

</div>


           
            
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">PACKAGE</div>
                            {/* <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button"> </button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{} </div>
                            <div className="badge bg-white/30">{} </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            {userProfile && userProfile.packageName}
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Capital Amount</div>
                            {/* <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {} </div>
                            <div className="badge bg-white/30">{}</div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            {userProfile && userProfile.capitalAmount}
                        </div>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Wallet Amount</div>
                            <div className="dropdown">
                                {/* <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                    </ul>
                                </Dropdown> */}
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {} </div>
                            <div className="badge bg-white/30">{} </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            {userProfile && userProfile.totalIncome}
                        </div>
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Direct Income</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                        <li>
                                            <button type="button">{}</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {}</div>
                            <div className="badge bg-white/30">{} </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            {userProfile && userProfile.directIncome}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/*  Favorites  */}
                    <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Profile</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark">
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:mb-5">
                            {/*  Bitcoin  */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">{/* <IconBitcoin /> */}</div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">SponserID</h6>
                                        <p className="text-white-dark text-xs">{userProfile && userProfile.ownSponserId}</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">{/* <ReactApexChart series={bitcoin.series} options={bitcoin.options} type="line" height={45} /> */}</div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    {}
                                    <span className="text-success font-normal text-sm">{}</span>
                                </div>
                            </div>
                            {/*  Ethereum*/}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    {/* <div className="shrink-0 w-10 h-10 bg-warning rounded-full grid place-content-center p-2">
                                        <IconEthereum />
                                    </div> */}
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">DailyBonus</h6>
                                        <p className="text-white-dark text-xs"> {userProfile && userProfile.dailyBonus}</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">{/* <ReactApexChart series={ethereum.series} options={ethereum.options} type="line" height={45} /> */}</div>
                                <div className="flex justify-between items-center font-bold text-base">{/* $21,000 <span className="text-danger font-normal text-sm">-1.25%</span> */}</div>
                            </div>
                            {/* Litecoin */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">{/* <IconLitecoin /> */}</div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">Level ROI</h6>
                                        <p className="text-white-dark text-xs">{userProfile && userProfile.levelRoi}</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">{/* <ReactApexChart series={litecoin.series} options={litecoin.options} type="line" height={45} /> */}</div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    {} <span className="text-success font-normal text-sm">{}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Prices  */}
                    <div>
                        <div className="flex items-center mb-5 font-bold">
                            <span className="text-lg">Profile</span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark"></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                            {/*  Binance */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    {/* <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                        <IconBinance />
                                    </div> */}
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">Name</h6>
                                        <p className="text-white-dark text-xs">{userProfile && userProfile.name}</p>
                                    </div>
                                </div>
                                {/* <div className="mb-5 overflow-hidden">
                                    <ReactApexChart series={binance.series} options={binance.options} type="line" height={45} />
                                </div> */}
                                {/* <div className="flex justify-between items-center font-bold text-base">
                                    $21,000 <span className="text-danger font-normal text-sm">-1.25%</span>
                                </div> */}
                            </div>
                            {/*  Tether  */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">{/* <IconTether /> */}</div>
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">Email</h6>
                                        <p className="text-white-dark text-xs"> {userProfile && userProfile.email}</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">{/* <ReactApexChart series={tether.series} options={tether.options} type="line" height={45} /> */}</div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    {} <span className="text-success font-normal text-sm">{}</span>
                                </div>
                            </div>
                            {/*  Solana */}
                            <div className="panel">
                                <div className="flex items-center font-semibold mb-5">
                                    {/* <div className="shrink-0 w-10 h-10 bg-warning rounded-full p-2 grid place-content-center">
                                        <IconSolana />
                                    </div> */}
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6 className="text-dark dark:text-white-light">Phone</h6>
                                        <p className="text-white-dark text-xs">{userProfile && userProfile.phone}</p>
                                    </div>
                                </div>
                                <div className="mb-5 overflow-hidden">{/* <ReactApexChart series={solana.series} options={solana.options} type="line" height={45} /> */}</div>
                                <div className="flex justify-between items-center font-bold text-base">
                                    {} <span className="text-danger font-normal text-sm">{}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row"></div>

                    {/* <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Transactions</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>AMOUNT</th>
                                        <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">#01</td>
                                        <td className="whitespace-nowrap">Oct 08, 2021</td>
                                        <td className="whitespace-nowrap">Eric Page</td>
                                        <td>$1,358.75</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#02</td>
                                        <td className="whitespace-nowrap">Dec 18, 2021</td>
                                        <td className="whitespace-nowrap">Nita Parr</td>
                                        <td>-$1,042.82</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#03</td>
                                        <td className="whitespace-nowrap">Dec 25, 2021</td>
                                        <td className="whitespace-nowrap">Carl Bell</td>
                                        <td>$1,828.16</td>
                                        <td className="text-center">
                                            <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#04</td>
                                        <td className="whitespace-nowrap">Nov 29, 2021</td>
                                        <td className="whitespace-nowrap">Dan Hart</td>
                                        <td>$1,647.55</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#05</td>
                                        <td className="whitespace-nowrap">Nov 24, 2021</td>
                                        <td className="whitespace-nowrap">Jake Ross</td>
                                        <td>$927.43</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">Jan 26, 2022</td>
                                        <td className="whitespace-nowrap">Anna Bell</td>
                                        <td>$250.00</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </div>
  

     

           
        </div>
    );
};

export default Finance;
