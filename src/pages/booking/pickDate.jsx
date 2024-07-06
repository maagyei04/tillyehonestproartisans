import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { setBookingStartDate, setBookingStartTime } from '../../stores/reducers/bookingReducer';
import { useAuth } from '../../contexts/authContext';



const RightSide = ({ handleSubmit, userLoggedIn, artisan }) => (
    <div className="text-center md:text-left md:w-2/6 flex flex-col md:flex-col items-start px-5">
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

const LeftSide = ({ value, setValue, selectedOption, handleOptionClick }) => (
    <div className='md:w-4/6 w-full mt-5 flex flex-col md:px-0'>
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row items-center">
                <div className="text-center md:text-left px-5 md:px-0 md:w-2/4 flex flex-col md:flex-col items-start">
                    <h1 className="text-black-700 font-bold text-lg mb-5">Select Start Date</h1>
                    <div className='rounded-[10px] border border-gray-300 h-auto w-auto p-2 md:p-5 md:mr-2 mr-0 mb-5'>
                        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </div>
                </div>
                <div className='md:w-2/4 w-full px-5 md:px-0 mr-1 flex flex-col'>
                    <h1 className="text-black-700 font-bold text-lg mb-5">Expected Start Time</h1>
                    <div className='flex flex-col md:flex-row'>
                        <div className='rounded-[10px] border border-gray-300 md:h-auto md:w-auto p-2 md:mr-5 mb-5'>
                            <div className={`option ${selectedOption === '6:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('6:00 am')}>
                                6:00 am
                            </div>
                            <div className={`option ${selectedOption === '7:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('7:00 am')}>
                                7:00 am
                            </div>
                            <div className={`option ${selectedOption === '8:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('8:00 am')}>
                                8:00 am
                            </div>
                            <div className={`option ${selectedOption === '9:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('9:00 am')}>
                                9:00 am
                            </div>
                            <div className={`option ${selectedOption === '10:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('10:00 am')}>
                                10:00 am
                            </div>
                            <div className={`option ${selectedOption === '11:00 am' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('11:00 am')}>
                                11:00 am
                            </div>
                        </div>
                        <div className='rounded-[10px] border border-gray-300 h-auto w-auto p-5 md:mr-5 mb-5'>
                            <div className={`option ${selectedOption === '12:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('12:00 pm')}>
                                12:00 pm
                            </div>
                            <div className={`option ${selectedOption === '1:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('1:00 pm')}>
                                1:00 pm
                            </div>
                            <div className={`option ${selectedOption === '2:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('2:00 pm')}>
                                2:00 pm
                            </div>
                            <div className={`option ${selectedOption === '3:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('3:00 pm')}>
                                3:00 pm
                            </div>
                            <div className={`option ${selectedOption === '4:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('4:00 pm')}>
                                4:00 pm
                            </div>
                            <div className={`option ${selectedOption === '5:00 pm' ? 'selected' : ''} rounded-[20px] select border border-gray-300 h-auto w-auto p-2 px-10 mb-2 text-blue-600`} onClick={() => handleOptionClick('5:00 pm')}>
                                5:00 pm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BookingPickDate = () => {
    const { userLoggedIn } = useAuth();

    const location = useLocation();
    const { artisan } = location.state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(dayjs());

    const [selectedOption, setSelectedOption] = useState('8:00 am');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setBookingStartDate(value.format('YYYY-M-D')));
        dispatch(setBookingStartTime(selectedOption));

        console.log(value.format('YYYY-M-D'));
        console.log(selectedOption);

        navigate('/booking/location_info', { state: { artisan: artisan } })

    };

    return (
        <div className="flex flex-col items-center md:justify-center py-[90px] md:px-10">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <LeftSide value={value} setValue={setValue} selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
                <RightSide handleSubmit={handleSubmit} userLoggedIn={userLoggedIn} artisan={artisan} />
            </div>
        </div>
    );
};

export default BookingPickDate;
