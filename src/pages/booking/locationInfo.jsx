import React, { useState } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/authContext';
import { fetchClientData } from '../../stores/actions';
import {
    setBookingCommunity,
    setBookingCountry,
    setBookingDigitalAddress,
    setBookingEmail,
    setBookingHouseNumber,
    setBookingLocationInfo,
    setBookingPhoneNumber,
    setBookingRegion,
    setBookingTown,
    setBookinglandmark,
    setBookingClientId,
    setBookingArtisanId
} from '../../stores/reducers/bookingReducer';

const RightSide = ({ handleSubmit, userLoggedIn, artisan }) => (
    <div className="text-center md:text-left md:w-2/4 flex flex-col md:flex-col items-start">
        <h1 className="text-black-700 font-bold text-xl mb-5">Artisan Details</h1>
        <div className='flex flex-row mb-5'>
            <div className='h-[90px] w-[160px] mr-5'>
                <img className="w-full h-full object-cover rounded-[10px]" src={artisan.passportImage} alt="user_profile" />
            </div>
            <div className='flex flex-col text-left'>
                <h3 className='font-semibold'>{artisan.firstName} {artisan.lastName}</h3>
                <div className='flex'>
                    <p className='text-gray-600 text-[15px] mr-5'>{artisan.businessField}</p>
                    <p className='text-gray-600'>{artisan.businessLocation}</p>
                </div>
                <p className='text-gray-500 text-sm'>I have excellent customer service skills and work prudently to bring my work to completion. I offer excellent value for low cost.</p>
            </div>
        </div>
        <div className='flex flex-col text-left'>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[40px] mr-5 text-gray-500' />
                <p className='text-gray-700'>{artisan.firstName} {artisan.lastName} will have to come and make an estimate about the service first after which payment can be made</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Transportation Fee will be made available by you for {artisan.firstName} to make the estimate</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Artisan will be paid once the entire work is completed and approve by you</p>
            </div>
            <div className={userLoggedIn ? 'hidden' : 'block flex flex-row mb-5'}>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Sign up and keep track of all your booking appointments<br></br><span className='text-violet-600'><Link to={'/register'}>Sign Up Now!</Link></span> </p>
            </div>

        </div>
        <div className='flex flex-row w-full'>
            <button type='submit' className="bg-gray-200 text-black py-3 px-4 rounded-[10px] mr-5 hover:bg-gray-600 w-full">Previous</button>
            <button type='submit' onClick={handleSubmit} className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
        </div>
    </div>
);

const LeftSide = ({ formData, handleChange, userLoggedIn, errors }) => (
    <div className='md:w-3/4 w-full mr-10 mt-5 flex flex-col'>
        <div className={userLoggedIn ? 'hidden' : 'block'}>
            <h1 className="text-black-700 font-bold text-xl mb-1">Personal Information</h1>
            <p className='text-gray-500 text-sm mb-2'>Sign up and keep track of all your booking appointments.  <span className='text-violet-600'><Link to={'/register'}>Sign Up Now!</Link></span></p>
        </div>

        <form>
            <div className={userLoggedIn ? 'hidden' : 'block'}>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="email">Email</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Enter email...'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="phoneNumber">Phone Number</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='Enter phone number...'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
            </div>
            <h1 className="text-black-700 font-bold text-xl mb-1">Work location Information</h1>

            <div className='flex flex-col mb-4 w-full'>
                <label className='mb-2 text-sm text-gray-500' htmlFor="digitalAddress">Digital Address</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                    type="text"
                    id="digitalAddress"
                    name="digitalAddress"
                    placeholder='Enter Digital Address...'
                    value={formData.digitalAddress}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-4 w-full'>
                <label className='mb-2 text-sm text-gray-500' htmlFor="houseNumber">House Number</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    placeholder='Enter House Number...'
                    value={formData.houseNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col mb-4 w-full mr-5'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="cityTown">City / Town</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="cityTown"
                        name="cityTown"
                        placeholder='Enter City or Town...'
                        value={formData.cityTown}
                        onChange={handleChange}
                        required
                    />
                    {errors.cityTown && <p className="text-red-500 text-sm mt-1">{errors.cityTown}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full mr-5'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="region">Region</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="region"
                        name="region"
                        placeholder='Enter Region...'
                        value={formData.region}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="country">Country</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="country"
                        name="country"
                        placeholder='Enter Country...'
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className='flex flex-col mb-4 w-full'>
                <label className='mb-2 text-sm text-gray-500' htmlFor="neighborhoodCommunity">Neighborhood / Community</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                    type="text"
                    id="neighborhoodCommunity"
                    name="neighborhoodCommunity"
                    placeholder='Enter community...'
                    value={formData.neighborhoodCommunity}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-4 w-full'>
                <label className='mb-2 text-sm text-gray-500' htmlFor="landmark">Closest Landmark</label>
                <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                    type="text"
                    id="landmark"
                    name="landmark"
                    placeholder='Enter nearest or closest landmark...'
                    value={formData.landmark}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-4 w-full'>
                <label className='mb-2 text-sm text-gray-500' htmlFor="locationInfo">Extra Information about Location</label>
                <textarea
                    className='border border-gray-200 rounded-[10px] p-2'
                    type="text"
                    id="locationInfo"
                    name="locationInfo"
                    placeholder="Give more information about the location please..."
                    rows={7}
                    value={formData.locationInfo}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    </div>
);

const BookingLocationInfo = () => {
    const { userLoggedIn, currentUser } = useAuth();

    const location = useLocation();
    const { artisan } = location.state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        digitalAddress: '',
        houseNumber: '',
        cityTown: '',
        region: '',
        country: '',
        neighborhoodCommunity: '',
        landmark: '',
        locationInfo: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!userLoggedIn && !formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!userLoggedIn && !formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formData.cityTown) {
            newErrors.cityTown = 'Town is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        if (userLoggedIn) {
            const userId = currentUser.uid;

            const clientData = await fetchClientData(userId);

            console.log(clientData);

            dispatch(setBookingClientId(userId));
            dispatch(setBookingEmail(clientData.email));
            dispatch(setBookingPhoneNumber(clientData.phoneNumber));
        } else {
            dispatch(setBookingEmail(formData.email));
            dispatch(setBookingPhoneNumber(formData.phoneNumber));
        }

        dispatch(setBookingCommunity(formData.neighborhoodCommunity));
        dispatch(setBookingCountry(formData.country));
        dispatch(setBookingDigitalAddress(formData.digitalAddress));
        dispatch(setBookingHouseNumber(formData.houseNumber));
        dispatch(setBookingLocationInfo(formData.locationInfo));
        dispatch(setBookingRegion(formData.region));
        dispatch(setBookingTown(formData.cityTown));
        dispatch(setBookinglandmark(formData.landmark));
        dispatch(setBookingArtisanId(artisan.artisanId));

        console.log(formData);
        console.log(userLoggedIn);

        navigate('/booking/review_info', { state: { artisan: artisan } });
    };

    return (
        <div className="flex flex-col items-center md:justify-center py-[90px] md:px-10 px-5">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <LeftSide formData={formData} handleChange={handleChange} userLoggedIn={userLoggedIn} errors={errors} />
                <RightSide handleSubmit={handleSubmit} userLoggedIn={userLoggedIn} artisan={artisan} />
            </div>
        </div>
    );
};

export default BookingLocationInfo;
