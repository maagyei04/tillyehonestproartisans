import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import { fetchAllOrdersByUserId, fetchAllProductsByUserId } from '../../../../../stores/actions';
import { useAuth } from '../../../../../contexts/authContext';


const containerStyle = {
    backgroundColor: 'white',
    padding: '40px',
    margin: '8px 0',
    borderRadius: '10px',
};

const ShopSummaryTable = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchAllOrdersByUserId(userId)
                .then(fetchedOrders => {
                    setOrders(fetchedOrders);
                    console.log(fetchedOrders);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchAllProductsByUserId(userId)
                .then(fetchedProducts => {
                    setProducts(fetchedProducts);
                    console.log(fetchedProducts);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [userId]);

    const totalOrders = orders.length;
    const totalProducts = products.length;
    const completedOrders = orders.filter(order => order.OrderPaymentStatus === "complete");
    const completedOrdersCount = completedOrders.length;
    const totalRevenue = completedOrdersCount > 0
        ? completedOrders.reduce((acc, order) => acc + parseFloat(order.OrderTotalPrice || 0), 0)
        : 0;

    return (
        <div className="">
            <div>
                <Typography variant="h2" gutterBottom className="font-bold text-xl">
                    Summary
                </Typography>

                <Box className="flex flex-wrap -mx-2">
                    <Box className="shadow-xl shadow-black-600 w-full md:w-1/5 px-2 mb-4 mr-5" sx={{ ...containerStyle }}>
                        <p className="mb-2">Total Orders</p>
                        <p className="mb-2 font-bold">{totalOrders}</p>
                        <p className="text-sm text-gray-500">
                            <span className="text-blue-700">Approved</span> orders
                        </p>
                    </Box>
                    <Box className="shadow-xl shadow-black-600 w-full md:w-3/5 px-2 mb-4" sx={{ ...containerStyle }}>
                        <p className="mb-2">Completed Orders</p>
                        <p className="mb-2 font-bold">{completedOrdersCount}</p>
                        <p className="text-sm text-gray-500">
                            Audited and <span className="text-blue-700">paid</span> orders
                        </p>
                    </Box>
                    <Box className="shadow-xl shadow-black-600 w-full md:w-1/5 px-2 mb-4 mr-5" sx={{ ...containerStyle }}>
                        <p className="mb-2">Total Products Added</p>
                        <p className="text-xl text-gray-50">
                            <span className="text-green-500">{totalProducts}</span>
                        </p>
                    </Box>
                    <Box className="shadow-xl shadow-black-600 w-full md:w-3/5 px-2 mb-4" sx={{ ...containerStyle }}>
                        <p className="mb-2">Total Revenue</p>
                        <p className="text-xl text-gray-50">
                            <span className="text-green-500">GHC {totalRevenue.toFixed(2)}</span>
                        </p>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ShopSummaryTable;