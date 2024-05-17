import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Select, MenuItem } from '@mui/material';


const Complete = () => {
    const bookingStatusArtisan = 'waiting';

    return (
        bookingStatusArtisan === 'waiting' ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Appointment Completion</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>Artisan hasn't completed work yet</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col mb-5">
                            <p className='text-gray-500 text-sm mb-2'>Rate the Artisan</p>
                            <Select
                                value='5'
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select Year' }}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="">
                                    <em>All Ratings</em>
                                </MenuItem>
                                <MenuItem value="2024">4</MenuItem>
                                <MenuItem value="2023">3</MenuItem>
                                <MenuItem value="2022">2</MenuItem>
                                <MenuItem value="2022">1</MenuItem>

                            </Select>
                        </div>
                        <div className="flex flex-col mb-5">
                            <p className='text-gray-500 text-sm mb-2'>Give a Review about the appointments or Artisan</p>
                            <div className='flex flex-col'>
                                <textarea className='border border-gray-300 rounded-[10px] p-2'
                                    id="message"
                                    name="message"
                                    value=''
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <button className='w-full btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500' type="submit">Service Completed</button>

                    </div>
                </div>
            </>
            :
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
    )
}

export default Complete;