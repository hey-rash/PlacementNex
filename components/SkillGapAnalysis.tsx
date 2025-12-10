import React, { useMemo } from 'react';
import { Student, Company } from '../types';
import { analyzeSkillGap } from '../utils/dsa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lightbulb, AlertTriangle } from 'lucide-react';

interface Props {
  students: Student[];
  companies: Company[];
}

const SkillGapAnalysis: React.FC<Props> = ({ students, companies }) => {
  const { gapData, highValueSkills } = useMemo(() => analyzeSkillGap(students, companies), [students, companies]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Skill Gap & Correlation Analysis</h2>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Supply vs Demand */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Market Gap (Demand vs Supply)
          </h3>
          <p className="text-sm text-gray-500 mb-4">DSA: HashMap counting across {companies.length} companies and {students.length} students.</p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={gapData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#ef4444" name="Industry Demand" />
              <Bar dataKey="supply" fill="#3b82f6" name="Student Supply" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* High Value Skills */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
             <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
             High Value Skills
          </h3>
          <p className="text-sm text-gray-500 mb-4">Skills correlated with highest average packages.</p>
          
          <div className="space-y-4">
            {highValueSkills.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                <span className="font-bold text-green-600">₹{item.avgPackage.toFixed(1)} LPA</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <strong>Recommendation:</strong> Students should focus on 
            <span className="font-bold"> {highValueSkills[0]?.name} </span> 
            and 
            <span className="font-bold"> {highValueSkills[1]?.name} </span> 
            to maximize package potential.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;