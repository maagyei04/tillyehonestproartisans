import { RegisterUserWithEmailAndPassword, LoginUserWithEmailAndPassword } from '../services/firebase/auth';
import { doc, setDoc, collection, getDoc, getDocs, query, limit, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, storage } from '../services/firebase/firebase';
import { setClientData } from './reducers/clientInfoReducer';
import { setArtisanData } from './reducers/artisanInfoReducer';
import { setClientId } from './reducers/clientReducer';
import { setPoliceReportImage, setGhanaCardImage, setPassportImage, setGaurantorNoteImage, setArtisanId } from './reducers/artisanReducer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const registerClient = (clientData) => {
    return async (dispatch, getState) => {
        try {
            const collectionRef = collection(db, 'Clients');

            const user = await RegisterUserWithEmailAndPassword(clientData.email, clientData.password);

            const clientRef = doc(collectionRef, user.user.uid);

            dispatch(setClientId(user.user.uid));

            const clientData1 = getState().client;

            await setDoc(clientRef, clientData1);

            dispatch({ type: 'REGISTER_SUCCESS', payload: user.user.uid });

            console.log('Client Successfully Registered');

            const clientInfo = await fetchClientData(user.user.uid);

            dispatch(setClientData(clientInfo));

            return user.user.uid;

        } catch (error) {
            console.error('Error registering client:', error);
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        }
    };
};

export const registerArtisan = () => {
    return async (dispatch, getState) => {
        try {
            const artisanData = getState().artisan;

            const collectionRef = collection(db, 'Artisans');

            const user = await RegisterUserWithEmailAndPassword(artisanData.email, artisanData.password);

            const gaurantorImageUrl = await uploadGaurantorNoteImage(user.user.uid, artisanData.gaurantorNoteImage, dispatch);
            const ghanaCardImageUrl = await uploadGhanaCardImage(user.user.uid, artisanData.ghanaCardImage, dispatch);
            const passportImageUrl = await uploadPassportImage(user.user.uid, artisanData.passportImage, dispatch);
            const policeImageUrl = await uploadPoliceReportImage(user.user.uid, artisanData.policeReportImage, dispatch);

            dispatch(setArtisanId(user.user.uid));
            dispatch(setGaurantorNoteImage(gaurantorImageUrl));
            dispatch(setGhanaCardImage(ghanaCardImageUrl));
            dispatch(setPassportImage(passportImageUrl));
            dispatch(setPoliceReportImage(policeImageUrl));

            const artsianRef = doc(collectionRef, user.user.uid);

            const artisanData1 = getState().artisan;


            await setDoc(artsianRef, artisanData1);

            dispatch({ type: 'REGISTER_SUCCESS', payload: user.user.uid });

            console.log('Artisan Successfully Registered');

            const artisanInfo = await fetchArtisanData(user.user.uid);

            dispatch(setArtisanData(artisanInfo));

            return user.user.uid;

        } catch (error) {
            console.error('Error registering artisan:', error);
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        }
    };
};

export const fetchClientData = async (userId) => {
    if (!userId) {
        throw new Error('Invalid userId');
    }

    try {
        const collectionRef = collection(db, 'Clients');
        const clientRef = doc(collectionRef, userId);
        const clientDoc = await getDoc(clientRef);

        if (clientDoc.exists()) {
            return clientDoc.data();
        } else {
            throw new Error('Client not found');
        }
    } catch (error) {
        console.error('Error fetching client data:', error);
        throw error;
    }
};

export const fetchArtisanData = async (userId) => {
    try {
        const collectionRef = collection(db, 'Artisans');
        const artisanRef = doc(collectionRef, userId);
        const artisanDoc = await getDoc(artisanRef);

        if (artisanDoc.exists()) {
            return artisanDoc.data();
        } else {
            throw new Error('Artisan not found');
        }
    } catch (error) {
        console.error('Error fetching artisan data:', error);
        throw error;
    }
};

