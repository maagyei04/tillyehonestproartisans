import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../stores/actions';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../services/firebase/auth';


const AdminLogin = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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
        try {
            setLoading(true);

            e.preventDefault();

            const adminData = await loginAdmin(formData) ?? '';

            console.log(adminData);

            const {
                userType,
            } = adminData;

            userType === 'admin'
                ?
                navigate('/admin_dashboard')
                :
                LogoutUser().then(() => { navigate('/login'); console.log('logged out...') })

        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className='md:w-4/4 w-full md:px-0 px-5 items-center justify-center shadow shadow-lg flex py-20 md:py-40'>
            <form className='md:w-2/4 w-full bg-white shadow shadow-lg p-5 rounded-[10px]' onSubmit={handleSubmit}>
                <h1 className='font-bold text-lg text-center'>Admin Login</h1>

                <div className='flex flex-col mb-8 w-full'>
                    <label className='mb-2' htmlFor="email">Email</label>
                    <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-8 w-full'>
                    <label className='mb-2' htmlFor="password">Password</label>
                    <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' disabled={loading} className='bg-violet-500 text-white hover:bg-green-500 w-full p-2 rounded mb-3'>{!loading && 'LOGIN'}{loading && 'PLEASE WAIT...'}</button>
            </form>
        </div>
    );
};

export default AdminLogin;
