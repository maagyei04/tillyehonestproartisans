import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import { fetchAllArtisanData, fetchAllClientBookings, updateArtisanStatus } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function ArtisanArtisansTable() {
    const [artisanData, setArtisanData] = useState([]);
    const [bookingsDetails, setBookingsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const getAllArtisans = async () => {
            const artisanData = await fetchAllArtisanData();
            setArtisanData(artisanData);
            setLoading(false);
        };

        getAllArtisans();
    }, []);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            for (const artisan of artisanData) {
                const artisanBookings = await fetchAllClientBookings(artisan.clientId);
                setBookingsDetails(prevDetails => ({ ...prevDetails, [artisan.artisanId]: artisanBookings }));
            }
        };

        if (artisanData.length > 0) {
            fetchBookingDetails();
        }
    }, [artisanData]);

    const handleMenuClick = (event, client) => {
        setAnchorEl(event.currentTarget);
        setSelectedArtisan(client);
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
            await updateArtisanStatus(selectedArtisan?.artisanId, false);
            alert('Artisan has been successfully blocked!');
        } catch (error) {
            console.error('Error blocking artisan:', error);
            alert('Error blocking artisan');
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
            await updateArtisanStatus(selectedArtisan?.artisanId, true);
            alert('Artisan has been successfully approve!');
        } catch (error) {
            console.error('Error approve artisan:', error);
            alert('Error approve client');
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (imageSrc) => {
        setImagePreview(imageSrc);
    };

    const handleCloseImagePreview = () => {
        setImagePreview(null);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom className="font-bold text-xl">Artisans (Users)</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Artisan Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Passport</TableCell>
                            <TableCell>Ghana Card</TableCell>
                            <TableCell>Gaurantor</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {artisanData.length > 0 ? (
                            artisanData.map((artisan, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 flex flex-row font-semibold'>
                                        <Avatar src={artisan?.passportImage} className='mr-2 h-10 w-10' />
                                        {artisan?.firstName} {artisan?.lastName}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{artisan?.phoneNumber}</TableCell>
                                    <TableCell className='text-gray-500'>{artisan?.email}</TableCell>
                                    <TableCell className={artisan?.status === true ? 'text-gray-500 font-semibold' : 'text-gray-500 font-semibold'}>{artisan?.status === true ? 'Active' : 'Blocked'}</TableCell>
                                    <TableCell className='text-violet-500'><span onClick={() => handleImageClick(artisan?.passportImage)} style={{ cursor: 'pointer' }}>Passport Image</span></TableCell>
                                    <TableCell className='text-violet-500'><span onClick={() => handleImageClick(artisan?.ghanaCardImage)} style={{ cursor: 'pointer' }}>Ghana Card</span></TableCell>
                                    <TableCell className='text-violet-500'><span onClick={() => handleImageClick(artisan?.gaurantorNoteImage)} style={{ cursor: 'pointer' }}>Gaurantor Note</span></TableCell>
                                    <TableCell>
                                        <Button
                                            aria-controls="simple-menu"
                                            aria-haspopup="true"
                                            onClick={(e) => handleMenuClick(e, artisan)}
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
                                                    <p className='font-semibold'>Approve</p>
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
                                        <p className='font-bold text-lg'>No artisan has registered yet</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no artisans yet. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Block Client Modal */}
            <Dialog className='rounded-[20px]' open={open} onClose={() => setOpen(false)}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to block this Artisan ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Artisan won't be able to access this platform with this email anymore. Remember to refresh page after!
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
                <DialogTitle className='font-bold text-sm'>Are you sure you want to approve this Artisan ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Artisan will now be able to recieve bookings on this platform 🎊. Remember to refresh page after!
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

            {/* Image Preview Modal */}
            <Dialog className='rounded-[20px]' open={Boolean(imagePreview)} onClose={handleCloseImagePreview}>
                <DialogTitle className='font-bold text-sm'>Image Preview</DialogTitle>
                <DialogContent>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImagePreview} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
