from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your trained model
try:
    with open('crop_recommendation_model.pkl', 'rb') as file:
        model = pickle.load(file)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Crop information database
crop_info = {
    'Rice': {
        'description': 'Staple food crop requiring high water and warm temperatures',
        'season': 'Kharif (June-September)',
        'water': 'High',
        'soil': 'Clayey loam',
        'duration': '3-6 months',
        'fertilizer': 'Nitrogen-rich fertilizers'
    },
    'Maize': {
        'description': 'Versatile cereal crop grown in diverse conditions',
        'season': 'Kharif & Rabi',
        'water': 'Moderate',
        'soil': 'Well-drained loam',
        'duration': '3-4 months',
        'fertilizer': 'Balanced NPK'
    },
    'ChickPea': {
        'description': 'Protein-rich pulse crop, drought resistant',
        'season': 'Rabi (October-March)',
        'water': 'Low',
        'soil': 'Sandy loam',
        'duration': '4-5 months',
        'fertilizer': 'Phosphorus-rich fertilizers'
    },
    'KidneyBeans': {
        'description': 'Nutritious beans rich in protein and fiber',
        'season': 'Rabi',
        'water': 'Moderate',
        'soil': 'Well-drained soil',
        'duration': '3-4 months',
        'fertilizer': 'Balanced NPK'
    },
    'PigeonPeas': {
        'description': 'Drought-resistant pulse crop',
        'season': 'Kharif',
        'water': 'Low',
        'soil': 'Sandy loam',
        'duration': '5-6 months',
        'fertilizer': 'Phosphorus-rich'
    },
    'MothBeans': {
        'description': 'Drought-resistant legume crop',
        'season': 'Kharif',
        'water': 'Low',
        'soil': 'Sandy soil',
        'duration': '2.5-3 months',
        'fertilizer': 'Low nitrogen required'
    },
    'MungBean': {
        'description': 'Short-duration pulse crop',
        'season': 'Kharif & Summer',
        'water': 'Moderate',
        'soil': 'Well-drained loam',
        'duration': '2-3 months',
        'fertilizer': 'Phosphorus-rich'
    },
    'Blackgram': {
        'description': 'Protein-rich pulse crop',
        'season': 'Kharif',
        'water': 'Moderate',
        'soil': 'Clay loam',
        'duration': '3-4 months',
        'fertilizer': 'Balanced NPK'
    },
    'Lentil': {
        'description': 'Winter pulse crop, rich in protein',
        'season': 'Rabi',
        'water': 'Low',
        'soil': 'Clay loam',
        'duration': '4-5 months',
        'fertilizer': 'Phosphorus-rich'
    },
    'Pomegranate': {
        'description': 'Fruit crop with high medicinal value',
        'season': 'Year-round',
        'water': 'Moderate',
        'soil': 'Well-drained loam',
        'duration': 'Perennial',
        'fertilizer': 'Organic manure + NPK'
    },
    'Banana': {
        'description': 'Tropical fruit crop',
        'season': 'Year-round',
        'water': 'High',
        'soil': 'Rich loam',
        'duration': '12-15 months',
        'fertilizer': 'High potassium'
    },
    'Mango': {
        'description': 'King of fruits, tropical tree',
        'season': 'Summer',
        'water': 'Moderate',
        'soil': 'Deep loam',
        'duration': 'Perennial',
        'fertilizer': 'NPK + Micronutrients'
    },
    'Grapes': {
        'description': 'Fruit vine, requires trellising',
        'season': 'Year-round',
        'water': 'Moderate',
        'soil': 'Well-drained soil',
        'duration': 'Perennial',
        'fertilizer': 'Balanced NPK'
    },
    'Watermelon': {
        'description': 'Summer fruit, high water content',
        'season': 'Summer',
        'water': 'High',
        'soil': 'Sandy loam',
        'duration': '3-4 months',
        'fertilizer': 'Nitrogen-rich'
    },
    'Muskmelon': {
        'description': 'Sweet summer fruit',
        'season': 'Summer',
        'water': 'Moderate',
        'soil': 'Sandy loam',
        'duration': '3-4 months',
        'fertilizer': 'Balanced NPK'
    },
    'Apple': {
        'description': 'Temperate fruit crop',
        'season': 'Winter',
        'water': 'Moderate',
        'soil': 'Well-drained loam',
        'duration': 'Perennial',
        'fertilizer': 'NPK + Organic'
    },
    'Orange': {
        'description': 'Citrus fruit, rich in Vitamin C',
        'season': 'Winter',
        'water': 'Moderate',
        'soil': 'Deep loam',
        'duration': 'Perennial',
        'fertilizer': 'NPK + Micronutrients'
    },
    'Papaya': {
        'description': 'Tropical fruit, quick growing',
        'season': 'Year-round',
        'water': 'Moderate',
        'soil': 'Well-drained soil',
        'duration': '2-3 years',
        'fertilizer': 'Balanced NPK'
    },
    'Coconut': {
        'description': 'Tropical palm, multi-purpose crop',
        'season': 'Year-round',
        'water': 'High',
        'soil': 'Sandy loam',
        'duration': 'Perennial',
        'fertilizer': 'Salt + NPK'
    },
    'Cotton': {
        'description': 'Fiber crop, requires warm climate',
        'season': 'Kharif',
        'water': 'Moderate',
        'soil': 'Black soil',
        'duration': '5-6 months',
        'fertilizer': 'Nitrogen-rich'
    },
    'Jute': {
        'description': 'Fiber crop, golden fiber',
        'season': 'Kharif',
        'water': 'High',
        'soil': 'Alluvial soil',
        'duration': '4-5 months',
        'fertilizer': 'Nitrogen + Potash'
    },
    'Coffee': {
        'description': 'Beverage crop, shade loving',
        'season': 'Year-round',
        'water': 'High',
        'soil': 'Volcanic soil',
        'duration': 'Perennial',
        'fertilizer': 'Nitrogen-rich'
    }
}

@app.route('/')
def home():
    return jsonify({
        'message': 'Crop Recommendation API is running!',
        'status': 'active',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Extract features in the exact order your model expects
        features = [
            int(data['nitrogen']),
            int(data['phosphorus']),
            int(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph_value']),
            float(data['rainfall'])
        ]
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        
        # Get prediction probabilities for confidence score
        probabilities = model.predict_proba(features_array)[0]
        confidence = max(probabilities)
        
        # Get crop information
        crop_data = crop_info.get(prediction, {
            'description': 'Optimal crop for your conditions',
            'season': 'Varies',
            'water': 'Moderate',
            'soil': 'Well-drained',
            'duration': 'Seasonal',
            'fertilizer': 'Balanced NPK'
        })
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'confidence': round(confidence * 100, 2),
            'crop_info': crop_data,
            'input_data': data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Error processing prediction request'
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)