import React, { useState } from 'react';
import { LayoutDashboard, Users, TrendingUp, FileText, Calendar, ShieldAlert, Download, Layers, BarChart2, Lightbulb } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import Ranking from './components/Ranking';
import CompanyCompare from './components/CompanyCompare';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Timeline from './components/Timeline';
import Chatbot from './components/Chatbot';
import AllStudents from './components/AllStudents';
import CompanyInsights from './components/CompanyInsights';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import { STUDENTS as initialStudents, COMPANIES } from './data/mockData';
import { Student } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const handleExportPDF = () => {
    window.print();
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard students={students} companies={COMPANIES} />;
      case 'students': return <AllStudents students={students} onAddStudent={handleAddStudent} onEditStudent={handleEditStudent} />;
      case 'predict': return <Predictor />;
      case 'rank': return <Ranking students={students} />;
      case 'compare': return <CompanyCompare />;
      case 'insights': return <CompanyInsights companies={COMPANIES} />;
      case 'gap': return <SkillGapAnalysis students={students} companies={COMPANIES} />;
      case 'resume': return <ResumeAnalyzer />;
      case 'timeline': return <Timeline companies={COMPANIES} />;
      default: return <Dashboard students={students} companies={COMPANIES} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col no-print h-screen sticky top-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-tight text-blue-400">PlacementNex</h1>
          <p className="text-xs text-slate-400 mt-1">Data Analyzer System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" id="dashboard" active={activeTab} set={setActiveTab} />
          <NavItem icon={<Users />} label="Students Directory" id="students" active={activeTab} set={setActiveTab} />
          <NavItem icon={<TrendingUp />} label="Predictor (Tree)" id="predict" active={activeTab} set={setActiveTab} />
          <NavItem icon={<ShieldAlert />} label="Ranking (Heap)" id="rank" active={activeTab} set={setActiveTab} />
          <NavItem icon={<Layers />} label="Compare Companies" id="compare" active={activeTab} set={setActiveTab} />
          <NavItem icon={<BarChart2 />} label="Company Insights" id="insights" active={activeTab} set={setActiveTab} />
          <NavItem icon={<Lightbulb />} label="Skill Gap Analysis" id="gap" active={activeTab} set={setActiveTab} />
          <NavItem icon={<FileText />} label="Resume AI" id="resume" active={activeTab} set={setActiveTab} />
          <NavItem icon={<Calendar />} label="Timeline (Queue)" id="timeline" active={activeTab} set={setActiveTab} />
        </nav>
        <div className="p-4 border-t border-slate-700">
           <button 
             onClick={handleExportPDF}
             className="flex items-center w-full justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
            >
             <Download className="w-4 h-4 mr-2" /> Export PDF
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center no-print">
            <span className="font-bold">PlacementNex</span>
            <button onClick={handleExportPDF}><Download className="w-5 h-5"/></button>
        </div>

        <div className="p-8 pb-24">
           {renderContent()}
        </div>
      </main>

      {/* Chatbot Overlay - passed live data */}
      <div className="no-print">
        <Chatbot />
      </div>
    </div>
  );
};

const NavItem: React.FC<{icon: any, label: string, id: string, active: string, set: (s: string) => void}> = ({ icon, label, id, active, set }) => (
  <button 
    onClick={() => set(id)}
    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition mb-1 ${
      active === id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <span className="w-5 h-5 mr-3 flex-shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

export default App;