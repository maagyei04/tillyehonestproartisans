import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useAuth } from '../../../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { fetchArtisanData, uploadPassportImage, updateArtisanData, fetchBusinessFieldsCategories } from '../../../../stores/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { userLoggedIn, currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
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

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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

        const fetchData = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        getArtisanData();
        fetchData();
    }, [userLoggedIn, currentUser]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
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
                            placeholder="Talk about yourself and your work"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button disabled={loading} type='submit' className="w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md">{!loading && 'Update Profile Info'}{loading && 'Please wait...'}</button>
                </div>
            </form>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <h1 className="text-lg font-bold mb-2">Payment Information</h1>
                <p className='text-gray-500 font-bold text-sm mb-2'>Adding your mobile money details can help you autofill during the payment process</p>
                <div className="mb-4 flex-col justify-between items-center bg-gray-200 shadow shadow-lg p-4 rounded-[10px]">
                    <di className='flex flex-row justify-between mb-2'>
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
                    </di>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <h1 className="text-lg font-bold mb-4">Images</h1>
                <ul className="space-y-2">
                    <li>
                        <a href={userData.passportImage} className="text-blue-600 hover:underline">PassportPicture</a>
                    </li>
                    <li>
                        <a href={userData.ghanaCardImage} className="text-blue-600 hover:underline">GhanaCard</a>
                    </li>
                    <li>
                        <a href={userData.gaurantorNoteImage} className="text-blue-600 hover:underline">Guarantor note</a>
                    </li>
                </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-lg font-bold mb-4">Business Info</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Update your Business field</label>
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

        </div>
    );
}
