import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    MenuItem,
    Select,
} from '@mui/material';
import { fetchAllArtisanData, fetchAllClientBookings, updateArtisanStatus, deleteUserNow, fetchAllArtisanPortfolios, uploadPortfolioImage, addArtisanPortfolio, deleteArtisanPortfolio } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon, UserMinusIcon } from '@heroicons/react/24/solid';

export default function ArtisanArtisansTable() {
    const dispatch = useDispatch();

    const [artisanData, setArtisanData] = useState([]);
    const [bookingsDetails, setBookingsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [filterOption, setFilterOption] = useState('All');
    const [openPortfolio, setOpenPortfolio] = useState(false);
    const [artisansPortfolioData, setArtisansPortfolioData] = useState([]);
    const [sArtisansPortfolioData, setSArtisansPortfolioData] = useState([]);
    const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(null);


    const [portfolioData, setPortfolioData] = useState({
        artisan_id: '',
        title: '',
        image_url: '',
    })

    useEffect(() => {
        const getAllArtisans = async () => {
            const artisanData = await fetchAllArtisanData();
            setArtisanData(artisanData);
            setLoading(false);
        };

        const getArtisanPortfolios = async () => {
            const portfolioData = await fetchAllArtisanPortfolios();
            setArtisansPortfolioData(portfolioData);
        };


        getAllArtisans();
        getArtisanPortfolios();
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

    const handlePortfolioChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDeletePortfolio = async (id) => {
        setLoading(true);
        try {
            await dispatch(deleteArtisanPortfolio(id));
            alert('Portfolio deleted successfully for artisan');
        } catch (error) {
            console.error('Error deleting portfolio for artisan:', error);
            alert('Error deleting portfolio for artisan');
        } finally {
            setLoading(false);
        }
    };

    const handlePortfolioImageChange = (e) => {
        setSelectedPortfolioImage(e.target.files[0]);
    };

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

    const handleClickOpen3 = () => {
        setOpen3(true);
        handleCloseMenu();
    };

    const handleClickOpenPortfolio = () => {
        const artisanDataWithId = [];

        artisansPortfolioData.forEach((i) => {
            if (i.artisan_id === selectedArtisan?.artisanId) {
                artisanDataWithId.push(i);
                setSArtisansPortfolioData(artisanDataWithId);
            }
        });

        setOpenPortfolio(true);
        handleCloseMenu();
    };

    const handlePortfolioExit = () => {
        setOpenPortfolio(false);
        setSArtisansPortfolioData([]);
    }

    const handleClosePortfolio = async (e) => {
        setOpenPortfolio(false);
        setSArtisansPortfolioData([]);
        setLoading(true);
        e.preventDefault();

        try {
            let updatedData = { ...portfolioData };

            if (selectedPortfolioImage) {
                const portfolioImageUrl = await uploadPortfolioImage(selectedPortfolioImage, dispatch);
                updatedData.image_url = portfolioImageUrl;
                updatedData.artisan_id = selectedArtisan?.artisanId;
            }

            console.log(updatedData);

            await dispatch(addArtisanPortfolio(updatedData));

            alert('Portfolio added successfully for artisan');
        } catch (error) {
            console.error('Error adding portfolio for artisan:', error);
            alert('Error adding portfolio for artisan');
        } finally {
            setLoading(false);
        }
    };

    const handleClose2 = async (e) => {
        setOpen2(false);
        setLoading(true);
        e.preventDefault();
        try {
            await updateArtisanStatus(selectedArtisan?.artisanId, true);
            alert('Artisan has been successfully approved!');
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

    const handleUserDelete = async (e) => {
        if (!selectedArtisan) {
            console.error('No artisan selected for deletion');
            return;
        }

        setOpen3(false);
        setLoading(true);
        e.preventDefault();
        try {
            await deleteUserNow(selectedArtisan.artisanId);
            console.log(`User deletion process completed successfully.`);
            alert(`User deletion process completed successfully.`);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error deleting user: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filteredArtisans = artisanData.filter((artisan) => {
        if (filterOption === 'All') {
            return true; // Show all artisans
        } else if (filterOption === 'Blocked') {
            return !artisan.status; // Show blocked artisans
        } else if (filterOption === 'Active') {
            return artisan.status; // Show active artisans
        }
        return true;
    });

    return (
        <div>
            <Typography variant="h4" gutterBottom className="font-bold text-xl">Artisans (Users)</Typography>

            {/* Filter Select */}
            <div style={{ marginBottom: '16px' }}>
                <div htmlFor="filter-select">Filter</div>
                <Select
                    native
                    value={filterOption}
                    onChange={handleFilterChange}
                    inputProps={{
                        name: 'filter',
                        id: 'filter-select',
                    }}
                >
                    <option value="All">All</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Active">Active</option>
                </Select>
            </div>

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
                        {filteredArtisans.length > 0 ? (
                            filteredArtisans.map((artisan, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 flex flex-row font-semibold'>
                                        <Avatar src={artisan?.passportImage} className='mr-2 h-10 w-10' />
                                        {artisan?.firstName} {artisan?.lastName}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{artisan?.phoneNumber}</TableCell>
                                    <TableCell className='text-gray-500'>{artisan?.email}</TableCell>
                                    <TableCell className={artisan?.status ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{artisan?.status ? 'Active' : 'Blocked'}</TableCell>
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
                                            <MenuItem onClick={handleClickOpenPortfolio} className='bg-gray-200 m-1 rounded'>
                                                <div className='flex flex-row'>
                                                    <UserMinusIcon className='h-5 w-5 mr-2 text-red-600' />
                                                    <p className='font-semibold'>Portfolio</p>
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
                                        <p className='font-bold text-lg'>No artisans match the current filter</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">Adjust your filter criteria or wait for new artisans to register.</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modals (Dialogs) */}

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
                        Artisan will now be able to receive bookings on this platform 🎊. Remember to refresh page after!
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

            {/* Delete Artisan Modal */}
            <Dialog className='rounded-[20px]' open={open3} onClose={() => setOpen3(false)}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to delete this Artisan ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Artisan will be removed from this platform 🎊.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen3(false)} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleUserDelete} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {loading ? 'Please wait...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Artisan Portfolio */}
            <Dialog className='rounded-[20px]' open={openPortfolio} onClose={handlePortfolioExit}>
                <DialogTitle className='font-bold text-sm'>Add/Delete Portfolio</DialogTitle>
                <DialogContent>
                    <form>
                        <h1 className="text-lg font-bold mb-4">{selectedArtisan?.firstName}'s Portfolio</h1>
                        <div className="portfolio-list mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {sArtisansPortfolioData.map((portfolio, index) => (
                                <div key={index} className="mb-4 flex-col justify-between items-center bg-gray-200 shadow shadow-lg p-4 rounded-[10px]">
                                    <div className='flex flex-row justify-between mb-2'>
                                        <div>
                                            <p className='text-black text-sm font-bold'>{portfolio.title}</p>
                                            <img src={portfolio.image_url} height={50} width={50} alt='portfolio' />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div onClick={() => handleDeletePortfolio(portfolio.id)} className="text-red-600 cursor-pointer">
                                                <i className="material-icons">delete</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="title"
                                name="title"
                                onChange={handlePortfolioChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                name="image_url"
                                alt='image_url'
                                accept='image/*'
                                onChange={handlePortfolioImageChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePortfolioExit} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleClosePortfolio} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {!loading && 'Add To Portfolio'}{loading && 'Please wait...'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
