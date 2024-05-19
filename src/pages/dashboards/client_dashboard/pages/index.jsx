import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { fetchClientData, fetchAllClientBookings, fetchLimitedClientBookings } from '../../../../stores/actions';
import { useAuth } from '../../../../contexts/authContext';
import { Link } from 'react-router-dom';

const containerStyle = {
  backgroundColor: 'white',
  padding: '16px',
  margin: '8px 0',
  borderRadius: '10px',
};

export default function DashboardDefault() {

  const { userLoggedIn, currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [bookingLimitData, setBookingLimitData] = useState([]);


  useEffect(() => {
    const getClientData = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const clientData = await fetchClientData(currentUser.uid);
        setUserData(clientData);
      }
    };

    const getClientBookings = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const bookingData = await fetchAllClientBookings(currentUser.uid);
        setBookingData(bookingData);
      }
    }

    const getClientLimitedBookings = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const bookingLimitData = await fetchLimitedClientBookings(3, currentUser.uid);
        setBookingLimitData(bookingLimitData);
      }
    }

    getClientData();
    getClientBookings();
    getClientLimitedBookings();

  }, [userLoggedIn, currentUser]);

  const completedBookings = [];
  var totalPaid = 0;
  const bookingsWithEstimate = [];

  bookingData.forEach((i) => {
    const data = i;

    if (data.bookingStatusClient === 'complete' && data.bookingStatusArtisan === 'complete') {
      completedBookings.push(data);
    };

    if (data.bookingPayment === 'complete' && data.bookingEstimateAmount !== '0') {
      totalPaid += data.bookingEstimateAmount;
    }

  });

  bookingLimitData.forEach((i) => {
    if (i.bookingEstimateAmount !== '0' && i.bookingPayment !== 'complete') {
      bookingsWithEstimate.push(i);
    }
  })


  return (
    <div>
      <h1 className="font-bold text-2xl">Hi {userData ? userData.firstName : ''}!</h1>
      <Grid container className="flex flex-col md:flex-row">
        {/* Left Side */}
        <Grid item xs={12} md={8} className="p-2">
          <p className="text-sm text-gray-500">
            Here, you'll find everything you need to manage your bookings and appointments with ease. From scheduling your next consultation to tracking the progress of your project, our platform puts you in control every step of the way.
          </p>
          <Box className="flex flex-col h-full">
            {/* Top three black bordered divs */}
            <Box className="flex flex-col md:flex-row justify-between mb-2">
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Appointments</p>
                <p className="mb-2 font-bold">{bookingData.length}</p>
                <p className="text-sm text-gray-500">
                  <span className="text-blue-700">Approved</span> appointments
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Completed Appointments</p>
                <p className="mb-2 font-bold">{completedBookings.length}</p>
                <p className="text-sm text-gray-500">
                  Audited and <span className="text-blue-700">paid</span> services
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Amount Paid</p>
                <p className="text-xl text-gray-500">
                  <span className="text-green-500">GHC {totalPaid}.00</span>
                </p>
              </Box>
            </Box>
            {/* Large div taking the rest of the height */}
            <Box className="shadow-xl shadow-black-600 flex-1" sx={containerStyle}>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <Typography className='text-l font-bold' gutterBottom>
                    Appointments in Progress
                  </Typography>
                  <p className='text-sm text-gray-500 mb-5'>
                    Approved appointments that the artisan is currently working on
                  </p>
                </div>
                <div>
                  <p className='text-blue-600'><Link to={'/client_dashboard/appointments'}>See All</Link></p>
                </div>
              </div>
              {bookingsWithEstimate.map((booking, index) => (
                <Box key={index} className="p-2 rounded-[10px] border border-gray-300 mb-2">
                  <div className='flex justify-between mb-5'>
                    <div className='flex flex-row'>
                      <p>{booking.bookingArtisanId}</p>
                    </div>
                    <div className='bg-red-300 rounded-[10px] px-4'>
                      <p className='text-red-700'>Pending</p>
                    </div>
                  </div>
                  <div className='flex flex-row justify-between text-left'>
                    <div>
                      <p className='text-gray-500'>Job Description</p>
                      <p className='font-bold text-sm'>{booking.bookingServiceDetail}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Expected Date</p>
                      <p className='font-bold text-sm'>{booking.bookingStartDate}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Total Estimate</p>
                      <p className='font-bold text-sm'>GHC {booking.bookingEstimateAmount}.00</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Location</p>
                      <p className='font-bold text-sm'>{booking.bookingTown} {booking.bookingRegion}</p>
                    </div>
                  </div>

                </Box>
              ))}

            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4} className="flex flex-col p-2">
          <div className='flex flex-row justify-between'>
            <div>
              <Typography className='text-l font-bold' gutterBottom>
                New Appointments
              </Typography>
            </div>
            <div>
              <p className='text-blue-600'>See All</p>
            </div>
          </div>

          <Typography variant="body1" className='text-gray-500' gutterBottom>
            Latest appointment listing that is yet to be approved. You’re either waiting for an estimate from a artisan or you are ready to make payment.
          </Typography>
          <Box className="mb-2 shadow-xl shadow-black-600" sx={containerStyle}>
            <div className='flex flex-row mb-2'>
              <p className='text-sm font-semibold'>Agyei Michael</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-500'>Job Description</p>
              <p className='font-bold text-sm'>Entire House Plumbing Work</p>
            </div>
            <div className='flex flex-col mb-2'>
              <p className='text-gray-500'>Estimated Date</p>
              <p className='font-bold text-sm'>24-06-2024</p>
            </div>
            <div className='bg-gray-300 w-auto text-center rounded p-2'>
              <p className='text-red-600'>Waiting For Estimate</p>
            </div>
          </Box>
          <Box className="shadow-xl shadow-black-600" sx={containerStyle}>
            <div className='flex flex-row mb-2'>
              <p className='text-sm font-semibold'>Agyei Michael</p>
            </div>
            <div className='flex flex-col mb-2'>
              <p className='text-gray-500'>Job Description</p>
              <p className='font-bold text-sm'>Entire House Plumbing Work</p>
            </div>
            <div className='flex flex-col mb-2'>
              <p className='text-gray-500'>Estimated Date</p>
              <p className='font-bold text-sm'>24-06-2024</p>
            </div>
            <div className='bg-violet-600 w-auto text-white text-center rounded p-2'>
              <button>View Estimate</button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
