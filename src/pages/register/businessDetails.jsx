import RegisterPic4 from '../../assets/images/register4.png';
import { useNavigate } from 'react-router-dom';

const BusinessDetails = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tillyehonestproartisans/info_review');
    }

    return (
        <div className="flex flex-col items-center justify-between py-[100px] px-4 w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/3 h-auto md:mr-4 mb-4 md:mb-0" src={RegisterPic4} alt="content" />
                <div className="text-center md:text-left md:w-2/3 flex flex-col md:flex-row space-y-4 md:space-y-0">
                    <div>
                        <div>
                            <h2 className="font-semibold text-[15px] mb-1">Business Details<span className="text-violet-500 italic"></span></h2>

                            <h2 className="font-bold text-[20px] mb-3">Select <span className="text-violet-500 italic">type of Business</span> below:</h2>

                            <p className="text-sm font-semibold mb-2">Select your Business field</p>

                            <select className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-8 w-full mb-5'>
                                <option value="option1">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                        <span>Option 1</span>
                                    </div>
                                </option>
                                <option value="option2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                        <span>Option 2</span>
                                    </div>
                                </option>
                                <option value="option3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                        <span>Option 3</span>
                                    </div>
                                </option>
                            </select>

                            <p className="text-sm font-semibold mb-2">Location</p>
                            <select className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-8 w-full mb-5'>
                                <option value="option1">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                        <span>Option 1</span>
                                    </div>
                                </option>
                                <option value="option2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                        <span>Option 2</span>
                                    </div>
                                </option>
                                <option value="option3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                        <span>Option 3</span>
                                    </div>
                                </option>
                            </select>

                            <button onClick={handleClick} className="bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default BusinessDetails;