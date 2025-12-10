import React, { useState } from 'react';
import { Company } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building2, TrendingUp, Users } from 'lucide-react';

interface Props {
  companies: Company[];
}

const CompanyInsights: React.FC<Props> = ({ companies }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].id);
  const selectedCompany = companies.find(c => c.id === selectedCompanyId)!;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Company Insights</h2>
        <select 
          className="p-2 border border-gray-600 bg-slate-800 text-white rounded-md w-64"
          value={selectedCompanyId}
          onChange={(e) => setSelectedCompanyId(e.target.value)}
        >
          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 flex items-center">
          <div className="p-3 bg-indigo-100 rounded-full mr-4">
            <TrendingUp className="text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Current Package</p>
            <p className="text-2xl font-bold text-gray-800">₹{selectedCompany.package} LPA</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500 flex items-center">
          <div className="p-3 bg-emerald-100 rounded-full mr-4">
            <Users className="text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Hires</p>
            <p className="text-2xl font-bold text-gray-800">{selectedCompany.hires}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 flex items-center">
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <Building2 className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Role Offered</p>
            <p className="text-xl font-bold text-gray-800 truncate max-w-[150px]">{selectedCompany.offeredRole}</p>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Salary Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Salary Trend (Last 3 Years)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedCompany.salaryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="package" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} name="Package (LPA)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Requirements */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Skills Required</h3>
          <div className="flex-1">
             <div className="flex flex-wrap gap-2 mb-6">
               {selectedCompany.requiredSkills.map(skill => (
                 <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                   {skill}
                 </span>
               ))}
             </div>
             
             <h3 className="text-lg font-semibold mb-2 text-gray-700">Criteria</h3>
             <ul className="list-disc list-inside text-gray-600 space-y-2">
               <li>Minimum CGPA: <span className="font-bold text-gray-900">{selectedCompany.minCgpa}</span></li>
               <li>Interview Rounds: <span className="font-bold text-gray-900">{selectedCompany.rounds}</span></li>
               <li>Arrival Date: <span className="font-bold text-gray-900">{selectedCompany.arrivalDate}</span></li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInsights;