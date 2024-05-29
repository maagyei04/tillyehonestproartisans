import { CheckBadgeIcon } from '@heroicons/react/24/solid'


const Payment = ({ bookingData }) => {

    return (
        bookingData.bookingEstimateAmount !== 0 && bookingData.bookingPayment === 'complete' ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold mb-1">Payment Information</h1>

                    <p className='text-gray-500 text-sm mb-2'>Status</p>
                    <div className='bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'>
                        <p>Full Payment</p>
                    </div>

                    <div className='mb-10'>
                        <p className='text-gray-500'>Total Amount Charged</p>
                        <p>GHc 2000</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Client will receive full payment once you confirm that
                                the entire work has been completed
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Open the completion page to confirm the completion of
                                the artisan’s work
                            </p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Payment Information</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingEstimateAmount === 0 ? 'waiting for Estimate' : 'yet to make full payment'}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Client will receive full payment once you confirm that
                                the entire work has been completed
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Open the completion page to confirm the completion of
                                the artisan’s work
                            </p>
                        </div>
                        <div className="flex flex-row mb-5 mt-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You are required to make 70% payment to the Administrator's number below before work, and 30% later after work completion.
                                <br></br>
                                <span className='font-bold text-sm'>MTN MoMo</span>
                                <br></br>
                                <span className='font-bold text-sm'>Name: Esi Gyatowa Sam</span>
                                <br></br>
                                <span className='font-bold text-sm'>Number: +233531293686</span>
                                <br></br>
                                <span>Please use your Name as reference..</span>
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Please reach out to the Administrators after Payment, for them to confirm your payment.
                            </p>
                        </div>

                    </div>
                </div>
            </>
    )
}

export default Payment;