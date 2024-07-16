import { RegisterUserWithEmailAndPassword, LoginUserWithEmailAndPassword } from '../services/firebase/auth';
import { doc, setDoc, collection, getDoc, getDocs, query, limit, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db, storage, auth } from '../services/firebase/firebase';
import { setClientData } from './reducers/clientInfoReducer';
import { setArtisanData } from './reducers/artisanInfoReducer';
import { setClientId } from './reducers/clientReducer';
import { setPoliceReportImage, setGhanaCardImage, setPassportImage, setGaurantorNoteImage, setArtisanId } from './reducers/artisanReducer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const sendSingleSMS = async (to, content) => {
    try {
        const response = await axios.get('https://smsc.hubtel.com/v1/messages/send', {
            params: {
                clientid: 'nknaoaig',
                clientsecret: 'japkqsfe',
                from: 'TillyAndE',
                to,
                content,
            },
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export const sendSMS = async (firstName, lastName, phoneNumber) => {
    const message = `${firstName} ${lastName} has successfully registered as an Artisan with Tilly and E Honest Pro Artisans with the number ${phoneNumber}`;
    const recipients = [
        '+233541190955',
        '+233596227724',
        '+233531293686',
    ];

    try {
        await Promise.all(
            recipients.map((recipient) => sendSingleSMS(recipient, message))
        );
        console.log('All SMS sent successfully');
    } catch (error) {
        console.error('Error sending one or more SMS:', error);
    }
};

export const sendBookingSMS = async (artisanFirstName, artisanLastName, date, artisanNumber) => {
    const message = `A Client has booked Artisan, ${artisanFirstName} ${artisanLastName} with number ${artisanNumber} for a service with a expected date being ${date}, please alert the artisan by clicking on the number in this message to call.`;
    const recipients = [
        '+233541190955',
        '+233531293686',
        '+233596227724',
    ];

    try {
        await Promise.all(
            recipients.map((recipient) => sendSingleSMS(recipient, message))
        );
        console.log('All SMS sent successfully');
    } catch (error) {
        console.error('Error sending one or more SMS:', error);
    }
};

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

            dispatch(setArtisanId(user.user.uid));
            dispatch(setGaurantorNoteImage(gaurantorImageUrl));
            dispatch(setGhanaCardImage(ghanaCardImageUrl));
            dispatch(setPassportImage(passportImageUrl));

            const artsianRef = doc(collectionRef, user.user.uid);

            const artisanData1 = getState().artisan;


            await setDoc(artsianRef, artisanData1).then(
                () => sendSMS(artisanData1.firstName, artisanData1.lastName, artisanData1.phoneNumber)
            );

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

export const updateGaurantorNoteImage = async (userId, file, dispatch) => {
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

        console.log('Artisan Image successfully updated:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error updating artisan image:', error);
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

            const artisanData = await fetchArtisanData(bookingData1.bookingArtisanId);

            const {
                firstName,
                lastName,
                phoneNumber
            } = artisanData;

            await setDoc(bookingRef, bookingData1).then(
                () => sendBookingSMS(firstName, lastName, bookingData1.bookingStartDate, phoneNumber)
            );

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

export const fetchBusinessFieldsCategoriesLimit = async (limitCount) => {
    try {
        const docRef = doc(db, 'BusinessFields', 'uLZD4t41lAE2IA1XR95y');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const categories = docSnap.data().categories;
            if (categories && categories.length > 0) {
                return categories.slice(0, limitCount);
            } else {
                console.log('No categories found in document');
                return [];
            }
        } else {
            throw new Error('Document does not exist');
        }
    } catch (error) {
        console.error('Error fetching business fields categories:', error);
        throw error;
    }
};

export const fetchLimitedArtisanData = async (limitCount) => {
    try {
        const collectionRef = collection(db, 'Artisans');
        // Fetch more documents initially to ensure enough data for filtering
        const initialLimit = limitCount * 2;
        const artisanQuery = query(collectionRef, limit(initialLimit));

        const querySnapshot = await getDocs(artisanQuery);

        const artisanData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.status === true) {
                artisanData.push(data);
            }
        });

        // Apply limit after filtering
        const limitedArtisanData = artisanData.slice(0, limitCount);

        return limitedArtisanData;
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

            alert('Message Successfully Sent');

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

export const fetchAllArtisanPortfolio = async (userId) => {
    try {
        const collectionRef = collection(db, 'Portfolios');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const portfolioData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                // Check if status is true
                if (data.artisan_id === userId) {
                    // Include the document ID along with the data
                    portfolioData.push({
                        id: doc.id,
                        ...data
                    });
                }
            });
            return portfolioData;
        } else {
            throw new Error('No artisan portfolio found');
        }
    } catch (error) {
        console.error('Error fetching artisan portfolio data:', error);
        throw error;
    }
};


