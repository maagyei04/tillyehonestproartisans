import RegisterPic5 from '../../assets/images/register5.png';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerClient } from '../../stores/actions';

const InfoReview = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const clientData = useSelector((state) => state.client);

    const handleClick = () => {
        dispatch(registerClient(clientData));
        navigate('/tillyehonestproartisans/');
    }

    return (
        <div className="flex flex-col items-center justify-between py-[100px] px-4 w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/3 h-auto md:mr-4 mb-4 md:mb-0" src={RegisterPic5} alt="content" />
                <div className="text-center md:text-left md:w-2/3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">Summary, <span className="text-violet-500 italic">Terms & Conditions</span></h2>
                        <p className="text-sm mb-8">Confirm and verify your details</p>

                        <div className="flex justify-between">
                            <span className='font-bold'>Personal Information</span>
                            <span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>First Name</span>
                            <span className='font-semibold'>{clientData.firstName}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-600'>Surname</span>
                            <span className='font-semibold'>{clientData.lastName}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-600'>Email</span>
                            <span className='font-semibold'>{clientData.email}</span>
                        </div>

                        <div className="mb-8 flex justify-between">
                            <span className='text-gray-600'>Phone Number</span>
                            <span className='font-semibold'>{clientData.phoneNumber}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='font-bold'>Payment Method</span>
                            <span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Mobile Network</span>
                            <span className='font-semibold'>{clientData.momoNetwork}</span>
                        </div>

                        <div className="mb-8 flex justify-between">
                            <span className='text-gray-600'>Phone Number</span>
                            <span className='font-semibold'>{clientData.momoNumber}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='font-bold'>Business Details</span>
                            <span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Field</span>
                            <span className='font-semibold'>{clientData.businessField}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-600'>Location</span>
                            <span className='font-semibold'>{clientData.businessLocation}</span>
                        </div>

                        <button onClick={handleClick} className="mt-20 bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Submit</button>
                        <p className="font-bold text-[13px] mt-5 ml-5">By continiung you accept & agree with our terms and conditions.<span className="text-green-500 italic"> Learn More</span></p>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default InfoReview;