import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../stores/actions';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!email) {
            setMessage('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Attempting to send reset email to:', email);
            const result = await sendPasswordResetEmail(email);
            setMessage(result.message);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='md:w-4/4 w-full md:px-0 px-5 items-center justify-center shadow shadow-lg flex py-20 md:py-40 backgroundImage2 min-h-screen'>
            <form onSubmit={handleSubmit} className="md:w-2/4 w-full bg-white shadow shadow-lg p-5 rounded-[10px]">
                <h2 className="mb-4 text-2xl">Reset Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </div>
                {message && <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                <div className="mt-4">
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Back to Home
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;