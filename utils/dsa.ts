import { Student, PlacementProbability, Company } from '../types';

/**
 * FEATURE 1: Placement Prediction System
 * DSA: Rule-based Decision Tree
 * Logic: Nested conditionals representing tree nodes.
 */
export const predictPlacementProbability = (cgpa: number, skillsCount: number, projects: number): PlacementProbability => {
  // Node 1: Academic Performance
  if (cgpa >= 8.5) {
    // Node 2a: High Skills
    if (skillsCount >= 3) {
      return PlacementProbability.HIGH;
    } else {
      // Node 3a: Project experience
      return projects >= 2 ? PlacementProbability.HIGH : PlacementProbability.MEDIUM;
    }
  } else if (cgpa >= 7.0) {
    // Node 2b: Moderate Academics -> Check Skills
    if (skillsCount >= 4 && projects >= 2) {
      return PlacementProbability.HIGH;
    } else if (skillsCount >= 2) {
      return PlacementProbability.MEDIUM;
    } else {
      return PlacementProbability.LOW;
    }
  } else {
    // Node 2c: Low Academics -> Needs exceptional practical work
    if (projects >= 4 && skillsCount >= 3) {
      return PlacementProbability.MEDIUM;
    }
    return PlacementProbability.LOW;
  }
};

/**
 * FEATURE 3: Student Competitiveness Ranking
 * DSA: Priority Queue (Max-Heap)
 * Purpose: Efficiently retrieve top students based on a weighted score.
 */
export class StudentMaxHeap {
  private heap: Student[] = [];

  constructor(students: Student[]) {
    students.forEach(s => this.insert(s));
  }

  private calculateScore(s: Student): number {
    // Weighted formula
    return (s.cgpa * 10) + (s.skills.length * 5) + (s.internships * 8) + (s.projects * 3);
  }

  private getParentIndex(i: number) { return Math.floor((i - 1) / 2); }
  private getLeftChildIndex(i: number) { return 2 * i + 1; }
  private getRightChildIndex(i: number) { return 2 * i + 2; }

  private swap(i1: number, i2: number) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  public insert(student: Student) {
    this.heap.push(student);
    this.heapifyUp();
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.calculateScore(this.heap[parentIndex]) < this.calculateScore(this.heap[index])) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  public getRankedList(): Student[] {
    // Return a sorted copy without destroying heap
    return [...this.heap].sort((a, b) => this.calculateScore(b) - this.calculateScore(a));
  }
}

/**
 * FEATURE 10: Filtering and Sorting
 * DSA: Merge Sort
 * Time Complexity: O(N log N)
 */
export const mergeSortStudents = (arr: Student[], key: keyof Student, order: 'asc' | 'desc' = 'asc'): Student[] => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortStudents(arr.slice(0, mid), key, order);
  const right = mergeSortStudents(arr.slice(mid), key, order);

  return merge(left, right, key, order);
};

const merge = (left: Student[], right: Student[], key: keyof Student, order: 'asc' | 'desc'): Student[] => {
  let resultArray: Student[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftVal = left[leftIndex][key];
    const rightVal = right[rightIndex][key];

    // Handle possibly undefined values for sorting
    const lV = leftVal ?? 0;
    const rV = rightVal ?? 0;

    let condition = false;
    if (order === 'asc') condition = lV < rV;
    else condition = lV > rV;

    if (condition) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

/**
 * FEATURE 9: Chatbot Response Matching
 * DSA: Trie (Prefix Tree)
 * Purpose: Fast command matching for chatbot.
 */
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  response?: string;
}

export class ChatTrie {
  root: TrieNode = new TrieNode();

  insert(phrase: string, response: string) {
    let node = this.root;
    for (const char of phrase.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
    node.response = response;
  }

  search(phrase: string): string | null {
    let node = this.root;
    for (const char of phrase.toLowerCase()) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    if (node.isEndOfWord && node.response) return node.response;
    return null;
  }
}

/**
 * FEATURE 4: Resume Analyzer
 * DSA: HashMap for Frequency Count
 */
export const analyzeResumeKeywords = (text: string, requiredSkills: Set<string>) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequencyMap = new Map<string, number>();

  words.forEach(word => {
    frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  requiredSkills.forEach(skill => {
    if (frequencyMap.has(skill.toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  return { matchedSkills, missingSkills, keywordCount: words.length };
};

/**
 * FEATURE 7: Skill Gap Analysis
 * DSA: HashMaps for Supply vs Demand Correlation
 * Time Complexity: O(N * M) where N is students/companies and M is max skills
 */
export const analyzeSkillGap = (students: Student[], companies: Company[]) => {
  const studentSkills = new Map<string, number>(); // Supply
  const companySkills = new Map<string, number>(); // Demand
  const skillSalarySum = new Map<string, number>();
  const skillCountForSalary = new Map<string, number>();

  // Supply Analysis
  students.forEach(s => {
    s.skills.forEach(skill => {
      const sk = skill.toUpperCase();
      studentSkills.set(sk, (studentSkills.get(sk) || 0) + 1);
      
      if (s.package) {
        skillSalarySum.set(sk, (skillSalarySum.get(sk) || 0) + s.package);
        skillCountForSalary.set(sk, (skillCountForSalary.get(sk) || 0) + 1);
      }
    });
  });

  // Demand Analysis
  companies.forEach(c => {
    c.requiredSkills.forEach(skill => {
      const sk = skill.toUpperCase();
      companySkills.set(sk, (companySkills.get(sk) || 0) + 1);
    });
  });

  // Prepare Data for Charts (Top 10 demanded skills)
  const allSkills = Array.from(new Set([...studentSkills.keys(), ...companySkills.keys()]));
  const gapData = allSkills
    .map(skill => ({
      name: skill,
      demand: companySkills.get(skill) || 0,
      supply: studentSkills.get(skill) || 0,
      gap: (companySkills.get(skill) || 0) - (studentSkills.get(skill) || 0)
    }))
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 10);

  // High Value Skills (Correlation between skill and package)
  const highValueSkills = Array.from(skillSalarySum.keys())
    .map(skill => ({
      name: skill,
      avgPackage: (skillSalarySum.get(skill)! / skillCountForSalary.get(skill)!),
    }))
    .sort((a, b) => b.avgPackage - a.avgPackage)
    .slice(0, 5);

  return { gapData, highValueSkills };
};

/**
 * FEATURE 6: Timeline / Drive Simulation
 * DSA: Queue
 * Purpose: Simulate students moving through rounds (First-In-First-Out processing)
 */
export class RecruitmentQueue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }
  
  getItems(): T[] {
    return this.items;
  }
  
  clear() {
    this.items = [];
  }
}