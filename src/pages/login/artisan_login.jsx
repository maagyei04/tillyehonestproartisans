import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginArtisan } from '../../stores/actions';
import { useNavigate, Link } from 'react-router-dom';
import { LogoutUser } from '../../services/firebase/auth';

const ArtisanLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const artisanData = await loginArtisan(formData) ?? '';

            if (artisanData.userType === 'artisan') {
                navigate('/artisan_dashboard');
            } else {
                await LogoutUser();
                setError('Wrong email or password');
                console.log('logged out...');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='md:w-4/4 w-full md:px-0 px-5 items-center justify-center shadow shadow-lg flex py-20 md:py-40'>
            <form className='md:w-2/4 w-full bg-white shadow shadow-lg p-5 rounded-[10px]' onSubmit={handleSubmit}>
                <h1 className='font-bold text-lg text-center'>Artisan Login</h1>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <div className='flex flex-col mb-8 w-full'>
                    <label className='mb-2' htmlFor="email">Email</label>
                    <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-8 w-full'>
                    <label className='mb-2' htmlFor="password">Password</label>
                    <div className='relative'>
                        <input className='border border-gray-300 rounded-[10px] h-10 p-2 w-full'
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type='submit' disabled={loading} className='bg-violet-500 text-white hover:bg-green-500 w-full p-2 rounded mb-3'>
                    {loading ? 'PLEASE WAIT...' : 'LOGIN'}
                </button>
                <p>Don't have an Account yet? <span className='text-green-600 hover:text-gray-300 italic font-bold'><Link to={'/register'}>Register here!</Link></span></p>
            </form>
        </div>
    );
};

export default ArtisanLogin;
