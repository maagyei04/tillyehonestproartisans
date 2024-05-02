import { RegisterClientWithEmailAndPassword, LoginUserWithEmailAndPassword } from '../services/firebase/auth';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase/firebase';
import { setClientData } from './reducers/clientInfoReducer';
import { useNavigate } from 'react-router-dom';

export const registerClient = (clientData) => {
    return async (dispatch) => {
        try {
            const navigate = useNavigate();

            const collectionRef = collection(db, 'Clients');

            const user = await RegisterClientWithEmailAndPassword(clientData.email, clientData.password);

            const clientRef = doc(collectionRef, user.user.uid);

            await setDoc(clientRef, clientData);

            dispatch({ type: 'REGISTER_SUCCESS', payload: user.user.uid });

            console.log('Client Successfully Registered');

            const clientInfo = await fetchClientData(user.user.uid);

            dispatch(setClientData(clientInfo));

            navigate('/tillyehonestproartisans/');

        } catch (error) {
            console.error('Error registering client:', error);
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        }
    };
};

export const fetchClientData = async (userId) => {
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

export const loginClient = (clientData) => {
    return async (dispatch) => {
        try {
            const navigate = useNavigate();

            const collectionRef = collection(db, 'Clients');

            const user = await LoginUserWithEmailAndPassword(clientData.email, clientData.password);

            const clientRef = doc(collectionRef, user.user.uid);

            const clientDoc = await getDoc(clientRef);

            dispatch({ type: 'LOGIN_SUCCESS', payload: user.user.uid });

            console.log('Client Successfully Logged In');

            dispatch(setClientData(clientDoc.data()));

            navigate('/tillyehonestproartisans/explore');

        } catch (error) {
            console.error('Error Logging in client:', error);
            dispatch({ type: 'LOGIN_ERROR', payload: error.message });
        }
    };
};