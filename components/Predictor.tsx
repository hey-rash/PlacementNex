import React, { useState } from 'react';
import { predictPlacementProbability } from '../utils/dsa';
import { PlacementProbability } from '../types';
import { BrainCircuit } from 'lucide-react';

const Predictor: React.FC = () => {
  const [cgpa, setCgpa] = useState<number>(0);
  const [skills, setSkills] = useState<number>(0);
  const [projects, setProjects] = useState<number>(0);
  const [prediction, setPrediction] = useState<PlacementProbability | null>(null);

  const handlePredict = () => {
    const result = predictPlacementProbability(cgpa, skills, projects);
    setPrediction(result);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <BrainCircuit className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Placement Predictor</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CGPA (0-10)</label>
          <input 
            type="number" 
            max="10"
            className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border placeholder-gray-400" 
            value={cgpa} 
            onChange={(e) => setCgpa(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Technical Skills</label>
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border placeholder-gray-400"
            value={skills}
            onChange={(e) => setSkills(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Projects Completed</label>
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border placeholder-gray-400"
            value={projects}
            onChange={(e) => setProjects(parseInt(e.target.value))}
          />
        </div>
        
        <button 
          onClick={handlePredict}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Predict Probability
        </button>
      </div>

      {prediction && (
        <div className={`mt-6 p-4 rounded-lg text-center font-bold text-xl ${
          prediction === 'High' ? 'bg-green-100 text-green-800' :
          prediction === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          Probability: {prediction}
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500 border-t pt-4">
        <p><strong>Underlying DSA:</strong> Rule-based Decision Tree.</p>
        <p>The logic traverses a tree of conditions (CGPA nodes, Skill nodes) to reach a leaf node (Probability).</p>
      </div>
    </div>
  );
};

export default Predictor;