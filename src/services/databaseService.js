import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  doc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from './firebase';

// Labour Services
export const labourService = {
  // Add new labour with experience
  async addLabour(labourData) {
    try {
      console.log('📝 Adding labour data to Firestore:', labourData);
      
      const labourToSave = {
        name: labourData.name || '',
        age: parseInt(labourData.age) || 0,
        gender: labourData.gender || '',
        contact: labourData.contact || '',
        address: labourData.address || '',
        wages: parseFloat(labourData.wages) || 0,
        availableFrom: labourData.availableFrom || '',
        availableTo: labourData.availableTo || '',
        experience: labourData.experience || [],
        skills: labourData.skills || [],
        preferredCrops: labourData.preferredCrops || [],
        languages: labourData.languages || ['Hindi'],
        education: labourData.education || '',
        status: 'available',
        rating: 0,
        totalJobs: 0,
        verified: false,
        createdAt: new Date()
      };

      console.log('💾 Saving to Firestore:', labourToSave);
      
      const docRef = await addDoc(collection(db, "labours"), labourToSave);
      
      console.log('✅ Labour added successfully with ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('❌ Error adding labour:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all labours with filters - SIMPLIFIED VERSION
  async getLabours(filters = {}) {
    try {
      console.log('🔍 Fetching labours from Firestore with filters:', filters);
      
      // Simple query - just get all available labours
      let q = query(
        collection(db, "labours"), 
        where('status', '==', 'available'),
        orderBy('createdAt', 'desc')
      );

      console.log('📡 Executing Firestore query...');
      const querySnapshot = await getDocs(q);
      
      console.log('📊 Query snapshot size:', querySnapshot.size);
      
      const labours = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const labour = {
          id: doc.id,
          ...data
        };
        console.log('👤 Found labour:', labour);
        labours.push(labour);
      });

      console.log('✅ Total labours found:', labours.length);
      
      // Apply client-side filters if needed
      let filteredLabours = labours;
      
      if (filters.skill && filters.skill !== '') {
        filteredLabours = filteredLabours.filter(labour => 
          labour.skills && labour.skills.includes(filters.skill)
        );
        console.log(`🔧 After skill filter (${filters.skill}):`, filteredLabours.length);
      }
      
      if (filters.cropExperience && filters.cropExperience !== '') {
        filteredLabours = filteredLabours.filter(labour => 
          labour.preferredCrops && labour.preferredCrops.includes(filters.cropExperience)
        );
        console.log(`🌾 After crop filter (${filters.cropExperience}):`, filteredLabours.length);
      }
      
      if (filters.minExperience && filters.minExperience !== '') {
        filteredLabours = filteredLabours.filter(labour => {
          const totalExp = labour.experience?.reduce((total, exp) => total + parseInt(exp.duration || 0), 0) || 0;
          return totalExp >= parseInt(filters.minExperience);
        });
        console.log(`📅 After min experience filter (${filters.minExperience}):`, filteredLabours.length);
      }
      
      if (filters.maxWage && filters.maxWage !== '') {
        filteredLabours = filteredLabours.filter(labour => 
          labour.wages <= parseFloat(filters.maxWage)
        );
        console.log(`💰 After max wage filter (${filters.maxWage}):`, filteredLabours.length);
      }

      console.log('🎯 Final filtered labours:', filteredLabours.length);
      return filteredLabours;
      
    } catch (error) {
      console.error("❌ Error getting labours from Firestore: ", error);
      console.error("Error details:", error.message);
      return [];
    }
  },

  // Hire a labour
  async hireLabour(labourId) {
    try {
      console.log('🤝 Hiring labour:', labourId);
      const labourRef = doc(db, "labours", labourId);
      await updateDoc(labourRef, {
        status: 'hired',
        hiredAt: new Date()
      });
      console.log('✅ Labour hired successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error hiring labour:', error);
      return { success: false, error: error.message };
    }
  }
};

// Machine Services
export const machineService = {
  // Add machine for rent
  async addMachine(machineData) {
    try {
      const docRef = await addDoc(collection(db, "machines"), {
        ...machineData,
        status: 'available',
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all machines
  async getMachines() {
    try {
      const q = query(collection(db, "machines"), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const machines = [];
      querySnapshot.forEach((doc) => {
        machines.push({ id: doc.id, ...doc.data() });
      });
      return machines;
    } catch (error) {
      console.error("Error getting machines: ", error);
      return [];
    }
  },

  // Rent a machine
  async rentMachine(machineId) {
    try {
      const machineRef = doc(db, "machines", machineId);
      await updateDoc(machineRef, {
        status: 'rented'
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Produce Services
export const produceService = {
  // Add produce for sale
  async addProduce(produceData) {
    try {
      const docRef = await addDoc(collection(db, "produce"), {
        ...produceData,
        status: 'available',
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all produce
  async getProduce() {
    try {
      const q = query(collection(db, "produce"), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const produce = [];
      querySnapshot.forEach((doc) => {
        produce.push({ id: doc.id, ...doc.data() });
      });
      return produce;
    } catch (error) {
      console.error("Error getting produce: ", error);
      return [];
    }
  },

  // Buy produce
  async buyProduce(produceId) {
    try {
      const produceRef = doc(db, "produce", produceId);
      await updateDoc(produceRef, {
        status: 'sold'
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};