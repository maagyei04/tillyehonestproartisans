import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { fetchClientData, fetchArtisanData, fetchAllArtisanAppointmentsNoId, fetchAllArtisanData, fetchAllClientData, fetchAllBookings, fetchAllBookingsLimited, fetchBusinessFieldsCategories, addBusinessFieldCategory, removeBusinessFieldCategory } from '../../../../stores/actions';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';

const containerStyle = {
  backgroundColor: 'white',
  padding: '16px',
  margin: '8px 0',
  borderRadius: '10px',
};

export default function ArtisanDashboardDefault() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allArtisanBookings, setAllArtisanBookings] = useState([]);
  const [allClientsBookings, setAllClientBookings] = useState([]);
  const [allClientsBookingsLimited, setAllClientBookingsLimited] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allArtisans, setAllArtisans] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [artisanDetails, setArtisanDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickOpen = (category) => {
    setOpen(true);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAllAppointments = async () => {
      const artisanBookings = await fetchAllArtisanAppointmentsNoId();
      setAllArtisanBookings(artisanBookings);
    };

    const getAllClients = async () => {
      const clients = await fetchAllClientData();
      setAllClients(clients);
    };

    const getAllArtisans = async () => {
      const artisans = await fetchAllArtisanData();
      setAllArtisans(artisans);
    };

    const getAllBookings = async () => {
      const clientBookings = await fetchAllBookings();
      setAllClientBookings(clientBookings);
    };

    const getAllBookingsLimited = async () => {
      const clientBookingsLimited = await fetchAllBookingsLimited(3);
      setAllClientBookingsLimited(clientBookingsLimited);
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchBusinessFieldsCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getAllAppointments();
    getAllClients();
    getAllArtisans();
    getAllBookings();
    getAllBookingsLimited();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchClientDetails = async () => {
      const details = {};
      for (const booking of allClientsBookings) {
        if (booking.bookingClientId && !details[booking.bookingClientId]) {
          const clientData = await fetchClientData(booking.bookingClientId);
          details[booking.bookingClientId] = {
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            profilePic: clientData.profilePic,
            email: clientData.email,
            phoneNumber: clientData.phoneNumber,
          };
        }
      }
      setClientDetails(details);
    };

    const fetchArtisanDetails = async () => {
      const details = {};
      for (const booking of allClientsBookings) {
        if (booking.bookingArtisanId && !details[booking.bookingArtisanId]) {
          const artisanData = await fetchArtisanData(booking.bookingArtisanId);
          details[booking.bookingArtisanId] = {
            firstName: artisanData.firstName,
            lastName: artisanData.lastName,
            passportImage: artisanData.passportImage,
            email: artisanData.email,
            phoneNumber: artisanData.phoneNumber,
          };
        }
      }
      setArtisanDetails(details);
    };

    fetchClientDetails();
    fetchArtisanDetails();
  }, [allClientsBookings]);

  let totalRevenue = 0;
  let totalUsers;
  let totalBookings;
  const bookingsWithNoEstimate = [];

  allArtisanBookings.forEach((i) => {
    if (i.bookingPayment === '' && i.bookingEstimateAmount !== 0) {
      totalRevenue += i.bookingEstimateAmount;
    }
  });

  totalUsers = allClients.length + allArtisans.length;

  totalBookings = allClientsBookings.length;

  allClientsBookingsLimited.forEach((i) => {
    if (i.bookingEstimateAmount === 0 && i.bookingPayment !== 'complete' && i.bookingStatusArtisan !== 'complete' && i.bookingStatusClient !== 'complete') {
      bookingsWithNoEstimate.push(i);
    }
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await addBusinessFieldCategory(formData.category);
      setOpen(false);
      alert('Category added successfully, please refresh page');
      setFormData({ category: '' }); // Reset form data

    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (category) => {
    setLoading(true);
    try {
      await removeBusinessFieldCategory(category);
      alert('Category removed successfully, please refresh page');
      setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category)); // Update categories state
    } catch (error) {
      console.error('Error removing category:', error);
      alert('Error removing category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Hi Admin!</h1>
      <Grid container className="flex flex-col md:flex-row">
        {/* Left Side */}
        <Grid item xs={12} md={8} className="p-2">
          <p className="text-sm text-gray-500">
            Below is an overview for business so far...
          </p>
          <Box className="flex flex-col h-full">
            {/* Top three black bordered divs */}
            <Box className="flex flex-col md:flex-row justify-between mb-2">
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Revenue</p>
                <p className="mb-2 font-bold text-xl text-blue-600">GHC {totalRevenue}.00</p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Users</p>
                <p className="mb-2 font-bold text-violet-600">{totalUsers}</p>
                <p className="text-sm text-gray-500">
                  <span className="text-blue-700">Both</span> clients and artisans
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Appointment(s)</p>
                <p className="text-sm text-gray-500">
                  <span className="text-green-500">{totalBookings}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Since operations <span className="text-blue-700">began</span>
                </p>
              </Box>
            </Box>
            {/* Large div taking the rest of the height */}
            <Card className="w-full p-2 shadow-xl shadow-black-600 flex-1">
              <Typography variant="h6" className='text-gray-500 font-bold text-lg'>Categories</Typography>
              <CardContent className='w-full flex flex-row justify-between flex-wrap'>
                {categories.map((category, index) => (
                  <div key={index} value={category}>
                    <div className='p-3 rounded-[10px] shadow shadow-lg w-auto bg-gray-600 mb-2 flex flex-row'>
                      <p className='text-white font-bold mr-2 hover:hand-pointer'>{category}</p>
                      <XCircleIcon
                        className='w-5 h-5 text-red-400 cursor-pointer'
                        onClick={() => handleClickOpen(category)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Add Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <button disabled={loading} onClick={handleSubmit} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">
                {!loading && 'Add Category'}{loading && 'Please wait...'}
              </button>
            </Card>
          </Box>
        </Grid>
        {/* Right Side */}
        <Grid item xs={12} md={4} className="flex flex-col p-2">
          <div className='flex flex-row justify-between'>
            <div>
              <Typography className='text-l font-bold' gutterBottom>
                Incoming Appointments
              </Typography>
            </div>
            <div>
              <p className='text-blue-600'><Link to={'/admin_dashboard/appointments'}>See All</Link></p>
            </div>
          </div>
          <Typography variant="body1" className='text-gray-500' gutterBottom>
            Verify and view latest appointments
          </Typography>
          {bookingsWithNoEstimate.length > 0 ? (
            bookingsWithNoEstimate.map((booking, index) => (
              <Box key={index} className="mb-2 shadow-xl shadow-black-600" sx={containerStyle}>
                {clientDetails[booking.bookingClientId] || booking.bookingEmail ? (
                  <div className='flex flex-row'>
                    <Avatar src={clientDetails[booking.bookingClientId]?.profilePic ?? ""} />
                    <div className='flex flex-col mb-2 ml-2'>
                      <p className='text-sm font-semibold'>{clientDetails[booking.bookingClientId]?.firstName ?? booking.bookingEmail} {clientDetails[booking.bookingClientId]?.lastName ?? ""}</p>
                      <p className='text-sm text-gray-500'>{clientDetails[booking.bookingClientId]?.email ?? booking.bookingEmail}</p>
                      <p className='text-sm text-gray-500'>{clientDetails[booking.bookingClientId]?.phoneNumber ?? booking.bookingPhoneNumber}</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading client details...</p>
                )}
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-col mb-2'>
                    <p className='text-gray-500'>Estimated Date</p>
                    <p className='font-bold text-sm'>{booking.bookingStartDate}</p>
                  </div>
                  <div className='flex flex-col mb-2'>
                    <p className='text-gray-500'>City/Town</p>
                    <p className='font-bold text-sm'>{booking.bookingTown}</p>
                  </div>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Job Description</p>
                  <p className='font-bold text-sm truncate max-w-full'>{booking.bookingServiceDetail}</p>
                </div>
                <div className='flex flex-col mb-5'>
                  <p className='text-gray-500'>Status</p>
                  <div className='px-4 bg-red-200 rounded py-1'>
                    <p className='font-bold text-sm text-red-600'>{booking.bookingEstimateAmount === 0 ? 'Waiting for estimate...' : 'Estimate Done'}</p>
                  </div>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Artisan</p>
                </div>
                {artisanDetails[booking.bookingArtisanId] ? (
                  <div className='flex flex-row'>
                    <Avatar src={artisanDetails[booking.bookingArtisanId].passportImage} />
                    <div className='flex flex-col mb-2 ml-2'>
                      <p className='text-sm font-semibold'>{artisanDetails[booking.bookingArtisanId].firstName} {artisanDetails[booking.bookingArtisanId].lastName}</p>
                      <p className='text-sm text-gray-500'>{artisanDetails[booking.bookingArtisanId].email}</p>
                      <p className='text-sm text-gray-500'>{artisanDetails[booking.bookingArtisanId].phoneNumber}</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading artisan details...</p>
                )}
              </Box>
            ))
          ) : (
            <Box className="mb-2 shadow-xl flex flex-col items-center shadow-black-600" sx={containerStyle}>
              <EmptyIcon className='h-20' style={{ color: 'gray' }} />
              <p className='font-bold text-lg'>No new Appointments</p>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Unblock Client Modal */}
      <Dialog className='rounded-[20px]' open={open} onClose={handleClose}>
        <DialogTitle className='font-bold text-sm'>Are you sure you want to delete this Category ?</DialogTitle>
        <DialogContent>
          <Typography className='text-gray-500 text-sm'>
            You can click on confirm to delete this category 🎊. Remember to refresh page after!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteCategory(selectedCategory)} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
            {loading ? 'Please wait...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
