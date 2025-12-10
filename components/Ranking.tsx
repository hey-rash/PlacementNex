import React, { useMemo } from 'react';
import { StudentMaxHeap } from '../utils/dsa';
import { Student } from '../types';
import { Trophy } from 'lucide-react';

interface RankingProps {
  students: Student[];
}

const Ranking: React.FC<RankingProps> = ({ students }) => {
  const rankedStudents = useMemo(() => {
    const heap = new StudentMaxHeap(students);
    return heap.getRankedList();
  }, [students]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Competitiveness Ranking</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">Ranked using Max-Heap DSA based on weighted score of CGPA, Skills, and Experience.</p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankedStudents.map((student, index) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">#{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.cgpa}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.skills.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;