import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBuyerName, updateBuyerPhone, updateBuyerLocation, updateDeliveryOption, updatePaymentMethod } from '../../stores/reducers/orderReducer';


const LeftSide = ({ formData, handleChange, errors, handleSubmit }) => (
    <div className='w-full mr-10 mt-5 flex flex-col'>
        <div>
            <h1 className="text-black-700 font-bold text-xl mb-1">Your Information</h1>
        </div>

        <form>
            <div className='flex flex-col space-y-4'>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="email">Email</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Enter email...'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="phoneNumber">Phone Number</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='Enter phone number...'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="location">Location</label>
                    <input className='border border-gray-200 rounded-[10px] h-10 p-1'
                        type="text"
                        id="location"
                        name="location"
                        placeholder='Enter location...'
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="deliveryOption">Delivery Option</label>
                    <select className='border border-gray-200 rounded-[10px] h-10 p-1'
                        id="deliveryOption"
                        name="deliveryOption"
                        value={formData.deliveryOption}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select delivery option...</option>
                        <option value="standard">Standard Delivery</option>
                        <option value="pickup">Pickup</option>
                    </select>
                    {errors.deliveryOption && <p className="text-red-500 text-sm mt-1">{errors.deliveryOption}</p>}
                </div>
                <div className='flex flex-col mb-4 w-full'>
                    <label className='mb-2 text-sm text-gray-500' htmlFor="paymentMethod">Payment Method</label>
                    <select className='border border-gray-200 rounded-[10px] h-10 p-1'
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select payment method...</option>
                        <option value="cash">Cash on delivery</option>
                        <option value="mobileMoney">Mobile Money</option>
                        <option value="bankTransfer">Bank Transfer</option>
                    </select>
                    {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                </div>
            </div>

            <div className='flex justify-center mt-4'>
                <button className='bg-violet-600 hover:bg-yellow-500 text-white rounded-[10px] w-full h-10 p-1' onClick={handleSubmit}>Complete</button>
            </div>
        </form>
    </div>
);

const CheckoutScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        location: '',
        deliveryOption: '',
        paymentMethod: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formData.location) {
            newErrors.location = 'Location is required';
        }
        if (!formData.deliveryOption) {
            newErrors.deliveryOption = 'Delivery option is required';
        }
        if (!formData.paymentMethod) {
            newErrors.paymentMethod = 'Payment method is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        dispatch(updateBuyerName(formData.email));
        dispatch(updateBuyerPhone(formData.phoneNumber));
        dispatch(updateBuyerLocation(formData.location));
        dispatch(updateDeliveryOption(formData.deliveryOption));
        dispatch(updatePaymentMethod(formData.paymentMethod));

        navigate('/confirmation');

        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center py-[100px] px-5">
            <div className="flex flex-col md:flex-row items-start md:justify-between md:space-x-10">
                <img alt="checkout" className='w-[500px] md:h-[500px] h-[20px] mb-5 md:mb-0 rounded-[10px]' src={require('../../assets/images/artisan.png')} />
                <LeftSide formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} />
            </div>
        </div>
    );
};

export default CheckoutScreen;