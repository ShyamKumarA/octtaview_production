// import { IRootState, useAppDispatch, useAppSelector } from '../../Slice/index';
// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { setPageTitle, toggleRTL } from '../../Slice/themeConfigSlice';
// import IconMail from '../../components/Icon/IconMail';
// import IconLockDots from '../../components/Icon/IconLockDots';
// import { fetchUser } from '../../Slice/authSlice';

// interface ComponentProps {
//     data?: any;
// }

// const ProofVerify: React.FC<ComponentProps> = () => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const { userInfo } = useAppSelector((state: any) => state.userReducer);

//     useEffect(() => {
//         dispatch(setPageTitle('Login'));
//         if (userInfo) navigate(`/`);
//     }, [userInfo, navigate]);

//     const submitForm = (e: any) => {
//         e.preventDefault();
//         dispatch(fetchUser({ email, password }));
//         // if (userInfo) navigate('/');
//     };

//     return (
//         <div>
//             <div></div>
//             <div className="absolute inset-0">
//                 <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
//             </div>

//             <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
//                 <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
//                 <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
//                 <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
//                 <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
//                 <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
//                     <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
//                         {/*------------------  */}
//                         <div className="mx-auto w-full max-w-[440px]">
//                             <div className="mb-10">
//                                 <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Log In</h1>
//                                 <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
//                             </div>
//                             <form className="space-y-5 dark:text-white" action="#">
//                                 <div>
//                                     <label htmlFor="proof">Proof</label>
//                                     <div className="relative text-white-dark">
//                                         <input
//                                             id="adaare"
//                                             type="email"
//                                             placeholder="Enter Email"
//                                             className="form-input ps-10 placeholder:text-white-dark"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                         <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                             <IconMail fill={true} />
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="Password">Password</label>
//                                     <div className="relative text-white-dark">
//                                         <input
//                                             id="Password"
//                                             type="password"
//                                             placeholder="Enter Password"
//                                             className="form-input ps-10 placeholder:text-white-dark"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                         />
//                                         <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                             <IconLockDots fill={true} />
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <button type="submit" onClick={submitForm} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
//                                     login
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProofVerify;

// import { IRootState, useAppDispatch, useAppSelector } from '../../Slice/index';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../Slice/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { checkNewVerify } from '../../Slice/userSlice';
import { useAppDispatch, useAppSelector } from '../../Slice/index';

interface ComponentProps {
    data?: any;
}

const ProofVerify: React.FC<ComponentProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const { userInfo } = useAppSelector((state: any) => state.getCheckNewVerifySlicereducer);

    useEffect(() => {
        dispatch(setPageTitle('proofverify'));
        if (userInfo) navigate('/');
    }, [userInfo, navigate, dispatch]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (file) {
            dispatch(checkNewVerify({ file }));
            // If needed, add logic to navigate after successful upload
            // if (userInfo) navigate('/');
        } else {
            console.error('No file selected.');
        }
    };

    return (
        <div>
            {/* Your styling and background images can be applied here if needed */}
            <div className="mx-auto w-full max-w-[440px]">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Upload File</h1>
                    <p className="text-base font-bold leading-normal text-white-dark">Select a file to upload</p>
                </div>
                <form className="space-y-5 dark:text-white" action="#">
                    <div>
                        <label htmlFor="file">Please upload a file for Driving License</label>
                        <div className="relative text-white-dark">
                            <input id="file" type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* Placeholder for missing form inputs */}
                    {/* Add your form inputs here if needed */}

                    <button type="button" onClick={handleUpload} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProofVerify;
