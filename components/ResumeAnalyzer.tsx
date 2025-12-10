import React, { useState } from 'react';
import { analyzeResumeKeywords } from '../utils/dsa';
import { GoogleGenAI } from "@google/genai";
import { FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';

const ResumeAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [jobDesc, setJobDesc] = useState('React Node.js SQL Python DSA');
  const [analysis, setAnalysis] = useState<any>(null);
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    // 1. Local DSA Analysis (HashMap)
    const requiredSkills = new Set(jobDesc.split(' ').map(s => s.trim()));
    const result = analyzeResumeKeywords(text, requiredSkills);
    setAnalysis(result);

    // 2. Gemini AI Analysis (Advanced)
    if (process.env.API_KEY) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Analyze this resume text for a role requiring ${jobDesc}. 
          Resume: "${text.substring(0, 500)}..." 
          Give 3 bullet points of specific advice to improve it.`,
        });
        setAiFeedback(response.text || "No feedback generated.");
      } catch (e) {
        console.error("AI Error", e);
        setAiFeedback("AI analysis unavailable (Check API Key).");
      } finally {
        setLoading(false);
      }
    } else {
      setAiFeedback("API Key not configured in environment. Using local DSA only.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FileText className="mr-2 text-blue-600" /> Resume Parser
        </h2>
        <textarea
          className="w-full h-40 p-3 border border-gray-600 bg-slate-800 text-white rounded-md mb-4 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Paste resume text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Skills (Space separated)</label>
        <input
          className="w-full p-2 border border-gray-600 bg-slate-800 text-white rounded-md mb-4 placeholder-gray-400"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !text}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
        {analysis ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Keyword Count (HashMap):</span>
              <span className="font-bold">{analysis.keywordCount}</span>
            </div>
            
            <div>
              <p className="font-semibold text-green-700 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Matched Skills</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.matchedSkills.length > 0 ? analysis.matchedSkills.map((s: string) => (
                  <span key={s} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{s}</span>
                )) : <span className="text-sm text-gray-500">None</span>}
              </div>
            </div>

            <div>
              <p className="font-semibold text-red-700 flex items-center"><XCircle className="w-4 h-4 mr-1"/> Missing Skills</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.missingSkills.length > 0 ? analysis.missingSkills.map((s: string) => (
                  <span key={s} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">{s}</span>
                )) : <span className="text-sm text-gray-500">None</span>}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-semibold text-purple-700 mb-2">AI Expert Feedback:</p>
              {loading ? (
                <Loader2 className="animate-spin text-purple-600" />
              ) : (
                <div className="prose text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                   {/* Render simple markdown-like text */}
                   {aiFeedback.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">
            Enter text to analyze score matching.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;