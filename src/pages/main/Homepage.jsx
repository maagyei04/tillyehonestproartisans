import React, { useState, useEffect } from 'react';
import framePic from '../../assets/images/frame2.png';
import person2 from '../../assets/images/woodworks.png';
import contentPic from '../../assets/images/carpentry.png';
import verifyImage from '../../assets/images/verifyimage.png';
import artisanPic from '../../assets/images/artisan.png';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { UserPlusIcon, CreditCardIcon, PaperAirplaneIcon, CurrencyDollarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import BookNowButton from '../../components/common/BookNowButton';
import { fetchLimitedArtisanData, fetchBusinessFieldsCategories } from '../../stores/actions';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../stores/reducers/clientReducer';

const HomePage = () => {
    const [artisans, setArtisans] = useState([]);

    const [isMobile, setIsMobile] = useState(false);

    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/explore');
    }

    const handleClick = () => {
        dispatch(setUserType('artisan'));
        navigate('/register/personal_info');
    }

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const artisansData = await fetchLimitedArtisanData(4.5);
                console.log('Fetched artisans:', artisansData); // Log fetched data
                setArtisans(artisansData);
            } catch (error) {
                console.error('Error fetching artisans:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                console.log('Fetched categories:', categoriesData); // Log fetched data
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchArtisans();
        fetchCategories();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    console.log(artisans);

    const categoriesData = [
        { category: 'Plumbing', numberOfPersonnel: '200+ Personnels' },
        { category: 'Plumbing', numberOfPersonnel: '200+ Personnels' },
        { category: 'Plumbing', numberOfPersonnel: '200+ Personnels' },
        { category: 'Plumbing', numberOfPersonnel: '200+ Personnels' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;
    const totalPages = Math.ceil(artisans.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = artisans.slice(indexOfFirstService, indexOfLastService);
    const categoriesServices = categoriesData.slice(indexOfFirstService, indexOfLastService);

    return (
        <div className="flex flex-col items-center justify-center py-40 px-4"> {/* Reduced padding for mobile */}
            {/* Header */}
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center">
                Discover Unique <span className="text-violet-500 italic">Problem Solving</span> Services
            </h1>

            <p className="text-sm md:text-base mb-6 text-center">
                Connect with Talents Artisans and Find the Perfect Service for Your Needs
            </p>

            {/* Search Bar */}
            <div className="flex flex-row md:flex-row md:items-center mb-3"> {/* Adjusted layout for mobile */}
                <input
                    onClick={handleSearchClick}
                    type="text"
                    placeholder="Search For Any Service..."
                    className="flex-1 border border-gray-300 rounded-[10px] px-2 py-2 mb-0 md:mb-0 md:mr-3 w-[250px] md:w-[400px] focus:outline-none"
                />
                <button onClick={handleSearchClick} className="md:ml-0 ml-2 bg-green-500 rounded-[10px] text-white px-4 py-2 hover:bg-violet-600 focus:outline-none">Search</button>
            </div>

            {/* Categories Container */}
            <div className="rounded p-4 w-full flex md:flex-col flex-row md:items-center items-start backgroundImage">
                <h2 className="font-semibold mb-3 md:text-lg text-[15px]">
                    Popular:
                </h2>
                <ul className="flex flex-wrap md:justify-center justify-start ml-5">
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base"><Link to={'/explore'}>Plumbering</Link></li>
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base"><Link to={'/explore'}>Welding</Link></li>
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base"><Link to={'/explore'}>Construction</Link></li>
                </ul>
            </div>
            <img src={framePic} alt='frame-background' className='mb-8' />

            {/*Popular Services Header*/}
            <div className="rounded p-4 w-full flex flex-col items-center"> {/* Centered content in Categories Container */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-3">
                    <div className="mb-0 md:mb-0 md:mr-3">
                        <h1 className="font-bold text-xl md:text-[25px]">Explore Our Popular Services</h1>
                        <p className="text-sm">Below are recommended Services for you</p>
                    </div>
                    <a href="#top" className="text-violet-600 flex items-center">
                        See more
                        <ArrowRightIcon className='h-5 w-5 text-violet-600 ml-3' />
                    </a>
                </div>
            </div>

            {/*Popular Services Contents*/}
            <div className="flex flex-col items-center justify-center py-2 p-0 md:px-2">
                <div className="flex flex-wrap justify-center">
                    {/* Display services data */}
                    {artisans.map((artisan, index) => (
                        <div key={index} className="md:w-1/2 lg:w-1/4 p-2">
                            <div className="rounded-[10px] overflow-hidden shadow-violet-400 shadow-xl bg-white w-[350px] md:w-[300px] h-[400px]">
                                <div className='w-[350px] md:w-[300px] h-[250px]'>
                                    <img className="w-full h-full object-cover" src={artisan.passportImage} alt="Person" />
                                </div>

                                <div className="p-4 w-[350px] md:w-[300px] h-[200px]">
                                    <h2 className="font-semibold text-lg mb-2">{artisan.firstName}</h2>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm text-gray-700 font-semibold">{artisan.businessField}</p>
                                        <p className="text-sm">{artisan.businessLocation}</p>
                                    </div>
                                    <BookNowButton artisan={artisan} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/*How it works*/}
            <div className="flex flex-col mt-8 md:flex-row items-center">
                <img className="w-full md:w-2/4 h-[320px] md:mr-4 mb-4 md:mb-0" src={contentPic} alt="content" />
                <div className="text-left md:text-left md:w-2/4 flex flex-col md:flex-row items-center">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">We Bring <span className="text-violet-500 italic">Creativity</span> to your doorstep</h2>
                        <p className="text-sm mb-8">We are on a mission to connect artisans to their clients all over the world</p>

                        <h2 className="font-semibold text-lg mb-2">How does Tilly&E Work ?</h2>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><UserPlusIcon className='h-5 w-5 ml-5 mr-5' /> Provide your details to sign up.<br></br>Login if you already have an account.</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CreditCardIcon className='h-5 w-5 ml-5 mr-5' />Provide your payment method.<br></br>or details</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><PaperAirplaneIcon className='h-5 w-5 ml-5 mr-5' />Browse and choose an artisan you'd like to<br></br>perform your task for you</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CurrencyDollarIcon className='h-5 w-5 ml-5 mr-5' />Bargain the cost and workmanship or the<br></br>service and make payment.</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CheckBadgeIcon className='h-5 w-5 ml-5 mr-5' />Verify if the work is fully completed by the.<br></br>artisan.</p>

                    </div>
                    <img className={`h-300 w-90 ${isMobile ? 'hidden' : 'block'}`} src={verifyImage} alt="content2" />

                </div>

            </div>



            {/*Category Header*/}
            <div className="rounded p-4 w-full flex mt-8 flex-col items-center"> {/* Centered content in Categories Container */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-3">
                    <div className="mb-2 md:mb-0 md:mr-3">
                        <h1 className="font-bold text-xl md:text-[25px]">Explore Our Categories</h1>
                        <p className="text-sm">Below are some Categories we offer</p>
                    </div>

                    <Link to={'/explore'}><p href="#top" className="text-violet-600 flex items-center">
                        See more
                        <ArrowRightIcon className='h-5 w-5 text-violet-600 ml-3' />
                    </p></Link>
                </div>
            </div>

            {/*Category Contents*/}
            <div className="flex flex-col items-center justify-center py-2 px-2r">
                <div className="flex flex-wrap justify-center">
                    {/* Display services data */}
                    {categories.slice(0, 4).map((category, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-2">
                            <div className="rounded overflow-hidden shadow-lg bg-white">
                                <img className="w-full h-auto" src={person2} alt="Person" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg mb-2">{category}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*Start Earning*/}
            <div className="flex mt-8 flex-col md:flex-row items-center">
                <img className="w-full md:w-2/3 h-[320px] md:mr-4 mb-4 md:mb-0" src={artisanPic} alt="content" />
                <div className="text-left md:text-left md:w-2/3 flex flex-col md:flex-row items-center">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">Start Earning as an <span className="text-violet-500 italic">Artisan</span> today</h2>
                        <button onClick={handleClick} className='btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>Register Now As Artisan!</button>
                        <p className="text-sm mb-8">We are on a mission to connect artisans to their clients all over the world</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><UserPlusIcon className='h-5 w-5 ml-5 mr-5' /> Provide your details to sign up.<br></br>Login if you already have an account.</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CreditCardIcon className='h-5 w-5 ml-5 mr-5' />Provide your payment method.<br></br>or details</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><PaperAirplaneIcon className='h-5 w-5 ml-5 mr-5' />Browse and Select task and services you can<br></br>render based on your location</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CurrencyDollarIcon className='h-5 w-5 ml-5 mr-5' />Bargain the cost and workmanship or the<br></br>service and recieve 30% payment.</p>

                        <p className="text-sm font-semibold mb-4 text-gray-700 flex"><CheckBadgeIcon className='h-5 w-5 ml-5 mr-5' />Get fully paid immediately after the work and<br></br>audition is completed.</p>

                    </div>
                    <img className={`h-300 w-90 ${isMobile ? 'hidden' : 'block'}`} src={verifyImage} alt="content2" />

                </div>

            </div>

        </div>
    );
}

export default HomePage;
