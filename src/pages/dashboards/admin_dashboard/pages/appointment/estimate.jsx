import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const Estimate = ({ bookingData }) => {

    return (
        bookingData.bookingEstimateAmount === 0 ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Estimate Details</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>Waiting for estimate</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You will be able to go through appointments estimate and make payment for work to begin once the artisan sends the estimate
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Appointment will be cancelled if estimate is not ready after the first 2 weeks
                            </p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Estimate Details</h1>
                    <div className='bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'>
                        <p>Done</p>
                    </div>

                    <h1 className="mb-2 text-sm font-bold">Esimated Budget</h1>
                    <div className='mb-10'>
                        <p className='text-gray-500'>Total Amount</p>
                        <p>{bookingData.bookingEstimateAmount}</p>
                    </div>



                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You can continue to next tab, to make payment please
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Appointment will be cancelled if estimate is not ready after the first 2 weeks
                            </p>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Estimate;