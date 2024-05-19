import React, { useState, useEffect } from "react";
import { Avatar } from '@mui/material';
import { useAuth } from "../../../../contexts/authContext";
import { fetchClientData, updateClientData, uploadClientProfileImage } from "../../../../stores/actions";
import { useDispatch } from 'react-redux';

export default function Profile() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { userLoggedIn, currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profilePic: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const getClientData = async () => {
            if (userLoggedIn && currentUser?.uid) {
                const clientData = await fetchClientData(currentUser.uid);
                setUserData(clientData);
                setFormData({
                    firstName: clientData.firstName || '',
                    lastName: clientData.lastName || '',
                    email: clientData.email || '',
                    phoneNumber: clientData.phoneNumber || '',
                    profilePic: clientData.profilePic || '',
                });
            }
        };

        getClientData();
    }, [userLoggedIn, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
                const profilePicUrl = await uploadClientProfileImage(currentUser.uid, selectedFile, dispatch);
                updatedData.profilePic = profilePicUrl;
            }

            await updateClientData(currentUser.uid, updatedData);
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
        <div className='border border-gray-200 rounded-[10px] p-5 w-auto flex-col shadow shadow-lg bg-white'>
            <h1 className='text-xl font-bold text-left mb-2'>Account Information</h1>

            <label htmlFor="profile-upload" className="font-semibold text-sm text-gray-500">Upload Your Profile Picture</label>
            <label>
                <div className='relative overflow-hidden cursor-pointer'>
                    {previewImage ? (
                        <Avatar src={previewImage} className="h-[150px] w-[150px]" />
                    ) : (
                        <Avatar src={formData.profilePic} className="h-[150px] w-[150px]" />
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

            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="firstName">First Name</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="lastName">Last Name</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="email">Email Address</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="phoneNumber">Phone Number</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className='my-5 w-full btn bg-violet-600 hover:bg-green-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'
                        type="submit"
                    >
                        {!loading && 'Update Profile'}{loading && 'Please wait...'}
                    </button>
                </form>
            </div>
        </div>
    );
}
