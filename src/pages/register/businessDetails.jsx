import { useState } from 'react';
import RegisterPic4 from '../../assets/images/register4.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBusinessField, setBusinessLocation } from '../../stores/reducers/artisanReducer';

const BusinessDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { firstName } = useSelector((state) => state.client);

    const [optionData, setOptinData] = useState({
        businessField: '',
        businessLocation: '',
    });

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setOptinData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setOptinData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setBusinessField(optionData.businessField),);
        dispatch(setBusinessLocation(optionData.businessLocation),);

        console.log(optionData);
        navigate('/tillyehonestproartisans/info_review');
    };


    return (
        <div className="flex flex-col items-center justify-center py-20 px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className='text-center md:text-left mt-5 md:h-4/4 md:w-2/4 mr-10 flex flex-col md:flex-row items-center'>
                    <img className="md:h-3/4 mb-4 md:mb-0 hidden md:block" src={RegisterPic4} alt="content" />
                </div>
                <div className="md:w-2/4">
                    <div>
                        <div>
                            <h2 className="font-semibold text-[15px] mb-1">{firstName} What's your Business Details<span className="text-violet-500 italic"></span></h2>

                            <h2 className="font-bold text-[20px] mb-3">Select <span className="text-violet-500 italic">type of Business</span> below:</h2>

                            <p className="text-sm font-semibold mb-2">Select your Business field</p>

                            <form onSubmit={handleSubmit}>
                                <select className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-10 w-full mb-5'
                                    value={optionData.businessField}
                                    onChange={handleFieldChange}
                                    name='businessField'
                                >
                                    <option value="Carpentry">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                            <span>Carpentry</span>
                                        </div>
                                    </option>
                                    <option value="Plumbing">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                            <span>Plumbing</span>
                                        </div>
                                    </option>
                                    <option value="Construction">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                            <span>Construction</span>
                                        </div>
                                    </option>
                                </select>

                                <p className="text-sm font-semibold mb-2">Location</p>
                                <select className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-10 w-full mb-5'
                                    value={optionData.businessLocation}
                                    onChange={handleLocationChange}
                                    name='businessLocation'
                                >
                                    <option value="Tema">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                            <span>Tema</span>
                                        </div>
                                    </option>
                                    <option value="Accra">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                            <span>Accra</span>
                                        </div>
                                    </option>
                                    <option value="Kumasi">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                            <span>Kumasi</span>
                                        </div>
                                    </option>
                                </select>

                                <button type='submit' className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default BusinessDetails;