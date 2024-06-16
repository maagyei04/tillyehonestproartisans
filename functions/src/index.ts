import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Replace with the path to your service account key JSON file
const serviceAccount = require('./tilly-e-honest-pro-artisans-firebase-adminsdk-uf7je-ecbcba71d2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const removeUser = functions.firestore
    .document('/Users/{uid}')
    .onDelete(async (snapshot, context) => {
        const uid = context.params.uid;

        try {
            await admin.auth().deleteUser(uid);
            console.log(`Successfully deleted user with UID: ${uid}`);
        } catch (error) {
            console.error(`Error deleting user with UID: ${uid}`, error);
        }
    });
