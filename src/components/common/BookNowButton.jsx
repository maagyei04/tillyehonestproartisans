import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const BookNowButton = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        userLoggedIn ?
            navigate('/tillyehonestproartisans/explore') :
            navigate('/tillyehonestproartisans/register');
    };

    return (
        <>
            <button onClick={handleClick} className="w-full bg-green-500 text-white py-2 rounded hover:bg-violet-600">Book Now</button>
        </>
    );
};

export default BookNowButton;