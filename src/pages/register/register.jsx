import React, { useState } from 'react';
import RegisterPic from '../../assets/images/register1.png';
import { BriefcaseIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../stores/reducers/clientReducer';
import { Link } from 'react-router-dom';

const Register = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClick = () => {
        if (selectedCategory) {
            dispatch(setUserType(selectedCategory));
            switch (selectedCategory) {
                case 'artisan':
                    navigate('/tillyehonestproartisans')
                    break;
                case 'client':
                    navigate('/tillyehonestproartisans/personal_info');
                    break;

                default:
                    break;
            }
        } else {
            // Handle error or show a message that a category must be selected
        }
    }

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="flex flex-col md:flex-row items-center">
                <img className="w-full md:w-2/3 h-auto md:mr-4 mb-4 md:mb-0 hidden md:block" src={RegisterPic} alt="content" />
                <div className="text-left md:text-left md:w-2/3 flex flex-col md:flex-row items-center">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">Discover <span className="text-violet-500 italic">Artisan Excellence</span> One, </h2>
                        <h2 className="font-bold text-[30px] mb-1"><span className="text-green-500 italic">Service</span> at a Time</h2>

                        <p className="text-sm mb-5">Welcome to TillY&E, the ultimate destination for discovering and connecting with talented artisans offering a diverse range of unique and handcrafted services</p>

                        <div className="container mx-auto px-4 py-2">
                            <h1 className="text-2xl font-semibold mb-2">Select your category</h1>
                            <p className="text-lg mb-4">Select your category, whether you want to join as an Artisan or a Client</p>
                            <div className="mb-4">
                                <label className="flex items-center mb-2">
                                    <div className={`relative rounded-[15px] border border-gray-300 p-4 bg-gray-100 ${selectedCategory === 'artisan' ? 'border-violet-500' : ''}`} onClick={() => handleCategoryChange('artisan')}>
                                        <div className="absolute top-1 left-0 p-2">
                                            {/* Icon */}
                                            <PaintBrushIcon className='h-5 w-5 ml-5 mr-5' />
                                        </div>
                                        <div className="text-lg ml-10 mr-20 font-semibold">Join as an Artisan</div>
                                        <div className="absolute top-1 right-2 p-2">
                                            {/* Radio button */}
                                            <input type="radio" name="category" value='artisan' className="mr-2" />
                                        </div>
                                        <div className="text-left mt-4">
                                            <p className="text-sm text-gray-700">Register as an artisan today and unlock endless opportunities to grow your business, expand your network, and inspire others with your creativity and craftsmanship</p>
                                        </div>
                                    </div>
                                </label>

                                <label className="flex items-center mt-5 mb-2">
                                    <div className={`relative rounded-[15px] border border-gray-300 p-4 bg-gray-100 ${selectedCategory === 'client' ? 'border-violet-500' : ''}`} onClick={() => handleCategoryChange('client')}>
                                        <div className="absolute top-1 left-0 p-2">
                                            {/* Icon */}
                                            <BriefcaseIcon className='h-5 w-5 ml-5 mr-5' />
                                        </div>
                                        <div className="text-lg ml-10 mr-20 font-semibold">Get Started as a Client</div>
                                        <div className="absolute top-1 right-2 p-2">
                                            {/* Radio button */}
                                            <input type="radio" name="category" value='client' className="mr-2" />
                                        </div>
                                        <div className="text-left mt-4">
                                            <p className="text-sm text-gray-700">Register as a client today and gain access to a vibrant community of creative professionals ready to collaborate, customize, and deliver exceptional artistic experiences tailored just for you</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <button onClick={handleClick} className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                        </div>

                        <Link className='font-bold text-[13px] mt-5 ml-5 mb-1' to={'/tillyehonestproartisans/login'}>Do you have an account already? <span className="text-green-500 italic">Login Now</span></Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
