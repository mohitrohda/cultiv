import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  doc,
  getDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';

export const firestoreDebug = {
  // Test if Firestore connection works
  async testConnection() {
    try {
      console.log('🔍 Testing Firestore connection...');
      
      // Try to get any document from any collection
      const testQuery = query(collection(db, "labours"));
      const snapshot = await getDocs(testQuery);
      
      console.log('✅ Firestore connection successful');
      console.log('📊 Total documents in labours collection:', snapshot.size);
      
      return { success: true, documentCount: snapshot.size };
    } catch (error) {
      console.error('❌ Firestore connection failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Check if user is authenticated
  checkAuth() {
    const user = auth.currentUser;
    console.log('🔐 Auth check:', user ? `User: ${user.email}` : 'No user logged in');
    return user;
  },

  // List all collections (if possible)
  async listCollections() {
    try {
      // This is a simple way to test multiple collections
      const collections = ['labours', 'machines', 'produce', 'users'];
      const results = {};
      
      for (const collectionName of collections) {
        try {
          const q = query(collection(db, collectionName));
          const snapshot = await getDocs(q);
          results[collectionName] = snapshot.size;
          console.log(`📁 ${collectionName}: ${snapshot.size} documents`);
        } catch (error) {
          console.log(`📁 ${collectionName}: Error - ${error.message}`);
          results[collectionName] = error.message;
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error listing collections:', error);
      return { error: error.message };
    }
  },

  // Add a simple test document
  async addTestDocument() {
    try {
      console.log('📝 Adding test document to labours collection...');
      
      const testData = {
        name: 'TEST LABOUR - DELETE ME',
        age: 25,
        gender: 'Male',
        contact: '0000000000',
        wages: 500,
        status: 'available',
        skills: ['Testing'],
        createdAt: new Date(),
        testField: true
      };

      const docRef = await addDoc(collection(db, "labours"), testData);
      console.log('✅ Test document added with ID:', docRef.id);
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('❌ Failed to add test document:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all documents from labours collection
  async getAllLabours() {
    try {
      console.log('🔍 Getting ALL documents from labours collection...');
      
      const q = query(collection(db, "labours"));
      const querySnapshot = await getDocs(q);
      
      console.log('📊 Total documents found:', querySnapshot.size);
      
      const documents = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documents.push({
          id: doc.id,
          ...data,
          // Add readable timestamp
          createdAt: data.createdAt ? data.createdAt.toDate().toString() : 'No date'
        });
      });

      // Log each document
      documents.forEach((doc, index) => {
        console.log(`📄 Document ${index + 1}:`, doc);
      });

      return documents;
    } catch (error) {
      console.error('❌ Error getting documents:', error);
      return { error: error.message };
    }
  }
};