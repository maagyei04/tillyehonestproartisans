import React, { useState, useEffect } from 'react';
import { Bars3BottomRightIcon, XMarkIcon, DevicePhoneMobileIcon, UserIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../services/firebase/auth';

const Header = () => {

    const navigate = useNavigate();

    const { userLoggedIn } = useAuth();

    let Links = [
        { name: "HOME", link: "/tillyehonestproartisans/" },
        { name: "EXPLORE", link: "/tillyehonestproartisans/explore" },
        { name: "ABOUT US", link: "/tillyehonestproartisans/about" },
    ];

    let [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleClick = () => {
        LogoutUser().then(() => { navigate('/') })
    };

    const register = () => {
        navigate('/register');
    };

    useEffect(() => {
        const handleResize = () => {
            // Check if the screen width is less than or equal to a certain value (e.g., 768 for mobile)
            setIsMobile(window.innerWidth <= 768);
        };

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Initial call to handleResize to set the initial state
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold cursor-pointer flex items-center gap-1'>
                    {/*<BookOpenIcon className='w-7 h-7 text-blue-600' />*/}
                    <img src={logo} alt="logo" className='h-10 w-10' />
                    {/*<span className="text-black text-lg font-bold">T&E Honest Pro Artisans</span>*/}
                    {
                        userLoggedIn ?
                            <>
                                <button onClick={handleClick} className={`btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 flex items-center ${isMobile ? 'block' : 'hidden'}`}>
                                    Hi Mike!
                                    <UserIcon className='text-white-600 h-5 w-5 ml-1' />
                                </button>
                            </>
                            :
                            <>
                                <button onClick={register} className={`btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 ${isMobile ? 'block' : 'hidden'}`}>Register Now!</button>
                            </>
                    }
                </div>
                <div className='cursor-pointer flex items-center gap-1'>

                </div>


                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>
                {/* link items */}
                <div className="flex-grow flex justify-center"> {/* Changed here */}
                    <ul className={`md:flex md:items-center md:pb-0 md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'block' : 'hidden'}`}> {/* Adjusted classes */}
                        {
                            Links.map((links) => (
                                <li className='md:ml-8 md:my-0 my-7 font-semibold' key={links.name}> {/* Added key */}
                                    <Link to={links.link} className='text-gray-800 hover:text-violet-400 duration-500'>{links.name}</Link>
                                </li>))
                        }
                    </ul>
                </div>
                {/* buttons */}
                <div className={`md:flex md:items-center items-center md:pb-0 md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'block' : 'hidden'}`}> {/* Adjusted classes */}
                    <button className='btn bg-gray-200 border-gray-400 border-[1px] text-black md:ml-8 font-bold px-3 py-2 rounded-[10px] duration-500 md:static flex items-center '>
                        <DevicePhoneMobileIcon className='text-green-600 h-5 w-5 mr-1' />
                        Download App
                    </button>
                    {
                        userLoggedIn ?
                            <>
                                <button onClick={handleClick} className={`btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 flex items-center ${open ? 'hidden' : 'show'}`}>
                                    Hi Mike!
                                    <UserIcon className='text-white-600 h-5 w-5 ml-1' />
                                </button>
                            </>
                            :
                            <>
                                <button onClick={register} className={`btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 ${open ? 'hidden' : 'show'}`}>Register Now!</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
