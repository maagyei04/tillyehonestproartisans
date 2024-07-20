import { useState, useEffect } from 'react';
import RegisterPic4 from '../../assets/images/register4.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBusinessField, setBusinessLocation, setBusinessFieldSecondary } from '../../stores/reducers/artisanReducer';
import { fetchBusinessFieldsCategories } from '../../stores/actions';

const BusinessDetails = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const { firstName } = useSelector((state) => state.client);

    const [optionData, setOptinData] = useState({
        businessField: '',
        businessLocation: '',
        businessFieldSecondary: '',
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
        dispatch(setBusinessFieldSecondary(optionData.businessFieldSecondary),);

        console.log(optionData);
        navigate('/register/info_review');
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

                            <p className="text-sm font-semibold mb-2">Select your Business field (Primary & Secondary)</p>

                            <form onSubmit={handleSubmit}>
                                <p className="text-sm font-semibold mb-2">Primary Business Field</p>
                                <select
                                    className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-10 w-full mb-5'
                                    value={optionData.businessField}
                                    onChange={handleFieldChange}
                                    name='businessField'
                                    required
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-4 h-4 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'yellow'}-500`}></div>
                                                <span>{category}</span>
                                            </div>
                                        </option>
                                    ))}
                                </select>

                                <p className="text-sm font-semibold mb-2">Secondary Business Field</p>
                                <select
                                    className='border border-gray-200 text-sm font-semibold mb-2 rounded-[10px] h-10 w-full mb-5'
                                    value={optionData.businessFieldSecondary}
                                    onChange={handleFieldChange}
                                    name='businessFieldSecondary'
                                    required
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-4 h-4 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'yellow'}-500`}></div>
                                                <span>{category}</span>
                                            </div>
                                        </option>
                                    ))}
                                </select>

                                <p className="text-sm font-semibold mb-2">Location</p>
                                <div className='flex flex-col mb-8 w-full'>
                                    <input
                                        className='border border-gray-200 font-bold rounded-[10px] h-10 p-2'
                                        type="text"
                                        id="businessLocation"
                                        name="businessLocation"
                                        value={optionData.businessLocation}
                                        onChange={handleLocationChange}
                                        required
                                    />

                                </div>

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