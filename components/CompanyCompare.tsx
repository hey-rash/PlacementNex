import React, { useState } from 'react';
import { Company } from '../types';
import { COMPANIES } from '../data/mockData';

const CompanyCompare: React.FC = () => {
  const [c1, setC1] = useState<string>(COMPANIES[0].id);
  const [c2, setC2] = useState<string>(COMPANIES[1].id);

  const comp1 = COMPANIES.find(c => c.id === c1);
  const comp2 = COMPANIES.find(c => c.id === c2);

  if (!comp1 || !comp2) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Comparison</h2>
      
      <div className="flex gap-4 mb-6">
        <select 
          className="p-2 border border-gray-600 bg-slate-800 text-white rounded-md w-1/2" 
          value={c1} 
          onChange={(e) => setC1(e.target.value)}
        >
          {COMPANIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select 
          className="p-2 border border-gray-600 bg-slate-800 text-white rounded-md w-1/2" 
          value={c2} 
          onChange={(e) => setC2(e.target.value)}
        >
          {COMPANIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-100 font-bold">Metric</div>
        <div className="p-4 bg-blue-50 font-bold text-blue-700">{comp1.name}</div>
        <div className="p-4 bg-indigo-50 font-bold text-indigo-700">{comp2.name}</div>

        {/* Rows */}
        <div className="p-3 border-t text-sm font-medium text-gray-600">Package (LPA)</div>
        <div className={`p-3 border-t ${comp1.package > comp2.package ? 'text-green-600 font-bold' : ''}`}>₹{comp1.package}</div>
        <div className={`p-3 border-t ${comp2.package > comp1.package ? 'text-green-600 font-bold' : ''}`}>₹{comp2.package}</div>

        <div className="p-3 border-t text-sm font-medium text-gray-600">Role</div>
        <div className="p-3 border-t">{comp1.offeredRole}</div>
        <div className="p-3 border-t">{comp2.offeredRole}</div>

        <div className="p-3 border-t text-sm font-medium text-gray-600">Hires</div>
        <div className="p-3 border-t">{comp1.hires}</div>
        <div className="p-3 border-t">{comp2.hires}</div>

        <div className="p-3 border-t text-sm font-medium text-gray-600">Min CGPA</div>
        <div className="p-3 border-t">{comp1.minCgpa}</div>
        <div className="p-3 border-t">{comp2.minCgpa}</div>

        <div className="p-3 border-t text-sm font-medium text-gray-600">Rounds</div>
        <div className="p-3 border-t">{comp1.rounds}</div>
        <div className="p-3 border-t">{comp2.rounds}</div>
      </div>
    </div>
  );
};

export default CompanyCompare;