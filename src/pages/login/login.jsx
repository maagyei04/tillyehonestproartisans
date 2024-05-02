import { useState } from 'react';
import RegisterPic3 from '../../assets/images/register1.png';
import { useDispatch } from 'react-redux';
import { loginClient } from '../../stores/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginClient(formData));
        console.log(formData);
        navigate('/tillyehonestproartisans')
    };

    return (
        <div className="flex flex-col items-center justify-between py-20 px-4 w-full">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <img className="w-full md:w-2/3 h-auto md:mr-4 mb-4 md:mb-0" src={RegisterPic3} alt="content" />
                <div className="text-center md:text-left md:w-2/3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="font-semibold text-[15px] mb-1">Welcome Back<span className="text-violet-500 italic"></span></h2>

                        <h2 className="font-bold text-[20px] mb-1">Fill the form below to<span className="text-violet-500 italic"> Login</span></h2>

                        <form onSubmit={handleSubmit}>
                            <p className="text-sm font-semibold mb-2">Email</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <p className="text-sm font-semibold mb-2">Password</p>
                            <input className='border border-gray-200 rounded-[10px] h-8 w-full mb-5'
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button type='submit' className="bg-violet-500 text-white py-2 px-4 rounded-[10px] hover:bg-green-600 w-full">Login</button>
                        </form>
                    </div>

                </div>


            </div>
        </div>

    );
};

export default Login;