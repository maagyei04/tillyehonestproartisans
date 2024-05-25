import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from '@mui/material';
import { fetchAllClientData, fetchAllClientBookings, updateClientStatus } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function ArtisanClientsTable() {
    const [clientData, setClientData] = useState([]);
    const [bookingsDetails, setBookingsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        const getAllClients = async () => {
            const clientData = await fetchAllClientData();
            setClientData(clientData);
            setLoading(false);
        };

        getAllClients();
    }, []);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            for (const client of clientData) {
                const clientBookings = await fetchAllClientBookings(client.clientId);
                setBookingsDetails(prevDetails => ({ ...prevDetails, [client.clientId]: clientBookings }));
            }
        };

        if (clientData.length > 0) {
            fetchBookingDetails();
        }
    }, [clientData]);

    const handleMenuClick = (event, client) => {
        setAnchorEl(event.currentTarget);
        setSelectedClient(client);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
        handleCloseMenu();
    };

    const handleClose = async (e) => {
        setOpen(false);
        setLoading(true);
        e.preventDefault();
        try {
            await updateClientStatus(selectedClient?.clientId, false);
            alert('Client has been successfully blocked!');
        } catch (error) {
            console.error('Error blocking client:', error);
            alert('Error blocking client');
        } finally {
            setLoading(false);
        }
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
        handleCloseMenu();
    };

    const handleClose2 = async (e) => {
        setOpen2(false);
        setLoading(true);
        e.preventDefault();
        try {
            await updateClientStatus(selectedClient?.clientId, true);
            alert('Client has been successfully unBlocked!');
        } catch (error) {
            console.error('Error unBlocking client:', error);
            alert('Error unBlocking client');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom className="font-bold text-xl">Clients (Users)</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Appointment(s)</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientData.length > 0 ? (
                            clientData.map((client, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 flex flex-row font-semibold'>
                                        <Avatar src={client?.profilePic} className='mr-2 h-10 w-10' />
                                        {client?.firstName} {client?.lastName}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{client?.phoneNumber}</TableCell>
                                    <TableCell className='text-gray-500'>{client?.email}</TableCell>
                                    <TableCell className={client?.status === true ? 'text-gray-500 font-semibold' : 'text-gray-500 font-semibold'}>{client?.status === true ? 'Active' : 'Blocked'}</TableCell>
                                    <TableCell className='text-gray-500'>{bookingsDetails[client.clientId]?.length || 0}</TableCell>
                                    <TableCell>
                                        <Button
                                            aria-controls="simple-menu"
                                            aria-haspopup="true"
                                            onClick={(e) => handleMenuClick(e, client)}
                                            className="bg-violet-500 hover:bg-green-900 text-white hover:text-white px-2 py-1 rounded"
                                        >
                                            Action
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseMenu}
                                            className='rounded'
                                        >
                                            <MenuItem onClick={handleClickOpen} className='bg-gray-200 m-1 rounded'>
                                                <div className='flex flex-row'>
                                                    <XCircleIcon className='h-5 w-5 mr-2 text-red-600' />
                                                    <p className='font-semibold'>Block</p>
                                                </div>
                                            </MenuItem>
                                            <MenuItem onClick={handleClickOpen2} className='bg-gray-200 m-1 rounded'>
                                                <div className='flex flex-row'>
                                                    <CheckCircleIcon className='h-5 w-5 mr-2 text-green-600' />
                                                    <p className='font-semibold'>Unblock</p>
                                                </div>
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col items-center justify-center mt-10">
                                        <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                        <p className='font-bold text-lg'>No client has registered yet</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no client yet. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Block Client Modal */}
            <Dialog className='rounded-[20px]' open={open} onClose={() => setOpen(false)}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to block this Client ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Client won't be able to access this platform with this email anymore. Remember to refresh page after!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {loading ? 'Please wait...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Unblock Client Modal */}
            <Dialog className='rounded-[20px]' open={open2} onClose={() => setOpen2(false)}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to unblock this Client ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Client will now be able to access this platform with this email 🎊. Remember to refresh page after!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen2(false)} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose2} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {loading ? 'Please wait...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
