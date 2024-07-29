import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CartContext } from '../../contexts/cartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { orderProduct } from '../../stores/actions';


const OrderReview = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { clearCart } = useContext(CartContext);

    const orderData = useSelector((state) => state.order);

    const [loading, setLoading] = useState(false);

    console.log(orderData);


    const handleClick = async () => {
        try {
            setLoading(true);

            await dispatch(orderProduct());

        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
            clearCart();
            navigate('/order_complete');
        }
    }

    return (
        <div className="flex flex-col items-center justify-between py-[100px] px-4 w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ShoppingBagIcon className="w-full md:w-2/4 h-[520px] md:mr-4 mb-4 md:mb-0 hidden md:block text-violet-600" />
                <div className="text-left md:text-left md:w-2/4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="font-bold text-[30px] mb-1">Summary <span className="text-violet-500 italic">of Order</span></h2>
                        <p className="text-sm mb-8">Confirm and verify your order details</p>

                        <div className="flex justify-between">
                            <span className='font-bold'>Personal Information</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Your Name</span>
                            <span className='font-semibold'>{orderData?.buyerName}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-600'>Phone Number</span>
                            <span className='font-semibold'>{orderData?.buyerPhone}</span>
                        </div>



                        <div className="flex justify-between mt-5">
                            <span className='font-bold'>Payment Method</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Payment Method</span>
                            <span className='font-semibold'>{orderData?.paymentMethod}</span>
                        </div>

                        <div className="mb-8 flex justify-between">
                            <span className='text-gray-600'>Total Amount</span>
                            <span className='font-semibold'>GHc {orderData?.totalAmount}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='font-bold'>Delivery Option</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Delivery Option</span>
                            <span className='font-semibold'>{orderData?.deliveryOption}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-6000'>Delivery Address</span>
                            <span className='font-semibold'>{orderData?.buyerLocation}</span>
                        </div>


                        <div className="flex justify-between mt-5">
                            <span className='font-bold'>Cart Items</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-gray-600'>Total Products</span>
                            <span className='font-semibold'>{orderData?.items.length}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className='text-gray-6000'>Total Quantity</span>
                            <span className='font-semibold'>{orderData?.totalQuantity}</span>
                        </div>



                        <div>
                            <button onClick={handleClick} disabled={loading} className="mt-10 bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">{loading && 'Please wait...'}{orderData?.paymentMethod === 'cashOnDelivery' && 'Complete Order'}{orderData?.paymentMethod === 'mobileMoney' && 'Pay Now'}</button>
                        </div>
                        <p className="font-bold text-[13px] mt-5 ml-5">By continiung you accept & agree with our terms and conditions.<span className="text-green-500 italic"> Learn More</span></p>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default OrderReview;