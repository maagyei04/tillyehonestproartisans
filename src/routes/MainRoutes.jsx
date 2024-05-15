import Layout from "../components/layouts/BasicLayout";

import HomePage from '../pages/main/Homepage';
import About from '../pages/main/About';
import Explore from '../pages/main/explore';
import Contact from '../pages/main/contact';
import Register from '../pages/register/register';
import PaymentMethod from '../pages/register/paymentMethod';
import PersonalInfo from '../pages/register/personalInfo';
import InfoReview from '../pages/register/infoReview';
import BusinessDetails from '../pages/register/businessDetails';
import ImageUpload from '../pages/register/imageUpload';
import RegisterComplete from '../pages/register/registerComplete';
import Login from '../pages/login/login';
import BookingServiceDetail from '../pages/booking/serviceDetail';
import BookingLocationInfo from '../pages/booking/locationInfo';
import BookingPickDate from '../pages/booking/pickDate';
import BookingReview from '../pages/booking/bookingReview';
import BookingComplete from '../pages/booking/bookingComplete';
import NotFound from '../pages/NotFound';

const MainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: 'about',
            element: <About />,
        },
        {
            path: 'contact',
            element: <Contact />,
        },
        {
            path: 'explore',
            element: <Explore />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        {
            path: 'register/payment_method',
            element: <PaymentMethod />,
        },
        {
            path: 'register/personal_info',
            element: <PersonalInfo />,
        },
        {
            path: 'register/info_review',
            element: <InfoReview />,
        },
        {
            path: 'register/business_details',
            element: <BusinessDetails />,
        },
        {
            path: 'register/register_complete',
            element: <RegisterComplete />,
        },
        {
            path: 'booking/service_detail',
            element: <BookingServiceDetail />,
        },
        {
            path: 'booking/location_info',
            element: <BookingLocationInfo />,
        },
        {
            path: 'booking/pick_date',
            element: <BookingPickDate />,
        },
        {
            path: 'booking/review_info',
            element: <BookingReview />,
        },
        {
            path: 'register/image_upload',
            element: <ImageUpload />,
        },
        {
            path: 'booking/booking_complete',
            element: <BookingComplete />,
        },
        {
            path: 'login',
            element: <Login />,
        },
    ]
}

export default MainRoutes;