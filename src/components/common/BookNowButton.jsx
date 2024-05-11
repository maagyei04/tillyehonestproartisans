import { useNavigate } from 'react-router-dom';

const BookNowButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tillyehonestproartisans/booking/service_detail');
    };

    return (
        <>
            <button onClick={handleClick} className="w-full bg-green-500 text-white py-2 rounded hover:bg-violet-600">Book Now</button>
        </>
    );
};

export default BookNowButton;