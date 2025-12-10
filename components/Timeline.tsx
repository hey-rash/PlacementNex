import React, { useState } from 'react';
import { Company, Student } from '../types';
import { RecruitmentQueue } from '../utils/dsa';
import { STUDENTS } from '../data/mockData';
import { PlayCircle, CheckCircle, XCircle } from 'lucide-react';

interface TimelineProps {
  companies: Company[];
}

const Timeline: React.FC<TimelineProps> = ({ companies }) => {
  // Sort companies by arrival date (simulating Processing Queue)
  const sortedCompanies = [...companies].sort((a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime());

  // Simulation State
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [roundInfo, setRoundInfo] = useState<{round: string, count: number, passed: number}[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = (company: Company) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveSimulation(company.id);
    setRoundInfo([]);

    const queue = new RecruitmentQueue<Student>();
    // 1. Enqueue all interested students (mock: all unplaced or students with matching branch)
    STUDENTS.forEach(s => queue.enqueue(s));

    let roundsData: any[] = [];
    
    // Simulate async rounds
    const rounds = [
        { name: 'Resume Shortlisting', passRate: 0.8 }, 
        { name: 'Online Assessment', passRate: 0.5 }, 
        { name: 'Technical Interview', passRate: 0.4 }, 
        { name: 'HR Interview', passRate: 0.9 }
    ].slice(0, company.rounds);

    let currentRoundIndex = 0;

    const processNextRound = () => {
        if (currentRoundIndex >= rounds.length) {
            setIsSimulating(false);
            return;
        }

        const round = rounds[currentRoundIndex];
        const initialCount = queue.size();
        
        // Process Queue: Dequeue everyone, check pass logic, Enqueue winners
        const winners: Student[] = [];
        const size = queue.size();
        for(let i=0; i<size; i++) {
            const student = queue.dequeue();
            if (student) {
                // Mock pass logic (Random + Skill match factor could be added here)
                if (Math.random() < round.passRate) {
                    winners.push(student);
                }
            }
        }

        // Enqueue winners for next round
        winners.forEach(w => queue.enqueue(w));
        
        roundsData = [...roundsData, { round: round.name, count: initialCount, passed: winners.length }];
        setRoundInfo(roundsData);
        
        currentRoundIndex++;
        setTimeout(processNextRound, 800); // Visual delay
    };

    processNextRound();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Timeline List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
         <h2 className="text-2xl font-bold text-gray-800 mb-6">Placement Drive Timeline</h2>
         <div className="relative border-l-4 border-indigo-200 ml-3 space-y-8">
            {sortedCompanies.map((company) => (
              <div key={company.id} className="relative pl-8 group">
                <div className="absolute -left-2.5 top-1 bg-indigo-600 w-5 h-5 rounded-full border-4 border-white"></div>
                
                <div className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition flex justify-between items-start">
                  <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{company.arrivalDate}</span>
                      <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Role: {company.offeredRole}</p>
                      <div className="mt-2 text-xs text-gray-500">{company.rounds} Rounds • {company.hires} Hires</div>
                  </div>
                  <button 
                    onClick={() => runSimulation(company)}
                    className="p-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition"
                    title="Simulate Drive"
                  >
                    <PlayCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Simulation Panel */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md h-fit sticky top-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Drive Simulator (DSA: Queue)
          </h3>
          
          {activeSimulation ? (
              <div className="space-y-4">
                  <p className="text-sm text-gray-400">Simulating process for: <span className="text-white font-bold">{companies.find(c => c.id === activeSimulation)?.name}</span></p>
                  
                  <div className="space-y-2">
                      {roundInfo.map((r, i) => (
                          <div key={i} className="bg-slate-800 p-3 rounded-lg border border-slate-700 animate-in slide-in-from-left duration-500">
                              <div className="flex justify-between text-sm mb-1">
                                  <span className="text-blue-300 font-medium">Round {i+1}: {r.round}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center text-red-400 text-xs"><XCircle className="w-3 h-3 mr-1"/> {r.count - r.passed} Eliminated</div>
                                  <div className="flex items-center text-green-400 text-xs"><CheckCircle className="w-3 h-3 mr-1"/> {r.passed} Passed</div>
                              </div>
                              {/* Progress bar visual */}
                              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(r.passed / r.count) * 100}%`}}></div>
                              </div>
                          </div>
                      ))}
                      
                      {isSimulating && (
                          <div className="text-center p-4">
                              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                              <p className="text-xs text-gray-500 mt-2">Processing candidates from Queue...</p>
                          </div>
                      )}
                      
                      {!isSimulating && roundInfo.length > 0 && (
                          <div className="bg-green-900/50 border border-green-500/30 p-3 rounded-lg text-center mt-4">
                              <p className="font-bold text-green-400">Simulation Complete</p>
                              <p className="text-xs">Final candidates selected.</p>
                          </div>
                      )}
                  </div>
              </div>
          ) : (
              <div className="text-center text-gray-500 py-10">
                  <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Select a company from the timeline to simulate the queue-based hiring process.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default Timeline;