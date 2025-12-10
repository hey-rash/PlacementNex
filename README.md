# PlacementNex - Placement Data Analyzer System

**An advanced, automated placement management dashboard featuring AI-driven insights and DSA-optimized data processing.**

---

## 1. Abstract
The **Placement Data Analyzer** is a web-based solution designed to automate the management and analysis of college placement records. Traditional methods of handling placement data via spreadsheets are error-prone and lack real-time insights. This project solves these issues by providing a centralized dashboard that not only stores data but analyzes it using custom Data Structure implementations (Heaps, Tries, Queues) and Artificial Intelligence (Gemini API) to predict outcomes, rank students, and match resumes.

## 2. Technical Stack
*   **Frontend Library:** React 18 (TypeScript)
*   **Styling:** Tailwind CSS (Modern Dashboard UI)
*   **Visualization:** Recharts (Data Visualization)
*   **AI Integration:** Google Gemini API (GenAI SDK)
*   **Icons:** Lucide React
*   **Build Tool:** Webpack / Parcel (implied by environment)

## 3. DSA Implementation Details (Core Requirement)

This project strictly implements standard Data Structures and Algorithms to handle data processing efficiently.

### A. Placement Prediction System (Decision Tree)
*   **Feature:** Predicts if a student has High/Medium/Low placement probability.
*   **DSA Used:** **Rule-based Decision Tree**.
*   **Logic:** The code uses nested conditional logic (`if-else` blocks) representing tree nodes. It traverses from a Root Node (CGPA Check) to Child Nodes (Skill Count, Projects) to reach a Leaf Node (Probability Output).
*   **Time Complexity:** `O(1)` (Constant depth traversal).

### B. Student Competitiveness Ranking (Priority Queue / Max-Heap)
*   **Feature:** Ranks students based on a weighted score of CGPA, skills, and internships.
*   **DSA Used:** **Max-Heap (Binary Heap)**.
*   **Logic:** A Class `StudentMaxHeap` maintains the heap property where the root is always the student with the highest score.
*   **Time Complexity:** 
    *   Insertion: `O(log N)`
    *   Extraction (Get Max): `O(log N)`

### C. Recruitment Drive Simulation (Queue)
*   **Feature:** Simulates students passing through multiple rounds (Aptitude -> Tech -> HR).
*   **DSA Used:** **Queue (FIFO)**.
*   **Logic:** A `RecruitmentQueue` class manages the flow. All candidates are enqueued. Round processing dequeues candidates, applies a pass filter, and enqueues winners for the next round.
*   **Time Complexity:** `O(N)` per round.

### D. Skill Gap Analysis (HashMap)
*   **Feature:** Identifies gap between Industry Demand and Student Supply.
*   **DSA Used:** **HashMap**.
*   **Logic:** Two HashMaps are built: `StudentSkillsMap` and `CompanyRequirementsMap`. We iterate through data sets once to populate counts, then compare keys.
*   **Time Complexity:** `O(N + M)` where N is students and M is companies.

### E. AI Chatbot Response (Trie)
*   **Feature:** Instant answers to common queries like "Highest Package".
*   **DSA Used:** **Trie (Prefix Tree)**.
*   **Logic:** A Trie stores mapped phrases. When a user types, the system traverses the Trie character-by-character for an instant match before falling back to the LLM.
*   **Time Complexity:** `O(L)` where L is query length.

### F. Sorting Directory (Merge Sort)
*   **Feature:** Sort students by Name, Package, or CGPA.
*   **DSA Used:** **Merge Sort**.
*   **Logic:** A recursive divide-and-conquer algorithm that splits the array and merges sorted subarrays. preferred for its stable sorting properties.
*   **Time Complexity:** `O(N log N)`.

## 4. Modules & Features

1.  **Dashboard Analytics:** Real-time counters for Placement Rate, Avg Package, and branch-wise charts.
2.  **Student Directory:** CRUD operations with Merge Sort capabilities.
3.  **Predictor:** DSA-based probability calculator.
4.  **Ranking:** Heap-based leaderboard identifying top talent.
5.  **Company Comparison:** Side-by-side metric comparison of 2 recruiters.
6.  **Company Insights:** Deep dive into specific company trends (Salary graphs, Roles).
7.  **Skill Gap Analysis:** Charts showing which skills are in demand vs supplied.
8.  **Resume Analyzer:** AI + HashMap hybrid tool to score resumes against job descriptions.
9.  **Timeline Simulation:** Visual queue processing of recruitment drives.
10. **PlacementBot:** Intelligent assistant for data queries.
11. **PDF Export:** One-click report generation.

## 5. Project Architecture

```
/
├── components/          # UI Modules
│   ├── Dashboard.tsx    # Analytics
│   ├── Predictor.tsx    # Decision Tree
│   ├── Ranking.tsx      # Max Heap
│   ├── Timeline.tsx     # Queue Simulation
│   ├── Chatbot.tsx      # Trie + AI
│   └── ...
├── utils/
│   └── dsa.ts           # Core Algorithms (Heap, Trie, Sort, Tree)
├── data/
│   └── mockData.ts      # Sample Dataset
├── App.tsx              # Main Router & Layout
└── types.ts             # TypeScript Interfaces
```

## 6. Future Scope
*   **Backend Integration:** Move from mock data to a Node.js/PostgreSQL backend.
*   **Real-time Notifications:** WebSocket integration for drive updates.
*   **Student Portal:** Separate login for students to view their own probability.

## 7. Conclusion
PlacementNex demonstrates how fundamental Data Structures can be applied to build efficient, real-world web applications. By combining these algorithms with modern AI, the system provides a robust tool for Placement Cells to improve efficiency and outcomes.
