import { CheckBadgeIcon } from '@heroicons/react/24/solid'


const ArtisanPayment = ({ bookingData }) => {

    return (
        bookingData.bookingPayment !== 'complete' ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold mb-1">Payment Information</h1>

                    <p className='text-gray-500 text-sm mb-2'>Status</p>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingPayment === '' ? 'No Payment' : '' || bookingData.bookingPayment === 'half' ? 'Half Payment' : ''}</p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-gray-500'>Total Amount Charged</p>
                        <p>{bookingData.bookingEstimateAmount === 0 ? 'Create Estimate in previous page' : 'GHC ' + bookingData.bookingEstimateAmount + '.00'}</p>
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
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Payment Information</h1>
                    <p className='text-gray-500 text-sm mb-2'>Status</p>
                    <div className='bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingPayment === 'complete' ? 'Full Payment' : ''}</p>
                    </div>
                    <div className='mb-5'>
                        <p className='text-gray-500'>Total Amount Charged</p>
                        <p>{bookingData.bookingEstimateAmount}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Check your payment account to confirm the total payment
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Your appointment has been successfully completed
                            </p>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ArtisanPayment;