import React, { useState } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { updateBookingEstimate } from '../../../../../stores/actions';


const ArtisanEstimate = ({ bookingData }) => {
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        bookingEstimateAmount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingEstimate(bookingData.id, formData.bookingEstimateAmount).then(alert('Updating of appointment estimate has been succesful!'))

            alert('Appointment Estimate updated successfully');
        } catch (error) {
            console.error('Error updating appointment estimate:', error);
            alert('Error updating appointment estimate');
        } finally {
            setLoading(false);
        }
    };

    return (
        bookingData.bookingEstimateAmount === 0 ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Create Estimate</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Appointment Total Estimate</label>
                            <input
                                type="tel"
                                name="bookingEstimateAmount"
                                value={formData.bookingEstimateAmount}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <button disabled={loading} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Create Estimate'}{loading && 'Please wait...'}</button>

                        </div>
                    </form>
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Kindly go through the estimate thoroughly
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Estimate cannot be edited after sending
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Estimate will be forwarded to client immediately after creation
                            </p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-lg font-bold">Created Estimate</h1>

                    <h1 className="mb-2 text-sm font-semibold mb-5">Esimated Budget</h1>
                    <div className='mb-10'>
                        <p className='text-gray-500'>Total Amount</p>
                        <p>{bookingData.bookingEstimateAmount}</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Client has received the estimate and is expected to make payment
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You’ll receive part of the budget before your work starts
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You’ll be paid fully once you complete your work
                            </p>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ArtisanEstimate;