import { Student, Company } from '../types';

export const STUDENTS: Student[] = [
  { id: '1', name: 'Aarav Sharma', branch: 'CSE', cgpa: 9.2, skills: ['React', 'Node.js', 'Python', 'Java'], projects: 4, internships: 2, placed: true, companyId: 'c1', package: 18, resumeText: "Expert in React and Node.js with 2 internships." },
  { id: '2', name: 'Vihaan Gupta', branch: 'CSE', cgpa: 8.5, skills: ['C++', 'DSA', 'SQL'], projects: 2, internships: 1, placed: true, companyId: 'c2', package: 12 },
  { id: '3', name: 'Aditi Singh', branch: 'ECE', cgpa: 7.8, skills: ['Verilog', 'Embedded C', 'IoT'], projects: 3, internships: 1, placed: false },
  { id: '4', name: 'Riya Patel', branch: 'IT', cgpa: 8.9, skills: ['Java', 'Spring Boot', 'AWS'], projects: 3, internships: 2, placed: true, companyId: 'c1', package: 16 },
  { id: '5', name: 'Karan Mehta', branch: 'MECH', cgpa: 7.5, skills: ['AutoCAD', 'SolidWorks'], projects: 2, internships: 0, placed: false },
  { id: '6', name: 'Sneha Reddy', branch: 'CSE', cgpa: 9.5, skills: ['AI', 'ML', 'Python', 'TensorFlow', 'React'], projects: 5, internships: 3, placed: true, companyId: 'c1', package: 22 },
  { id: '7', name: 'Rahul Verma', branch: 'ECE', cgpa: 6.8, skills: ['C', 'Basic Electronics'], projects: 1, internships: 0, placed: false },
  { id: '8', name: 'Ishaan Kumar', branch: 'IT', cgpa: 8.2, skills: ['JavaScript', 'HTML', 'CSS'], projects: 2, internships: 1, placed: true, companyId: 'c3', package: 8 },
];

export const COMPANIES: Company[] = [
  { 
    id: 'c1', 
    name: 'TechNova', 
    minCgpa: 8.5, 
    offeredRole: 'SDE II', 
    package: 18, 
    hires: 12, 
    arrivalDate: '2023-09-15', 
    rounds: 4, 
    requiredSkills: ['React', 'Node.js', 'AWS', 'DSA'],
    salaryTrend: [{ year: 2021, package: 14 }, { year: 2022, package: 16 }, { year: 2023, package: 18 }]
  },
  { 
    id: 'c2', 
    name: 'InnoSystems', 
    minCgpa: 7.5, 
    offeredRole: 'System Engineer', 
    package: 12, 
    hires: 25, 
    arrivalDate: '2023-09-20', 
    rounds: 3, 
    requiredSkills: ['Java', 'SQL', 'C++'],
    salaryTrend: [{ year: 2021, package: 9 }, { year: 2022, package: 10.5 }, { year: 2023, package: 12 }]
  },
  { 
    id: 'c3', 
    name: 'DataCorp', 
    minCgpa: 7.0, 
    offeredRole: 'Data Analyst', 
    package: 8, 
    hires: 15, 
    arrivalDate: '2023-10-05', 
    rounds: 2, 
    requiredSkills: ['Python', 'Excel', 'SQL'],
    salaryTrend: [{ year: 2021, package: 6 }, { year: 2022, package: 7 }, { year: 2023, package: 8 }]
  },
  { 
    id: 'c4', 
    name: 'CoreMech', 
    minCgpa: 6.5, 
    offeredRole: 'Graduate Trainee', 
    package: 6.5, 
    hires: 5, 
    arrivalDate: '2023-10-15', 
    rounds: 2, 
    requiredSkills: ['AutoCAD', 'Thermodynamics'],
    salaryTrend: [{ year: 2021, package: 5 }, { year: 2022, package: 5.5 }, { year: 2023, package: 6.5 }]
  },
  { 
    id: 'c5', 
    name: 'Google', 
    minCgpa: 9.0, 
    offeredRole: 'Software Engineer', 
    package: 32, 
    hires: 4, 
    arrivalDate: '2023-08-20', 
    rounds: 5, 
    requiredSkills: ['DSA', 'System Design', 'C++', 'Python'],
    salaryTrend: [{ year: 2021, package: 28 }, { year: 2022, package: 30 }, { year: 2023, package: 32 }]
  },
  { 
    id: 'c6', 
    name: 'Microsoft', 
    minCgpa: 8.8, 
    offeredRole: 'SDE I', 
    package: 45, 
    hires: 8, 
    arrivalDate: '2023-08-25', 
    rounds: 4, 
    requiredSkills: ['Azure', 'C#', 'DSA'],
    salaryTrend: [{ year: 2021, package: 40 }, { year: 2022, package: 42 }, { year: 2023, package: 45 }]
  },
  { 
    id: 'c7', 
    name: 'Amazon', 
    minCgpa: 8.5, 
    offeredRole: 'SDE', 
    package: 28, 
    hires: 20, 
    arrivalDate: '2023-09-01', 
    rounds: 4, 
    requiredSkills: ['AWS', 'Java', 'DSA'],
    salaryTrend: [{ year: 2021, package: 25 }, { year: 2022, package: 26.5 }, { year: 2023, package: 28 }]
  },
  { 
    id: 'c8', 
    name: 'Tesla', 
    minCgpa: 8.0, 
    offeredRole: 'Autopilot Engineer', 
    package: 25, 
    hires: 3, 
    arrivalDate: '2023-11-10', 
    rounds: 5, 
    requiredSkills: ['Python', 'Computer Vision', 'C++'],
    salaryTrend: [{ year: 2021, package: 20 }, { year: 2022, package: 22 }, { year: 2023, package: 25 }]
  }
];