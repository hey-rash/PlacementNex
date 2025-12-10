import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { mergeSortStudents } from '../utils/dsa';
import { Plus, Edit2, X, Save } from 'lucide-react';

interface Props {
  students: Student[];
  onAddStudent: (s: Student) => void;
  onEditStudent: (s: Student) => void;
}

const emptyStudent: Student = {
  id: '',
  name: '',
  branch: 'CSE',
  cgpa: 0,
  skills: [],
  projects: 0,
  internships: 0,
  placed: false,
  package: 0
};

const AllStudents: React.FC<Props> = ({ students, onAddStudent, onEditStudent }) => {
  const [sortedStudents, setSortedStudents] = useState<Student[]>(students);
  const [sortConfig, setSortConfig] = useState<{key: keyof Student, direction: 'asc'|'desc'}>({ key: 'id', direction: 'asc' });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student>(emptyStudent);
  const [skillsInput, setSkillsInput] = useState('');

  // Update local sorted list when props change
  useEffect(() => {
    setSortedStudents(students);
  }, [students]);

  const handleSort = (key: keyof Student) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sorted = mergeSortStudents(students, key, direction);
    setSortedStudents(sorted);
  };

  const openAddModal = () => {
    setCurrentStudent({ ...emptyStudent, id: Date.now().toString() });
    setSkillsInput('');
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setCurrentStudent(student);
    setSkillsInput(student.skills.join(', '));
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const studentToSave = {
      ...currentStudent,
      skills: skillsInput.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    if (isEditing) {
      onEditStudent(studentToSave);
    } else {
      onAddStudent(studentToSave);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Directory</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Sorted by: Merge Sort O(N log N)</span>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hover:text-indigo-600">Name ↕</th>
              <th onClick={() => handleSort('branch')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hover:text-indigo-600">Branch ↕</th>
              <th onClick={() => handleSort('cgpa')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hover:text-indigo-600">CGPA ↕</th>
              <th onClick={() => handleSort('package')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hover:text-indigo-600">Package (LPA) ↕</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.branch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.cgpa}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.package ? `₹${s.package}` : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.placed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {s.placed ? 'Placed' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => openEditModal(s)} className="text-indigo-600 hover:text-indigo-900">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                  value={currentStudent.name}
                  onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Branch</label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                    value={currentStudent.branch}
                    onChange={(e) => setCurrentStudent({...currentStudent, branch: e.target.value})}
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CGPA</label>
                  <input 
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                    value={currentStudent.cgpa}
                    onChange={(e) => setCurrentStudent({...currentStudent, cgpa: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input 
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="React, Java, Python"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Projects</label>
                  <input 
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                    value={currentStudent.projects}
                    onChange={(e) => setCurrentStudent({...currentStudent, projects: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Internships</label>
                  <input 
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                    value={currentStudent.internships}
                    onChange={(e) => setCurrentStudent({...currentStudent, internships: parseInt(e.target.value)})}
                  />
                </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center pt-6">
                    <input 
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={currentStudent.placed}
                        onChange={(e) => setCurrentStudent({...currentStudent, placed: e.target.checked})}
                    />
                    <label className="ml-2 block text-sm text-gray-900">Placed?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Package (LPA)</label>
                    <input 
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-600 bg-slate-800 text-white shadow-sm p-2"
                        value={currentStudent.package || 0}
                        onChange={(e) => setCurrentStudent({...currentStudent, package: parseFloat(e.target.value)})}
                        disabled={!currentStudent.placed}
                    />
                  </div>
              </div>

            </div>

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudents;