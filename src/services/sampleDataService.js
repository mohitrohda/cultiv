import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export const sampleDataService = {
  // Generate realistic sample labour data
  async addSampleLabours() {
    const sampleLabours = [
      {
        name: 'Rajesh Kumar',
        age: 32,
        gender: 'Male',
        contact: '9876543210',
        address: 'Village: Rampur, District: Aligarh, Uttar Pradesh',
        wages: 550,
        availableFrom: '2024-01-15',
        availableTo: '2024-12-15',
        experience: [
          { crop: 'Rice', duration: '8', farmSize: '12', employer: 'Green Fields Farm' },
          { crop: 'Wheat', duration: '6', farmSize: '8', employer: 'Sharma Farms' },
          { crop: 'Sugarcane', duration: '4', farmSize: '15', employer: 'Sweet Cane Co-op' }
        ],
        skills: ['Ploughing', 'Sowing', 'Harvesting', 'Irrigation', 'Tractor Operation'],
        preferredCrops: ['Rice', 'Wheat', 'Sugarcane', 'Vegetables'],
        languages: ['Hindi', 'English', 'Bhojpuri'],
        education: 'High School',
        status: 'available',
        rating: 4.5,
        totalJobs: 23,
        verified: true,
        createdAt: new Date()
      },
      {
        name: 'Sunita Devi',
        age: 28,
        gender: 'Female',
        contact: '8765432109',
        address: 'Village: Barabanki, District: Barabanki, Uttar Pradesh',
        wages: 480,
        availableFrom: '2024-02-01',
        availableTo: '2024-11-30',
        experience: [
          { crop: 'Vegetables', duration: '6', farmSize: '5', employer: 'Organic Greens' },
          { crop: 'Flowers', duration: '3', farmSize: '3', employer: 'Bloom Gardens' },
          { crop: 'Fruits', duration: '4', farmSize: '8', employer: 'Orchard Fresh' }
        ],
        skills: ['Weeding', 'Harvesting', 'Pruning', 'Pest Control', 'Organic Farming'],
        preferredCrops: ['Vegetables', 'Flowers', 'Fruits', 'Spices'],
        languages: ['Hindi', 'Awadhi'],
        education: 'Secondary School',
        status: 'available',
        rating: 4.8,
        totalJobs: 18,
        verified: true,
        createdAt: new Date()
      },
      {
        name: 'Amit Singh',
        age: 45,
        gender: 'Male',
        contact: '7654321098',
        address: 'Village: Sultanpur, District: Sultanpur, Uttar Pradesh',
        wages: 700,
        availableFrom: '2024-01-01',
        availableTo: '2024-12-31',
        experience: [
          { crop: 'Rice', duration: '20', farmSize: '25', employer: 'Multiple Farms' },
          { crop: 'Wheat', duration: '18', farmSize: '20', employer: 'Multiple Farms' },
          { crop: 'Pulses', duration: '12', farmSize: '15', employer: 'Dal Producers Co-op' },
          { crop: 'Cotton', duration: '8', farmSize: '18', employer: 'Textile Growers' }
        ],
        skills: ['Ploughing', 'Sowing', 'Harvesting', 'Irrigation', 'Tractor Operation', 'Crop Management'],
        preferredCrops: ['Rice', 'Wheat', 'Pulses', 'Cotton', 'Maize'],
        languages: ['Hindi', 'English', 'Awadhi'],
        education: 'Primary School',
        status: 'available',
        rating: 4.9,
        totalJobs: 156,
        verified: true,
        createdAt: new Date()
      },
      {
        name: 'Priya Sharma',
        age: 26,
        gender: 'Female',
        contact: '6543210987',
        address: 'Village: Lucknow, District: Lucknow, Uttar Pradesh',
        wages: 520,
        availableFrom: '2024-03-01',
        availableTo: '2024-10-31',
        experience: [
          { crop: 'Vegetables', duration: '5', farmSize: '6', employer: 'City Greens' },
          { crop: 'Spices', duration: '3', farmSize: '4', employer: 'Spice Garden' },
          { crop: 'Medicinal Plants', duration: '2', farmSize: '3', employer: 'Herbal Farms' }
        ],
        skills: ['Weeding', 'Harvesting', 'Pruning', 'Greenhouse Management', 'Organic Farming'],
        preferredCrops: ['Vegetables', 'Spices', 'Medicinal Plants', 'Flowers'],
        languages: ['Hindi', 'English', 'Urdu'],
        education: 'High School',
        status: 'available',
        rating: 4.6,
        totalJobs: 32,
        verified: true,
        createdAt: new Date()
      },
      {
        name: 'Vikram Yadav',
        age: 38,
        gender: 'Male',
        contact: '9432109876',
        address: 'Village: Gorakhpur, District: Gorakhpur, Uttar Pradesh',
        wages: 600,
        availableFrom: '2024-01-10',
        availableTo: '2024-11-30',
        experience: [
          { crop: 'Rice', duration: '12', farmSize: '18', employer: 'Paddy Fields Inc' },
          { crop: 'Maize', duration: '8', farmSize: '12', employer: 'Corn Producers' },
          { crop: 'Sugarcane', duration: '6', farmSize: '20', employer: 'Sugar Mill Co-op' }
        ],
        skills: ['Tractor Operation', 'Ploughing', 'Sowing', 'Harvesting', 'Irrigation', 'Machine Maintenance'],
        preferredCrops: ['Rice', 'Maize', 'Sugarcane', 'Pulses'],
        languages: ['Hindi', 'Bhojpuri'],
        education: 'Middle School',
        status: 'available',
        rating: 4.7,
        totalJobs: 89,
        verified: true,
        createdAt: new Date()
      }
    ];

    try {
      console.log('🚀 Adding sample labours to Firestore...');
      const results = [];

      for (const labour of sampleLabours) {
        try {
          const docRef = await addDoc(collection(db, "labours"), labour);
          console.log(`✅ Added: ${labour.name} (ID: ${docRef.id})`);
          results.push({
            success: true,
            name: labour.name,
            id: docRef.id
          });
        } catch (error) {
          console.error(`❌ Failed to add ${labour.name}:`, error);
          results.push({
            success: false,
            name: labour.name,
            error: error.message
          });
        }
      }

      console.log('🎯 Sample data addition completed');
      return {
        success: true,
        message: `Added ${results.filter(r => r.success).length} out of ${sampleLabours.length} sample labours`,
        details: results
      };

    } catch (error) {
      console.error('❌ Error adding sample labours:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Add quick sample (2 labours)
  async addQuickSamples() {
    const quickSamples = [
      {
        name: 'Ramesh Patel',
        age: 35,
        gender: 'Male',
        contact: '9123456789',
        address: 'Village: Varanasi, District: Varanasi, Uttar Pradesh',
        wages: 580,
        availableFrom: '2024-02-01',
        availableTo: '2024-12-15',
        experience: [
          { crop: 'Rice', duration: '10', farmSize: '15', employer: 'Ganga Farms' },
          { crop: 'Vegetables', duration: '5', farmSize: '8', employer: 'Local Market Garden' }
        ],
        skills: ['Ploughing', 'Sowing', 'Harvesting', 'Irrigation'],
        preferredCrops: ['Rice', 'Vegetables', 'Pulses'],
        languages: ['Hindi', 'Bhojpuri'],
        education: 'Primary School',
        status: 'available',
        rating: 4.4,
        totalJobs: 45,
        verified: true,
        createdAt: new Date()
      },
      {
        name: 'Laxmi Kumari',
        age: 29,
        gender: 'Female',
        contact: '8987654321',
        address: 'Village: Ayodhya, District: Ayodhya, Uttar Pradesh',
        wages: 500,
        availableFrom: '2024-03-01',
        availableTo: '2024-10-31',
        experience: [
          { crop: 'Flowers', duration: '4', farmSize: '4', employer: 'Temple Gardens' },
          { crop: 'Vegetables', duration: '3', farmSize: '6', employer: 'Community Farm' }
        ],
        skills: ['Weeding', 'Harvesting', 'Pruning', 'Organic Farming'],
        preferredCrops: ['Flowers', 'Vegetables', 'Fruits'],
        languages: ['Hindi', 'Awadhi'],
        education: 'Secondary School',
        status: 'available',
        rating: 4.6,
        totalJobs: 28,
        verified: true,
        createdAt: new Date()
      }
    ];

    try {
      console.log('🚀 Adding quick sample labours...');
      const results = [];

      for (const labour of quickSamples) {
        const docRef = await addDoc(collection(db, "labours"), labour);
        results.push({
          success: true,
          name: labour.name,
          id: docRef.id
        });
      }

      return {
        success: true,
        message: `Added ${results.length} sample labours`,
        details: results
      };

    } catch (error) {
      console.error('❌ Error adding quick samples:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};