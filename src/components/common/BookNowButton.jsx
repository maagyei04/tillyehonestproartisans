import { useNavigate } from 'react-router-dom';

const BookNowButton = ({ artisan }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the service detail page and pass the selected artisan's data as state
        navigate('/tillyehonestproartisans/booking/service_detail', { state: { artisan: artisan } });
    };

    return (
        <>
            <button onClick={handleClick} className="w-full bg-green-500 text-white py-2 rounded hover:bg-violet-600">Book Now</button>
        </>
    );
};

export default BookNowButton;
