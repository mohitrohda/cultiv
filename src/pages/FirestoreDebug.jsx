import React, { useState, useEffect } from 'react';
import { firestoreDebug } from '../services/firebaseDebug';
import { sampleDataService } from '../services/sampleDataService'; // Add this import

const FirestoreDebug = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [labours, setLabours] = useState([]);
  const [sampleDataStatus, setSampleDataStatus] = useState('');

  const runAllTests = async () => {
    setLoading(true);
    const testResults = {};

    console.clear();
    console.log('🚀 STARTING FIRESTORE DEBUG TESTS...');

    // Test 1: Check authentication
    testResults.auth = firestoreDebug.checkAuth();

    // Test 2: Test Firestore connection
    testResults.connection = await firestoreDebug.testConnection();

    // Test 3: List collections
    testResults.collections = await firestoreDebug.listCollections();

    // Test 4: Get all labours
    testResults.labours = await firestoreDebug.getAllLabours();
    setLabours(testResults.labours);

    // Test 5: Add test document if no labours found
    if (testResults.labours.length === 0) {
      testResults.testDocument = await firestoreDebug.addTestDocument();
      // Reload labours after adding test document
      testResults.labours = await firestoreDebug.getAllLabours();
      setLabours(testResults.labours);
    }

    setResults(testResults);
    setLoading(false);

    console.log('🎯 ALL TESTS COMPLETED:', testResults);
  };

  const addTestLabour = async () => {
    setLoading(true);
    const result = await firestoreDebug.addTestDocument();
    if (result.success) {
      // Reload labours
      const updatedLabours = await firestoreDebug.getAllLabours();
      setLabours(updatedLabours);
    }
    setLoading(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1>🔧 Firestore Debug Dashboard</h1>
      
      {/* Control Panel */}
      <div style={{ 
        background: '#2c3e50', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2>🎛️ Control Panel</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={runAllTests}
            disabled={loading}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {loading ? '🔄 Running Tests...' : '🚀 Run All Tests'}
          </button>
          <button 
            onClick={addTestLabour}
            disabled={loading}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🧪 Add Test Labour
          </button>
          <button 
            onClick={() => firestoreDebug.getAllLabours().then(setLabours)}
            disabled={loading}
            style={{
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh Labours
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Test Results */}
        <div>
          <h2>📊 Test Results</h2>
          
          <div style={{ 
            background: results.connection?.success ? '#d4edda' : '#f8d7da',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <h3>🔗 Firestore Connection</h3>
            <p><strong>Status:</strong> {results.connection?.success ? '✅ Connected' : '❌ Failed'}</p>
            <p><strong>Documents:</strong> {results.connection?.documentCount}</p>
            {results.connection?.error && (
              <p><strong>Error:</strong> {results.connection.error}</p>
            )}
          </div>

          <div style={{ 
            background: '#fff3cd',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <h3>📁 Collections</h3>
            {results.collections && Object.entries(results.collections).map(([name, count]) => (
              <p key={name}><strong>{name}:</strong> {count}</p>
            ))}
          </div>

          <div style={{ 
            background: '#d1ecf1',
            padding: '15px',
            borderRadius: '8px'
          }}>
            <h3>🔐 Authentication</h3>
            <p><strong>Status:</strong> {results.auth ? '✅ Logged In' : '❌ Not Logged In'}</p>
            {results.auth && (
              <p><strong>User:</strong> {results.auth.email}</p>
            )}
          </div>
        </div>

        {/* Labours Data */}
        <div>
          <h2>👥 Labours Data ({labours.length})</h2>
          
          {labours.length === 0 ? (
            <div style={{ 
              background: '#f8d7da',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>🚫 No Labours Found</h3>
              <p>Click "Add Test Labour" to create a sample record.</p>
            </div>
          ) : (
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {labours.map((labour, index) => (
                <div key={labour.id} style={{
                  background: labour.testField ? '#fff3cd' : '#f8f9fa',
                  border: '1px solid #dee2e6',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '8px'
                }}>
                  <h4>
                    {labour.testField ? '🧪 ' : '👤 '}
                    {labour.name} 
                    {labour.testField && ' (TEST)'}
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '5px',
                    fontSize: '0.9em'
                  }}>
                    <div><strong>ID:</strong> {labour.id}</div>
                    <div><strong>Status:</strong> {labour.status}</div>
                    <div><strong>Age:</strong> {labour.age}</div>
                    <div><strong>Wages:</strong> ₹{labour.wages}</div>
                    <div><strong>Skills:</strong> {labour.skills?.join(', ') || 'None'}</div>
                    <div><strong>Created:</strong> {labour.createdAt}</div>
                  </div>
                  {labour.testField && (
                    <div style={{ 
                      marginTop: '10px', 
                      padding: '5px',
                      background: '#e74c3c',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.8em'
                    }}>
                      ⚠️ This is a test document. You can delete it from Firebase Console.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div style={{ 
        background: '#e8f4f8',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>📖 Next Steps</h2>
        <ol style={{ textAlign: 'left' }}>
          <li>Check browser console for detailed logs (F12)</li>
          <li>If connection fails, check Firebase configuration</li>
          <li>If no labours found, use "Add Test Labour" button</li>
          <li>Verify Firestore security rules in Firebase Console</li>
          <li>Check if user is properly authenticated</li>
        </ol>
      </div>
    </div>
  );
};

export default FirestoreDebug;