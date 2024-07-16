import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useAuth } from '../../../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { fetchArtisanData, uploadPassportImage, updateArtisanData, fetchBusinessFieldsCategories, updateGaurantorNoteImage, fetchAllArtisanPortfolio, addArtisanPortfolio, uploadPortfolioImage, deleteArtisanPortfolio } from '../../../../stores/actions';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Profile() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { userLoggedIn, currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [userPortfolioData, setUserPortfolioData] = useState([]);
    const [categories, setCategories] = useState([]);

    const [editMode, setEditMode] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        bio: '',
        businessField: '',
        businessLocation: '',
        passportImage: ''
    });

    const [portfolioData, setPortfolioData] = useState({
        artisan_id: currentUser?.uid,
        title: '',
        image_url: '',
    })

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(null);
    const [previewImagePortfolio, setPreviewImagePortfolio] = useState(null);

    const [selectedGuarantorFile, setSelectedGuarantorFile] = useState(null);
    const [previewGuarantorImage, setPreviewGuarantorImage] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpenModal2 = () => setOpenModal2(true);
    const handleCloseModal2 = () => setOpenModal2(false);

    const handleOpenModal3 = () => setOpenModal3(true);
    const handleCloseModal3 = () => setOpenModal3(false);

    useEffect(() => {
        const getArtisanData = async () => {
            if (userLoggedIn && currentUser?.uid) {
                const artisanData = await fetchArtisanData(currentUser.uid);
                setUserData(artisanData);
                setFormData({
                    firstName: artisanData.firstName || '',
                    lastName: artisanData.lastName || '',
                    email: artisanData.email || '',
                    phoneNumber: artisanData.phoneNumber || '',
                    passportImage: artisanData.passportImage || '',
                    businessField: artisanData.businessField || '',
                    businessLocation: artisanData.businessLocation || '',
                    bio: artisanData.bio || '',
                });
            }
        };

        const getArtisanPortfolio = async () => {
            if (userLoggedIn && currentUser?.uid) {
                const portfolioData = await fetchAllArtisanPortfolio(currentUser.uid);
                setUserPortfolioData(portfolioData);
            }
        };

        const fetchData = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        getArtisanData();
        getArtisanPortfolio();
        fetchData();
    }, [userLoggedIn, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setPortfolioData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditToggle = (field) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0])); // Set preview image
    };

    const handlePortfolioImageChange = (e) => {
        setSelectedPortfolioImage(e.target.files[0]);
        setPreviewImagePortfolio(URL.createObjectURL(e.target.files[0])); // Set preview image
    };

    const handleGuarantorFileChange = (e) => {
        setSelectedGuarantorFile(e.target.files[0]);
        setPreviewGuarantorImage(URL.createObjectURL(e.target.files[0])); // Set preview image
    };

    const handleAddPortfolio = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {
            let updatedData = { ...portfolioData };

            if (selectedPortfolioImage) {
                const portfolioImageUrl = await uploadPortfolioImage(selectedPortfolioImage, dispatch);
                updatedData.image_url = portfolioImageUrl;
            }

            await dispatch(addArtisanPortfolio(updatedData));

            alert('Portfolio added successfully');
        } catch (error) {
            console.error('Error adding portfolio:', error);
            alert('Error adding portfolio');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePortfolio = async (id) => {
        setLoading(true);
        try {
            await dispatch(deleteArtisanPortfolio(id));
            alert('Portfolio deleted successfully');
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            alert('Error deleting portfolio');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {
            let updatedData = { ...formData };

            if (selectedFile) {
                const profilePicUrl = await uploadPassportImage(currentUser.uid, selectedFile, dispatch);
                updatedData.passportImage = profilePicUrl;
            }

            await updateArtisanData(currentUser.uid, updatedData);

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateGuarantorNoteImage = async () => {
        setLoading(true);

        try {
            if (selectedGuarantorFile) {
                const guarantorNoteUrl = await updateGaurantorNoteImage(currentUser.uid, selectedGuarantorFile, dispatch);
                setUserData((prevData) => ({
                    ...prevData,
                    gaurantorNoteImage: guarantorNoteUrl,
                }));
                setPreviewGuarantorImage(null);
                setSelectedGuarantorFile(null);
                alert('Guarantor note updated successfully');
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error updating guarantor note image:', error);
            alert('Error updating guarantor note image');
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-6">
            <form onSubmit={handleSubmit}>
                <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                    <h1 className="text-lg font-bold mb-1">Account Information</h1>
                    <label htmlFor="profile-upload" className="font-semibold text-sm text-gray-500">Upload Your Passport Picture (will be used as profile pic)</label>
                    <label>
                        <div className="flex items-center mb-4 relative overflow-hidden cursor-pointer">
                            {previewImage ? (
                                <Avatar src={previewImage} className="h-24 w-24 mr-4" />
                            ) : (
                                <Avatar src={formData.passportImage} className="h-24 w-24 mr-4" />
                            )}
                            <input
                                name='profile-upload'
                                type="file"
                                id="profile-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </label>
                    <div className='flex flex-row justify-between'>
                        <div className="mb-4 mr-2">
                            <label className="block text-sm font-medium text-gray-700 mr-2">First Name</label>
                            {editMode.firstName ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className='text-gray-500 text-sm font-bold mr-5'>{formData.firstName}</p>
                                    <button onClick={() => handleEditToggle('firstName')} className="text-blue-600">Edit</button>
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            {editMode.lastName ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className='text-gray-500 text-sm font-bold mr-5'>{formData.lastName}</p>
                                    <button onClick={() => handleEditToggle('lastName')} className="text-blue-600">Edit</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        {editMode.email ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        ) : (
                            <div className="flex justify-between items-center">
                                <p className='text-gray-500 text-sm font-bold'>{formData.email}</p>
                                <button onClick={() => handleEditToggle('email')} className="text-blue-600">Edit</button>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        {editMode.phoneNumber ? (
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        ) : (
                            <div className="flex justify-between items-center">
                                <p className='text-gray-500 text-sm font-bold'>{formData.phoneNumber}</p>
                                <button onClick={() => handleEditToggle('phoneNumber')} className="text-blue-600">Edit</button>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Biography</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder={formData.bio ? formData.bio : "Talk about yourself and your work"}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button disabled={loading} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Update Profile Info'}{loading && 'Please wait...'}</button>
                </div>
            </form>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <form onSubmit={handleAddPortfolio}>
                    <h1 className="text-lg font-bold mb-4">Your Portfolio</h1>
                    <div className="portfolio-list mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {userPortfolioData.map((portfolio, index) => (
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
                            onChange={handleChange2}
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
                    <button disabled={loading} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Add To Portfolio'}{loading && 'Please wait...'}</button>
                </form>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <h1 className="text-lg font-bold mb-2">Payment Information</h1>
                <p className='text-gray-500 font-bold text-sm mb-2'>Adding your mobile money details can help you autofill during the payment process</p>
                <div className="mb-4 flex-col justify-between items-center bg-gray-200 shadow shadow-lg p-4 rounded-[10px]">
                    <div className='flex flex-row justify-between mb-2'>
                        <div>
                            <p className='text-black text-sm font-bold'>{userData.firstName} {userData.lastName}</p>
                            <p className="text-gray-600">{userData.momoNetwork} Mobile Money - {userData.momoNumber}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="text-blue-600">
                                <i className="material-icons">edit</i>
                            </button>
                            <button className="text-red-600">
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <h1 className="text-lg font-bold mb-4">Images</h1>
                <ul className="space-y-2">
                    <li>
                        <a href={userData.passportImage} className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpenModal2();
                            }}
                        >PassportPicture</a>
                    </li>
                    <li>
                        <a href={userData.ghanaCardImage} className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpenModal3();
                            }}
                        >GhanaCard</a>
                    </li>
                    <li>
                        <a
                            href={userData.gaurantorNoteImage}
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpenModal();
                            }}
                        >
                            Guarantor note
                        </a>
                    </li>
                </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-lg font-bold mb-4">Business Info</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Update your Business field (Primary)</label>
                        <select
                            name="businessField"
                            value={formData.businessField}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-4 h-4 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'yellow'}-500`}></div>
                                        <span>{category}</span>
                                    </div>
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Update your Business field (Secondary)</label>
                        <select
                            name="businessField"
                            value={formData.businessField}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-4 h-4 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'yellow'}-500`}></div>
                                        <span>{category}</span>
                                    </div>
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Business Location</label>
                        <input
                            type="tel"
                            name="businessLocation"
                            value={formData.businessLocation}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button disabled={loading} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Update Business Info'}{loading && 'Please wait...'}</button>
                </form>
            </div>

            {/* Modal for displaying and updating the Guarantor note */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-title" className="text-lg font-bold mb-4">Guarantor Note</h2>
                    {previewGuarantorImage ? (
                        <img src={previewGuarantorImage} alt="Guarantor Note Preview" className="w-full h-auto mb-4" />
                    ) : (
                        <img src={userData.gaurantorNoteImage} alt="Guarantor Note" className="w-full h-auto mb-4" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleGuarantorFileChange}
                        className="mt-2 mb-4"
                    />
                    <div className="flex justify-end space-x-2">
                        <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Close</button>
                        <button onClick={handleUpdateGuarantorNoteImage} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Please wait...' : 'Update'}</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModal2}
                onClose={handleCloseModal2}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-title" className="text-lg font-bold mb-4">Passport Image</h2>
                    <img src={userData.passportImage} alt="Passport Preview" className="w-full h-auto mb-4" />
                    <div className="flex justify-end space-x-2">
                        <button onClick={handleCloseModal2} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Close</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModal3}
                onClose={handleCloseModal3}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-title" className="text-lg font-bold mb-4">Ghana Card</h2>
                    <img src={userData.ghanaCardImage} alt="Ghana Card Preview" className="w-full h-auto mb-4" />
                    <div className="flex justify-end space-x-2">
                        <button onClick={handleCloseModal3} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Close</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