export const addArtisanPortfolio = (portfolio) => {
    return async (dispatch) => {
        try {
            const collectionRef = collection(db, 'Portfolios');

            const portfolioRef = doc(collectionRef);

            await setDoc(portfolioRef, portfolio);

            console.log('Portfolio Successfully Added');

            dispatch({ type: 'ADD_PORTFOLIO_SUCCESS', payload: portfolio });
        } catch (error) {
            console.error('Error adding portfolio:', error);
            dispatch({ type: 'ADD_PORTFOLIO_ERROR', payload: error.message });
        }
    };
};

export const uploadPortfolioImage = async (file, dispatch) => {
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

        // Generate a unique filename or path for each upload
        const uniqueId = uuidv4(); // Generate a unique identifier (UUID)
        const imageRef = ref(storage, `portfolio_images/${uniqueId}`);

        const uploadTask = await uploadBytes(imageRef, blob, metadata);

        const imageUrl = await getDownloadURL(uploadTask.ref);

        console.log('Portfolio Image successfully uploaded:', imageUrl);

        return imageUrl;
    } catch (error) {
        console.error('Error uploading portfolio image:', error);
        dispatch({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
        throw error;
    }
};

export const deleteArtisanPortfolio = (id) => async (dispatch) => {
    try {

        const portfolioDoc = doc(db, 'Portfolios', id);

        await deleteDoc(portfolioDoc);

    } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
    }
};

export const deleteUserNow = async (userId) => {
    try {
        //Delete user document from Firestore
        const userRef = db.collection('Users').doc(userId);
        await userRef.delete();
        console.log(`Successfully deleted user document with ID: ${userId}`);
        return true; // Return true or handle success
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Throw error or handle accordingly
    }
};

export const deleteClientDoc = async (id) => {
    try {
        const clientDocRef = doc(db, 'Clients', id);
        await deleteDoc(clientDocRef);
        console.log(`Client document with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting client document:', error);
        throw error;
    }
};

export const switchClientToArtisan = (artisanData) => {
    return async (dispatch) => {
        try {
            const collectionRef = collection(db, 'Artisans');
            const artisanRef = doc(collectionRef, artisanData.artisanId);

            await setDoc(artisanRef, artisanData);

            console.log('Client Successfully Switched to Artisan');

            await deleteClientDoc(artisanData.artisanId);

            const artisanInfo = await fetchArtisanData(artisanData.artisanId);
            console.log(artisanInfo);

            return artisanData.artisanId;
        } catch (error) {
            console.error('Error switching client to artisan:', error);
            throw error;
        }
    };
};

export const fetchAllArtisanPortfolios = async () => {
    try {
        const collectionRef = collection(db, 'Portfolios');
        const snapshot = await getDocs(collectionRef);

        if (!snapshot.empty) {
            const portfolioData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                // Include the document ID along with the data
                portfolioData.push({
                    id: doc.id,
                    ...data
                });
            });
            return portfolioData;
        } else {
            throw new Error('No artisan portfolios found');
        }
    } catch (error) {
        console.error('Error fetching artisan portfolios data:', error);
        throw error;
    }
};