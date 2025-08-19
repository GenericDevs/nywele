// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// lib/firebase.js
export const uploadFileToFirebase = async(file) => {
    try {
        // Convert File (Web API) → Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use a safe filename
        const filename = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, filename);

        // Upload the buffer
        await uploadBytes(storageRef, buffer);

        // Get the public URL
        const publicUrl = await getDownloadURL(storageRef);
        return publicUrl;
    } catch (error) {
        console.error('Failed to upload file to Firebase Storage:', error);
        throw new Error('Image upload failed.');
    }
};