export const updateClientData = async (userId, updatedData) => {
    try {
        const collectionRef = collection(db, 'Clients');
        const clientRef = doc(collectionRef, userId);

        await setDoc(clientRef, updatedData, { merge: true });

        console.log('Client data updated successfully');
    } catch (error) {
        console.error('Error updating client data:', error);
        throw error;
    }
};

export const updateArtisanData = async (userId, updatedData) => {
    try {
        const collectionRef = collection(db, 'Artisans');
        const clientRef = doc(collectionRef, userId);

        await setDoc(clientRef, updatedData, { merge: true });

        console.log('Artisan data updated successfully');
    } catch (error) {
        console.error('Error updating artisan data:', error);
        throw error;
    }
};

export const updateBookingPayment = async (bookingDocId, newPaymentStatus) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingPayment: newPaymentStatus });
};

export const updateBookingEstimate = async (bookingDocId, newEstimateAmount) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingEstimateAmount: newEstimateAmount });
};

export const updateBookingReview = async (bookingDocId, newBookingReview) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingReview: newBookingReview });
};

export const updateBookingRate = async (bookingDocId, newBookingRate) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingRate: newBookingRate });
};

export const updateBookingStatusArtisan = async (bookingDocId, newbookingStatusArtisan) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingStatusArtisan: newbookingStatusArtisan });
};

export const updateBookingStatusClient = async (bookingDocId, newbookingStatusClient) => {
    const bookingDocRef = doc(db, "Bookings", bookingDocId);
    await updateDoc(bookingDocRef, { bookingStatusClient: newbookingStatusClient });
};

export const updateClientStatus = async (bookingDocId, newStatus) => {
    const clientDocRef = doc(db, "Clients", bookingDocId);
    await updateDoc(clientDocRef, { status: newStatus });
};

export const updateArtisanStatus = async (bookingDocId, newStatus) => {
    const artisanDocRef = doc(db, "Artisans", bookingDocId);
    await updateDoc(artisanDocRef, { status: newStatus });
};


export const loginClient = async (clientData) => {
    try {
        const collectionRef = collection(db, 'Clients');

        const user = await LoginUserWithEmailAndPassword(clientData.email, clientData.password);

        const clientRef = doc(collectionRef, user.user.uid);

        const clientDoc = await getDoc(clientRef);

        console.log('Client Successfully Logged In');

        return clientDoc.data();
    } catch (error) {
        console.error('Error Logging in client:', error);
    }
};

export const loginArtisan = async (artisanData) => {
    try {
        const collectionRef = collection(db, 'Artisans');

        const user = await LoginUserWithEmailAndPassword(artisanData.email, artisanData.password);

        const artisanRef = doc(collectionRef, user.user.uid);

        const artisanDoc = await getDoc(artisanRef);

        console.log('Artisan Successfully Logged In');

        return artisanDoc.data();
    } catch (error) {
        console.error('Error Logging in artisan:', error);
    }
};

export const loginAdmin = async (adminData) => {
    try {
        const user = await LoginUserWithEmailAndPassword(adminData.email, adminData.password);

        console.log('Admin Successfully Logged In');

        return user;
    } catch (error) {
        console.error('Error Logging in admin:', error);
    }
};

