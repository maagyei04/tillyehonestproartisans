import React, { useState } from 'react';
import RegisterPic2 from '../../assets/images/register2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName, setEmail, setPhoneNumber, setPassword } from '../../stores/reducers/clientReducer';

const PersonalInfo = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

        dispatch(setFirstName(formData.firstName),);
        dispatch(setLastName(formData.lastName),);
        dispatch(setPhoneNumber(formData.phoneNumber),);
        dispatch(setEmail(formData.email),);
        dispatch(setPassword(formData.password),);

        console.log(formData);
        navigate('/tillyehonestproartisans/payment_method');
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
                                    <label className='mb-2' htmlFor="lastName">Surname</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="phoneNumber">Phone Number</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="email">Email</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="password">Password</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2' htmlFor="confirmPassword">Confirm Password</label>
                                    <input className='border border-gray-200 rounded-[10px] h-8 w-full'
                                        type="text"
                                        id="confirmPassword"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type='submit' className="bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
