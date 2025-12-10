import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Student, Company } from '../types';

interface DashboardProps {
  students: Student[];
  companies: Company[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC<DashboardProps> = ({ students, companies }) => {
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.placed).length;
  const placementPercentage = ((placedStudents / totalStudents) * 100).toFixed(1);
  const avgPackage = (students.reduce((acc, curr) => acc + (curr.package || 0), 0) / placedStudents).toFixed(2);
  const maxPackage = Math.max(...students.map(s => s.package || 0));

  // Data for Branch-wise chart
  const branchData = students.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.branch);
    if (existing) {
      existing.total++;
      if (curr.placed) existing.placed++;
    } else {
      acc.push({ name: curr.branch, total: 1, placed: curr.placed ? 1 : 0 });
    }
    return acc;
  }, []);

  const pieData = [
    { name: 'Placed', value: placedStudents },
    { name: 'Unplaced', value: totalStudents - placedStudents },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Placement Overview</h2>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Placement Rate</p>
          <p className="text-3xl font-bold text-gray-800">{placementPercentage}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Average Package</p>
          <p className="text-3xl font-bold text-gray-800">₹{avgPackage} LPA</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Highest Package</p>
          <p className="text-3xl font-bold text-gray-800">₹{maxPackage} LPA</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm">Total Offers</p>
          <p className="text-3xl font-bold text-gray-800">{placedStudents}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Branch-wise Placement Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#e2e8f0" name="Total Students" />
              <Bar dataKey="placed" fill="#3b82f6" name="Placed Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Placement Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;