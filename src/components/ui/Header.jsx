import React, { useState, useEffect, useContext } from 'react';
import { Bars3BottomRightIcon, XMarkIcon, DevicePhoneMobileIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/tillye_logo.jpg';
import { useAuth } from '../../contexts/authContext';
import { CartContext } from '../../contexts/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../services/firebase/auth';
import { useSelector } from 'react-redux';
import { fetchClientData, fetchArtisanData } from '../../stores/actions';

const Header = () => {

    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const { userLoggedIn, currentUser } = useAuth();

    const clientData = useSelector((state) => state.clientInfo.clientData) ?? '';
    const artisanData = useSelector((state) => state.artisanInfo.artisanData) ?? '';


    const {
        firstName,
    } = clientData;


    let Links = [
        { name: "HOME", link: "/" },
        { name: "EXPLORE", link: "explore" },
        { name: "SHOP", link: "shop" },
        { name: "ABOUT US", link: "about" },

    ];

    let [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [userData, setUserData] = useState([]);

    const handleClick = () => {
        userLoggedIn &&
            userData.userType === 'client' &&
            navigate('/client_dashboard')

        userLoggedIn &&
            userData.userType === 'artisan' &&
            navigate('/artisan_dashboard')
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


    useEffect(() => {
        const getUserData = async () => {
            if (userLoggedIn && currentUser?.uid) {
                try {
                    // Try to fetch client data
                    const clientData = await fetchClientData(currentUser.uid);
                    setUserData(clientData);
                } catch (clientError) {
                    console.error('Error fetching client data:', clientError);

                    try {
                        // If client data fetch fails, try to fetch artisan data
                        const artisanData = await fetchArtisanData(currentUser.uid);
                        setUserData(artisanData);
                    } catch (artisanError) {
                        console.error('Error fetching artisan data:', artisanError);
                    }
                }
            }
        };

        getUserData();
    }, [userLoggedIn, currentUser]);



    return (
        <div>
            <div className='w-full fixed top-0 left-0 justify-center text-center bg-yellow-500'>
                {!isMobile && <p>Are you having an issue or challenge? Contact Us On<a href='tel:+447385630981' className='font-bold text-black'> +44 7385 630981</a></p>}
                {isMobile && <p>Contact Us On<a href='tel:+447385630981' className='font-bold text-black'> +44 7385 630981</a></p>}
            </div>
            <div className='shadow-md w-full fixed top-5 left-0'>
                <div className='md:flex items-center justify-between bg-white md:px-10 px-7 md:py-0'>
                    {/* logo section */}
                    <div className='font-bold cursor-pointer flex items-center gap-1'>
                        {/*<BookOpenIcon className='w-7 h-7 text-blue-600' />*/}
                        <Link to={'/'}>
                            <img src={logo} alt="logo" className='h-[60px] w-[60px] rounded-[10px] m-2' />

                        </Link>
                        {/*<span className="text-black text-lg font-bold">T&E Honest Pro Artisans</span>*/}
                    </div>


                    {/* Menu icon */}
                    <div className='flex flex-row absolute right-20 top-5'>
                        {
                            userLoggedIn ?
                                <>
                                    <button onClick={handleClick} className={`btn bg-yellow-500 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 flex ${isMobile ? 'block' : 'hidden'}`}>
                                        <UserIcon className='h-5 w-5 ml-1 mr-2' />
                                        Dashboard
                                    </button>
                                </>
                                :
                                <>
                                    <button onClick={register} className={`btn bg-yellow-500 md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 ${isMobile ? 'block' : 'hidden'}`}>Register Now!</button>
                                </>
                        }
                    </div>
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
                                    <li onClick={() => setOpen(!open)} className='md:ml-8 md:my-0 my-7 font-semibold' key={links.name}> {/* Added key */}
                                        <Link to={links.link} className='text-gray-800 hover:text-violet-400 duration-500 text-lg'>{links.name}</Link>
                                    </li>))
                            }

                        </ul>

                    </div>
                    {/* buttons */}
                    <div className={`md:flex md:items-center items-left md:pb-0 md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'block' : 'hidden'}`}> {/* Adjusted classes */}
                        <button onClick={() => navigate('/cart')} className='btn bg-gray-200 border-gray-400 border-[1px] text-black md:ml-8 font-bold ml-20 md:ml-0 px-10 py-2 rounded-[10px] duration-500 md:static flex items-center'>
                            <ShoppingBagIcon className='text-green-600 h-5 w-5 mr-1' />
                            Cart ({cart.length})
                        </button>
                        {
                            userLoggedIn ?
                                <>
                                    <button onClick={handleClick} className={`btn bg-yellow-500 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 flex items-center ${open ? 'hidden' : 'show'}`}>
                                        Dashboard
                                        <UserIcon className='h-5 w-5 ml-1' />
                                    </button>
                                </>
                                :
                                <>
                                    <button onClick={register} className={`btn bg-yellow-500 md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500 ${open ? 'hidden' : 'show'}`}>Register Now!</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
