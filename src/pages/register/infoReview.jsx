import { useState } from 'react';
import RegisterPic5 from '../../assets/images/register5.png';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { registerClient, registerArtisan } from '../../stores/actions';
import { useNavigate, Link } from 'react-router-dom';
import { setFirstName, setLastName, setPhoneNumber, setEmail, setPassword } from '../../stores/reducers/artisanReducer';

const InfoReview = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const clientData = useSelector((state) => state.client);

    dispatch(setFirstName(clientData.firstName));
    dispatch(setLastName(clientData.lastName));
    dispatch(setEmail(clientData.email));
    dispatch(setPassword(clientData.password));
    dispatch(setPhoneNumber(clientData.phoneNumber));

    const artisanData = useSelector((state) => state.artisan);

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);

            if (clientData.userType === 'client') {
                await dispatch(registerClient(clientData));
                navigate('/');

            } else {
                await dispatch(registerArtisan(artisanData));
                navigate('/register/register_complete');

            }

        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    }
    console.log(artisanData);
    console.log(clientData);

    return (
        <div className="flex flex-col items-center justify-between py-[100px] px-4 w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/4 h-[520px] md:mr-4 mb-4 md:mb-0 hidden md:block" src={RegisterPic5} alt="content" />
                <div className="text-left md:text-left md:w-2/4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">Summary, <span className="text-violet-500 italic">Terms & Conditions</span></h2>
                        <p className="text-sm mb-8">Confirm and verify your details</p>

                        <div className="flex justify-between">
                            <span className='font-bold'>Personal Information</span>
                            <Link to={'/register/personal_info'}><span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span></Link>
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

                        {
                            clientData.userType === 'artisan' ?
                                <>
                                    <div className="flex justify-between">
                                        <span className='font-bold'>Payment Method</span>
                                        <Link to={'/register/payment_method'}><span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span></Link>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className='text-gray-600'>Mobile Network</span>
                                        <span className='font-semibold'>{artisanData.momoNetwork}</span>
                                    </div>

                                    <div className="mb-8 flex justify-between">
                                        <span className='text-gray-600'>Phone Number</span>
                                        <span className='font-semibold'>{artisanData.momoNumber}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className='font-bold'>Business Details</span>
                                        <Link to={'/register/business_details'}><span><PencilIcon className='h-4 w-4 ml-5 mr-5' /></span></Link>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className='text-gray-600'>Field</span>
                                        <span className='font-semibold'>{artisanData.businessField}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className='text-gray-600'>Location</span>
                                        <span className='font-semibold'>{artisanData.businessLocation}</span>
                                    </div>
                                </>
                                :
                                <>
                                    ''
                                </>

                        }
                        <div>
                            <button onClick={handleClick} disabled={loading} className="mt-20 bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">{!loading && 'Submit'}{loading && 'Please wait...'}</button>
                        </div>
                        <p className="font-bold text-[13px] mt-5 ml-5">By continiung you accept & agree with our terms and conditions.<span className="text-green-500 italic"> Learn More</span></p>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default InfoReview;