export const uploadPassportImage = async (userId, file, dispatch) => {
    try {

        let blob;
        if (file instanceof Blob) {
            blob = file;
        } else {
            throw new Error('The provided file is not a Blob or File object');
        }

        const metadata = {
            contentType: blob.type || 'image/jpeg'
        };

        const imageRef = ref(storage, `artisan_images/passports/${userId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);


        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Passport Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading passport image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }
};

export const uploadGhanaCardImage = async (userId, file, dispatch) => {
    try {

        let blob;
        if (file instanceof Blob) {
            blob = file;
        } else {
            throw new Error('The provided file is not a Blob or File object');
        }

        const metadata = {
            contentType: blob.type || 'image/jpeg'
        };

        const imageRef = ref(storage, `artisan_images/ghana_cards/${userId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);


        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Ghana Card Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading ghana card image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }

};

export const uploadPoliceReportImage = async (userId, file, dispatch) => {
    try {

        let blob;
        if (file instanceof Blob) {
            blob = file;
        } else {
            throw new Error('The provided file is not a Blob or File object');
        }

        const metadata = {
            contentType: blob.type || 'image/jpeg'
        };

        const imageRef = ref(storage, `artisan_images/police_reports/${userId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);


        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Police Report Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading police report image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }

};


export const uploadGaurantorNoteImage = async (userId, file, dispatch) => {
    try {

        let blob;
        if (file instanceof Blob) {
            blob = file;
        } else {
            throw new Error('The provided file is not a Blob or File object');
        }


        const metadata = {
            contentType: blob.type || 'image/jpeg'
        };

        const imageRef = ref(storage, `artisan_images/gaurantor_images/${userId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);


        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Gaurantor Note Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading gaurantor note image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }
};

export const uploadClientProfileImage = async (userId, file, dispatch) => {
    try {

        let blob;
        if (file instanceof Blob) {
            blob = file;
        } else {
            throw new Error('The provided file is not a Blob or File object');
        }


        const metadata = {
            contentType: blob.type || 'image/jpeg'
        };

        const imageRef = ref(storage, `client_images/${userId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);


        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Client Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading client image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }
};

export const bookArtisan = (bookingData) => {
    return async (dispatch, getState) => {
        try {
            const collectionRef = collection(db, 'Bookings');

            const bookingRef = doc(collectionRef);

            const bookingData1 = getState().booking;

            await setDoc(bookingRef, bookingData1);

            console.log('Artisan Successfully Booked');

        } catch (error) {
            console.error('Error booking artisan:', error);
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        }
    };
};

export const fetchAllClientData = async () => {
    try {
        const collectionRef = collection(db, 'Clients');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const clientData = [];
            snapshot.forEach((doc) => {
                clientData.push(doc.data());
            });
            return clientData;
        } else {
            throw new Error('No clients found');
        }
    } catch (error) {
        console.error('Error fetching clients data:', error);
        throw error;
    }
};


export const fetchBusinessFieldsCategories = async () => {
    try {
        const docRef = doc(db, 'BusinessFields', 'uLZD4t41lAE2IA1XR95y');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const categories = docSnap.data().categories;
            return categories;
        } else {
            throw new Error('Document does not exist');
        }
    } catch (error) {
        console.error('Error fetching business fields categories:', error);
        throw error;
    }
};

export const addBusinessFieldCategory = async (category) => {
    try {
        const docRef = doc(db, 'BusinessFields', 'uLZD4t41lAE2IA1XR95y');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                categories: arrayUnion(category)
            });
            console.log('Category added successfully');
        } else {
            throw new Error('Document does not exist');
        }
    } catch (error) {
        console.error('Error adding business field category:', error);
        throw error;
    }
};

export const removeBusinessFieldCategory = async (category) => {
    try {
        const docRef = doc(db, 'BusinessFields', 'uLZD4t41lAE2IA1XR95y');
        await updateDoc(docRef, {
            categories: arrayRemove(category)
        });
        console.log('Category removed successfully');
    } catch (error) {
        console.error('Error removing category:', error);
        throw error;
    }
};

export const fetchAllArtisanData = async () => {
    try {
        const collectionRef = collection(db, 'Artisans');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const artisanData = [];
            snapshot.forEach((doc) => {
                artisanData.push(doc.data());
            });
            return artisanData;
        } else {
            throw new Error('No artisans found');
        }
    } catch (error) {
        console.error('Error fetching artisans data:', error);
        throw error;
    }
};

export const fetchAllArtisanDataStatusTrue = async () => {
    try {
        const collectionRef = collection(db, 'Artisans');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const artisanData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                // Check if status is true
                if (data.status === true) {
                    artisanData.push(data);
                }
            });
            return artisanData;
        } else {
            throw new Error('No artisans found');
        }
    } catch (error) {
        console.error('Error fetching artisans data:', error);
        throw error;
    }
};


export const fetchLimitedClientData = async (limitCount) => {
    try {
        const collectionRef = collection(db, 'Clients');
        const querySnapshot = await getDocs(query(collectionRef, limit(limitCount)));

        const clientData = [];
        querySnapshot.forEach((doc) => {
            clientData.push(doc.data());
        });

        return clientData;
    } catch (error) {
        console.error('Error fetching client data:', error);
        throw error;
    }
};

export const fetchLimitedArtisanData = async (limitCount) => {
    try {
        const collectionRef = collection(db, 'Artisans');
        const querySnapshot = await getDocs(query(collectionRef, limit(limitCount)));

        const artisanData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.status === true) {
                artisanData.push(data);
            }
        });

        return artisanData;
    } catch (error) {
        console.error('Error fetching artisans data:', error);
        throw error;
    }
};

export const messageUs = () => {
    return async (dispatch, getState) => {
        try {
            const collectionRef = collection(db, 'Messages');

            const bookingRef = doc(collectionRef);

            const messageData1 = getState().message;

            await setDoc(bookingRef, messageData1);

            console.log('Message Successfully Sent');

        } catch (error) {
            console.error('Error sending message:', error);
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        }
    };
};

export const fetchLimitedClientBookings = async (limitCount, userId) => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const querySnapshot = await getDocs(query(collectionRef, limit(limitCount)));

        const bookingData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.bookingClientId === userId) {
                bookingData.push({
                    id: doc.id,  // Document ID
                    ...data      // Document Data
                });
            }
        });

        return bookingData;
    } catch (error) {
        console.error('Error fetching bookings data:', error);
        throw error;
    }
};

export const fetchAllClientBookings = async (userId) => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const bookingData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();

                if (data.bookingClientId === userId) {
                    bookingData.push({
                        id: doc.id,  // Document ID
                        ...data      // Document Data
                    });
                }
            });
            return bookingData;
        } else {
            throw new Error('No bookings found for this client');
        }
    } catch (error) {
        console.error('Error fetching bookings data for client:', error);
        throw error;
    }
};

export const fetchLimitedArtisanAppointments = async (limitCount, userId) => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const querySnapshot = await getDocs(query(collectionRef, limit(limitCount)));

        const bookingData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.bookingArtisanId === userId) {
                bookingData.push({
                    id: doc.id,  // Document ID
                    ...data      // Document Data
                });
            }
        });

        return bookingData;
    } catch (error) {
        console.error('Error fetching bookings data:', error);
        throw error;
    }
};

export const fetchAllArtisanAppointments = async (userId) => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const bookingData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();

                if (data.bookingArtisanId === userId) {
                    bookingData.push({
                        id: doc.id,  // Document ID
                        ...data      // Document Data
                    });
                }
            });
            return bookingData;
        } else {
            throw new Error('No bookings found for this artisan');
        }
    } catch (error) {
        console.error('Error fetching bookings data for artisan:', error);
        throw error;
    }
};


export const fetchAllArtisanAppointmentsNoId = async () => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const bookingData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();

                bookingData.push({
                    id: doc.id,  // Document ID
                    ...data      // Document Data
                });
            });
            return bookingData;
        } else {
            throw new Error('No bookings found');
        }
    } catch (error) {
        console.error('Error fetching bookings data:', error);
        throw error;
    }
};

export const fetchAllBookings = async () => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const bookingData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();

                bookingData.push({
                    id: doc.id,  // Document ID
                    ...data      // Document Data
                });
            });
            return bookingData;
        } else {
            throw new Error('No bookings found');
        }
    } catch (error) {
        console.error('Error fetching bookings', error);
        throw error;
    }
};

export const fetchAllBookingsLimited = async (limitCount) => {
    try {
        const collectionRef = collection(db, 'Bookings');
        const snapshot = await getDocs(query(collectionRef, limit(limitCount)));

        if (!snapshot.empty) {
            const bookingData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();

                bookingData.push({
                    id: doc.id,  // Document ID
                    ...data      // Document Data
                });
            });
            return bookingData;
        } else {
            throw new Error('No bookings found');
        }
    } catch (error) {
        console.error('Error fetching bookings', error);
        throw error;
    }
};