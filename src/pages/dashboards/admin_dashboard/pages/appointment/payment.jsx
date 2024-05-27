import React, { useState } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { updateBookingPayment } from '../../../../../stores/actions';


const ArtisanPayment = ({ bookingData }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingPayment(bookingData.id, 'half');

            alert('Appointment Payment Status updated successfully');
        } catch (error) {
            console.error('Error updating appointment payment status:', error);
            alert('Error updating appointment payment status');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit2 = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingPayment(bookingData.id, 'complete');

            alert('Appointment Payment Status updated successfully');
        } catch (error) {
            console.error('Error updating appointment payment status:', error);
            alert('Error updating appointment payment status');
        } finally {
            setLoading(false);
        }
    };

    return (
        bookingData.bookingPayment !== 'complete' ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold mb-1">Payment Information</h1>

                    <p className='text-gray-500 text-sm mb-2'>Status</p>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingPayment === '' ? 'No Payment' : '' || bookingData.bookingPayment === 'half' ? '70% Payment Made' : ''}</p>
                    </div>

                    <div className='flex flex-row mb-2'>
                        {bookingData.bookingPayment !== 'complete' && bookingData.bookingPayment !== 'half' &&
                            < button disabled={loading} type='submit' onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Mark as 70% Paid'}{loading && 'Please wait...'}</button>
                        }
                        {bookingData.bookingPayment === 'half' &&
                            <button disabled={loading} type='submit' onClick={handleSubmit2} className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Full Payment'}{loading && 'Please wait...'}</button>
                        }
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Total Amount Charged</p>
                        <p>{bookingData.bookingEstimateAmount === 0 ? 'Estimate yet to be created' : 'GHC ' + bookingData.bookingEstimateAmount + '.00'}</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Artisan's Share</p>
                        <p>90% of total Amount Charged</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Management Fee</p>
                        <p>10% of total Amount Charged</p>
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
                                Mark payment as 70% or full payment, after you've recieved payment from client.
                            </p>
                        </div>
                    </div>
                </div >
            </>
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold mb-1">Payment Information</h1>

                    <p className='text-gray-500 text-sm mb-2'>Status</p>
                    <div className='bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingPayment === 'complete' ? 'Full Payment Has Been Made' : '' || bookingData.bookingPayment === 'half' ? '70% Payment' : ''}</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Total Amount Charged</p>
                        <p>{bookingData.bookingEstimateAmount === 0 ? 'Estimate yet to be created' : 'GHC ' + bookingData.bookingEstimateAmount + '.00'}</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Artisan's Share</p>
                        <p>90% of total Amount Charged</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Management Fee</p>
                        <p>10% of total Amount Charged</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Client has made payment
                            </p>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ArtisanPayment;