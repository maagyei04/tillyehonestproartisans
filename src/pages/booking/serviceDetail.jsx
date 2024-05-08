import userPic from '../../assets/images/register2.png';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const LeftSide = () => (
    <div className="text-center md:text-left md:w-2/4 mr-20 flex flex-col md:flex-col items-start">
        <h1 className="text-black-700 font-bold text-xl mb-5">Artisan Details</h1>
        <div className='flex flex-row mb-5'>
            <img alt='user_profile' className='h-[90px] w-[90px] rounded-[10px] mr-5' src={userPic} />
            <div className='flex flex-col text-left'>
                <h3 className='font-semibold'>Emmanuel Mensah</h3>
                <div className='flex'>
                    <p className='text-gray-600 text-[15px] mr-5'>Carpenter</p>
                    <p className='text-gray-600'>Accra</p>
                </div>
                <p className='text-gray-500 text-sm'>I have excellent customer service skills and work prudently to bring my work to completion. I offer excellent value for low cost.</p>
            </div>
        </div>
        <div className='flex flex-col text-left'>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[40px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Emmanuel Mensah will have to come and make an estimate about the service first after which payment can be made</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>You have to an average GHC 50 transportation Fee for Emmanuel to make the estimate</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Artisan will be paid once the entire work is completed and approve by you</p>
            </div>
            <div className='flex flex-row mb-5'>
                <CheckBadgeIcon className='h-[30px] mr-5 text-gray-500' />
                <p className='text-gray-700'>Sign up and keep track of all your booking appointments<br></br><span className='text-violet-600'>Sign Up Now!</span> </p>
            </div>

        </div>
        <div className='flex flex-row w-full'>
            <button type='submit' className="bg-gray-200 text-black py-3 px-4 rounded-[10px] mr-5 hover:bg-gray-600 w-full">Previous</button>
            <button type='submit' className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
        </div>
    </div>
);

const RightSide = () => (
    <div className='md:w-2/4 w-full mr-10 mt-5'>
        <h1 className="text-black-700 font-bold text-xl mb-1">Select your appointment specification</h1>
        <p className='text-gray-500 text-sm'>The information here will give the artisan a idea of the service you’d like, better still the artisan would
            have to come to the site to take the estimate</p>
    </div>
);

const BookingServiceDetail = () => {
    return (
        <div className="flex flex-col items-start md:justify-center py-[90px] px-5 md:px-10">
            <h1 className="text-black-700 font-bold text-xl mb-1">Booking Process</h1>
            <p className='text-gray-500 text-sm'>Complete the forms provided to finish your booking process</p>
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <RightSide />
                <LeftSide />
            </div>
        </div>
    );
};

export default BookingServiceDetail;
