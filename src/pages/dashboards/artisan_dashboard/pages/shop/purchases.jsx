import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../contexts/authContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Pagination } from '@mui/material';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { fetchAllOrdersByUserId, deleteOrderById, markOrderAsDelivered, markOrderAsPaid } from '../../../../../stores/actions';
import { Timestamp } from '@firebase/firestore';


const rowsPerPage = 10;

const ShopPurhacesTable = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedData = Array.isArray(orders) ? orders.slice((page - 1) * rowsPerPage, page * rowsPerPage) : [];

    console.log(paginatedData);

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setShowDeleteModal(true);
    };

    const handleViewClick2 = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleDeleteOrder = () => {
        console.log('Deleting order:', selectedOrder);
        deleteOrderById(selectedOrder.id)
            .then(() => {
                console.log('Order deleted successfully');
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting order:', error);
            });
    };

    const handleMarkAsPaid = () => {
        console.log('Marking order as paid:', selectedOrder);
        markOrderAsPaid(selectedOrder.id)
            .then(() => {
                console.log('Order marked as paid successfully');
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error marking order as paid:', error);
            });
    };

    const handleMarkAsDelivered = () => {
        console.log('Marking order as delivered:', selectedOrder);
        markOrderAsDelivered(selectedOrder.id)
            .then(() => {
                console.log('Order marked as delivered successfully');
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error marking order as delivered:', error);
            });
    };

    return (
        <div className="">
            <div>
                <Typography variant="h2" gutterBottom className="font-bold text-xl">Recent Orders</Typography>

                <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                    <Table aria-label="responsive table">
                        <TableHead className='bg-gray-200'>
                            <TableRow>
                                <TableCell>Buyer Name</TableCell>
                                <TableCell>Buyer Phone</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Product (Qty)</TableCell>
                                <TableCell>Total Amt</TableCell>
                                <TableCell>Total Qty</TableCell>
                                <TableCell>Payment Status</TableCell>
                                <TableCell>Delivery Option</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-gray-500">{row.buyerName}</TableCell>
                                        <TableCell className="text-gray-500">{row.buyerPhone}</TableCell>
                                        <TableCell className="text-gray-500">{formatDate(row.dateOrdered)}</TableCell>
                                        <TableCell className="text-gray-500">
                                            {Array.isArray(row.items) ? (
                                                row.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.productName} ({item.quantity})
                                                    </div>
                                                ))
                                            ) : (
                                                'No items'
                                            )}
                                        </TableCell>
                                        <TableCell className="text-gray-500">GHc {row.totalAmount}</TableCell>
                                        <TableCell className="text-gray-500">{row.totalQuantity}</TableCell>
                                        <TableCell className="text-gray-500">{row.paymentStatus}</TableCell>
                                        <TableCell className="text-gray-500">{row.deliveryOption}</TableCell>
                                        <TableCell>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleViewClick(row)}
                                            >
                                                Delete Order
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded ml-3"
                                                onClick={() => handleViewClick2(row)}
                                            >
                                                View Order
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center mt-10">
                                            <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                            <p className='font-bold text-lg'>You've no financial history</p>
                                            <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no records of payment. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <div className="flex space-x-2">
                    <Pagination
                        count={Math.ceil(orders.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </div>
                <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.ceil(orders.length / rowsPerPage)}
                >
                    Next
                </button>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Delete Order</h2>
                        <p>Are you sure you want to delete this order?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleDeleteOrder}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Order Details</h2>
                        {Array.isArray(selectedOrder.items) ? (
                            <div className="max-h-[200px] overflow-y-auto"> {/* Container with fixed height and vertical scroll */}
                                <ul>
                                    {selectedOrder.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex flex-row justify-between">
                                            <img src={item.image} alt={item.productName} className="w-[70px] h-[70px]" />
                                            <p>{item.productName}</p>
                                            <p>GHc {item.productPrice}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No items found.</p>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleMarkAsPaid}
                            >
                                Mark as Paid
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleMarkAsDelivered}
                            >
                                Mark as Delivered
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const formatDate = (timestamp) => {
    if (timestamp === undefined) {
        return ''; // or any other default value you prefer
    }

    if (timestamp instanceof Timestamp) {
        return new Date(timestamp.toDate()).toLocaleDateString();
    } else {
        return new Date(timestamp).toLocaleDateString();
    }
};

export default ShopPurhacesTable;