import React, { useState } from 'react';
import userPic from '../../assets/images/register2.png';
import { CheckBadgeIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { bookArtisan } from '../../stores/actions';
import { useAuth } from '../../contexts/authContext';



const RightSide = ({ handleClick, loading, userLoggedIn, artisan }) => (
    <div className="text-center md:text-left md:w-2/4 flex flex-col md:flex-col items-start">
        <h1 className="text-black-700 font-bold text-xl mb-5">Artisan Details</h1>
        <div className='flex flex-row mb-5'>
            <img alt='user_profile' className='h-[90px] w-[90px] rounded-[10px] mr-5' src={userPic} />
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
                <p className='text-gray-700'>You have to an average GHC 50 transportation Fee for {artisan.firstName} to make the estimate</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Artisan will be paid once the entire work is completed and approve by you</p>
            </div>
            <div className={userLoggedIn ? 'hidden' : 'block flex flex-row mb-5'}>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Sign up and keep track of all your booking appointments<br></br><span className='text-violet-600'><Link to={'/tillyehonestproartisans/register'}>Sign Up Now!</Link></span> </p>
            </div>

        </div>
        <div className='flex flex-row w-full'>
            <button onClick={handleClick} disabled={loading} className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">{!loading && 'Finish Booking!'}{loading && 'Please wait...'}</button>
        </div>
    </div>
);

const LeftSide = ({ bookingData }) => (
    <div className='md:w-3/4 w-full mr-10 mt-5 flex flex-col'>
        <div>
            <h1 className="text-black-700 font-bold text-xl mb-1">Confirmation and Verification</h1>
            <p className='text-gray-500 text-sm mb-5'>Confirm and verify your details</p>
        </div>
        <div>
            <div className="flex justify-between">
                <span className='font-bold'>Service Information</span>
                <Link to={'/tillyehonestproartisans/booking/service_detail'}><span><PencilIcon className='h-3 w-4 ml-5 mr-5' /></span></Link>
            </div>
            <div className="flex flex-col justify-between mb-5">
                <span className='text-gray-600'>Service Detail</span>
                <span className='font-semibold'>
                    <textarea contentEditable="false" rows={4} className='w-full'>
                        {bookingData.bookingServiceDetail}
                    </textarea>
                </span>
            </div>

            <div className="flex justify-between">
                <span className='font-bold'>Date & Time</span>
                <Link to={'/tillyehonestproartisans/booking/pick_date'}><span><PencilIcon className='h-3 w-4 ml-5 mr-5' /></span></Link>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Estimate Date</span>
                <span className='font-semibold'>{bookingData.bookingStartDate}</span>
            </div>
            <div className="flex justify-between mb-5">
                <span className='text-gray-600'>Start Time</span>
                <span className='font-semibold'>{bookingData.bookingStartTime}</span>
            </div>

            <div className="flex justify-between">
                <span className='font-bold'>Location Information</span>
                <Link to={'/tillyehonestproartisans/booking/location_info'}><span><PencilIcon className='h-3 w-4 ml-5 mr-5' /></span></Link>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Digital Address</span>
                <span className='font-semibold'>{bookingData.bookingDigitalAddress}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>House Number</span>
                <span className='font-semibold'>{bookingData.bookingHouseNumber}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>City / Town</span>
                <span className='font-semibold'>{bookingData.bookingTown}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Region</span>
                <span className='font-semibold'>{bookingData.bookingRegion}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Country</span>
                <span className='font-semibold'>{bookingData.bookingCountry}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Neighborhood / Community</span>
                <span className='font-semibold'>{bookingData.bookingCommunity}</span>
            </div>
            <div className="flex justify-between">
                <span className='text-gray-600'>Closest Landmark</span>
                <span className='font-semibold'>{bookingData.bookingLandmark}</span>
            </div>
            <div className="flex flex-col mb-5">
                <span className='text-gray-600'>Extra Information about Location</span>
                <span className='font-semibold'>
                    <textarea contentEditable="false" rows={5} className='w-full'>
                        {bookingData.bookingLocationInfo}
                    </textarea>
                </span>
            </div>

        </div>
    </div>
);

const BookingReview = () => {
    const { userLoggedIn } = useAuth();

    const location = useLocation();
    const { artisan } = location.state;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const bookingData = useSelector((state) => state.booking);

    const [loading, setLoading] = useState(false);


    const handleClick = async () => {
        try {
            setLoading(true);

            dispatch(bookArtisan(bookingData));

            navigate('/tillyehonestproartisans/explore');
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    }
    console.log(bookingData);

    return (
        <div className="flex flex-col items-center md:justify-center py-[90px] md:px-10 px-5">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <LeftSide bookingData={bookingData} />
                <RightSide handleClick={handleClick} loading={loading} userLoggedIn={userLoggedIn} artisan={artisan} />
            </div>
        </div>
    );
};

export default BookingReview;