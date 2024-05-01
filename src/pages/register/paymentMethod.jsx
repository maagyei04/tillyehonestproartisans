import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPic3 from '../../assets/images/register3.png';
import { useSelector, useDispatch } from 'react-redux';
import { setMomoNetwork, setMomoNumber, setBank, setBankAccountNumber, setBankBranch } from '../../stores/reducers/clientReducer';


const PaymentMethod = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { firstName } = useSelector((state) => state.client);


    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (value) => {
        setSelectedOption(value);
        console.log(`Selected option: ${value}`);
    };

    const [formData, setFormData] = useState({
        momoNumber: '',
        bank: '',
        bankAccountNumber: '',
        bankBranch: '',
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

        dispatch(setMomoNetwork(selectedOption),);
        dispatch(setMomoNumber(formData.momoNumber),);
        dispatch(setBank(formData.bank),);
        dispatch(setBankAccountNumber(formData.bankAccountNumber),);
        dispatch(setBankBranch(formData.bankBranch),);

        console.log(formData);
        navigate('/tillyehonestproartisans/business_details');
    };

    return (
        <div className="flex flex-col items-center justify-between py-20 px-4 w-full">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/3 h-auto md:mr-4 mb-4 md:mb-0" src={RegisterPic3} alt="content" />
                <div className="text-center md:text-left md:w-2/3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="font-semibold text-[15px] mb-1">Hi {firstName}, please Choose Payment Options<span className="text-violet-500 italic"></span></h2>

                        <h2 className="font-bold text-[20px] mb-1">Select <span className="text-violet-500 italic">Mobile Money</span> Network</h2>

                        <div className="flex justify-center items-center mt-3 mb-5">
                            <div className="flex space-x-4">
                                <div
                                    className={`w-[110px] h-10 flex justify-center items-center rounded-[20px] cursor-pointer ${selectedOption === 'MTN' ? 'bg-yellow-500 text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => handleOptionClick('MTN')}
                                >
                                    <span className="font-bold">MTN</span>
                                </div>
                                <div
                                    className={`w-[110px] h-10 flex justify-center items-center rounded-[20px] cursor-pointer ${selectedOption === 'Telecel' ? 'bg-red-500 text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => handleOptionClick('Telecel')}
                                >
                                    <span className="font-bold">Telecel</span>
                                </div>
                                <div
                                    className={`w-[110px] h-10 flex justify-center items-center rounded-[20px] cursor-pointer ${selectedOption === 'AirtelTigo' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => handleOptionClick('AirtelTigo')}
                                >
                                    <span className="font-bold">AirtelTigo</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <p className="text-sm font-semibold mb-2">Mobile Money Number:</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="momoNumber"
                                name="momoNumber"
                                value={formData.momoNumber}
                                onChange={handleChange}
                            />

                            <div className="flex flex-row items-center justify-center mt-5 mb-8">
                                <hr className="border-gray-300 w-[140px]" />
                                <div className="text-gray-500 font-semibold ml-5 mr-5">OR</div>
                                <hr className="border-gray-300 w-[140px]" />

                            </div>

                            <p className="text-sm font-semibold mb-2">Bank:</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="bank"
                                name="bank"
                                value={formData.bank}
                                onChange={handleChange}
                            />

                            <p className="text-sm font-semibold mb-2">Account Number:</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="bankAccountNumber"
                                name="bankAccountNumber"
                                value={formData.bankAccountNumber}
                                onChange={handleChange}
                            />

                            <p className="text-sm font-semibold mb-2">Branch:</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="bankBranch"
                                name="bankBranch"
                                value={formData.bankBranch}
                                onChange={handleChange}
                            />

                            <button type='submit' className="bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                        </form>
                    </div>

                </div>


            </div>
        </div>

    );
};

export default PaymentMethod;