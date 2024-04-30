import React, { useState } from 'react';
import RegisterPic2 from '../../assets/images/register2.png';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tillyehonestproartisans/payment_method');
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center justify-between py-20 px-4 w-full">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/3 h-auto md:mr-[60px] mb-4 md:mb-0" src={RegisterPic2} alt="content" />
                <div className="text-center md:text-left md:w-2/3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <div>
                            <h2 className="font-semibold text-[20px] mb-1">Personal Information<span className="text-white italic">.............................</span></h2>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">First Name</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">Surname</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">Phone Number</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">Email</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">Password</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="firstName">Confirm Password</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button onClick={handleClick} className="bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
