import React, { useState } from 'react';
import RegisterPic2 from '../../assets/images/register2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setLastName, setEmail, setPhoneNumber, setPassword } from '../../stores/reducers/clientReducer';


const Image = () => (
    <div className="text-center md:text-left md:w-2/4 mr-20 flex flex-col md:flex-row items-center">
        <img className="md:h-[520px] md:mr-[60px] mb-4 md:mb-0 hidden md:block" src={RegisterPic2} alt="content" />
    </div>
);

const InfoForm = ({ formData, handleChange, handleSubmit, passwordVisible, togglePasswordVisibility }) => (

    <div className='md:w-2/4 w-full'>
        <h2 className="font-bold text-[30px] mb-1">Personal Information<span className="text-violet-500 italic"></span></h2>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="firstName">First Name</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-2'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="lastName">Surname</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-2'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="phoneNumber">Phone Number</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-2'
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="email">Email</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-2'
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="password">Password</label>
                <div className='relative'>
                    <input className='border border-gray-300 rounded-[10px] h-10 p-2 w-full'
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            <button className='my-5 w-full btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500' type="submit">Next</button>
        </form>
    </div>
);

const PersonalInfo = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { userType } = useSelector((state) => state.client);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

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

        userType === 'client' ?

            navigate('/register/info_review')
            :
            navigate('/register/payment_method');

    };

    return (
        <div className="flex flex-col items-center md:justify-center py-[90px] md:px-10">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <Image />
                <InfoForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} togglePasswordVisibility={togglePasswordVisibility} passwordVisible={passwordVisible} />
            </div>
        </div>
    );
};

export default PersonalInfo;
