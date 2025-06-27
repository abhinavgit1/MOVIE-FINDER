import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  orderBy, 
  limit, 
} from 'firebase/firestore';
import { db } from './firebase.js'; // Import your Firestore instance

// Collection name - you can change this to match your preference
const COLLECTION_NAME = 'trending_searches';

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Query Firestore to check if the search term exists
    const q = query(
      collection(db, COLLECTION_NAME),
      where('searchTerm', '==', searchTerm)
    );
    
    const querySnapshot = await getDocs(q);
    
    // 2. If document exists, update the count
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const docRef = doc(db, COLLECTION_NAME, docSnapshot.id);
      
      await updateDoc(docRef, {
        count: docSnapshot.data().count + 1
      });
    } else {
      // 3. If document doesn't exist, create a new one
      await addDoc(collection(db, COLLECTION_NAME), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        createdAt: new Date() // Optional: add timestamp for better tracking
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const getTrendingMovies = async () => {
  try {
    // Query Firestore to get top 5 trending movies ordered by count (descending)
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('count', 'desc'),
      limit(5)
    );
    
    const querySnapshot = await getDocs(q);
    
    // Convert QuerySnapshot to array of documents
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return documents;
  } catch (error) {
    console.error('Error getting trending movies:', error);
    return []; // Return empty array on error
  }
};