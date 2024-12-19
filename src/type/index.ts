import { Types } from 'mongoose';

// 'USER / 2' | 'HR / 1' | 'ADMIN / 0/ INACTIVE: 3'

//'beginner / 3' | 'moderate / 2' | 'advanced / 1' | 'pro / 0'

// User roles in the app
export type IUserRole = 0 | 1 | 2 | 3;
export type IDifficultyLevel = 0 | 1 | 2 | 3;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdBy: Types.ObjectId | {
    _id: string;
    name: string;
    email: string;
  }; // User ID of the creator (HR/Admin)
}

export interface ISubcategory {
  _id: string;
  categoryId: Types.ObjectId; // Reference to Category ID
  name: string;
  description?: string;
  createdBy: Types.ObjectId; // User ID of the creator (HR/Admin)
}

export interface IQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  _id: string;
  categoryId: Types.ObjectId | {
    _id: string;
    name: string;
  }; // Reference to Category ID
  subcategoryId: Types.ObjectId | {
    _id: string;
    name: string;
  }; // Reference to Subcategory ID
  questionText: string;
  options_A: string;
  options_B: string;
  options_C: string;
  options_D: string;
  isCorrect: string;
  difficulty: IDifficultyLevel;
  createdBy: Types.ObjectId | {
    _id: string;
    name: string;
    email: string;
  } // User ID of the creator (HR/Admin)
}

export interface IExam {
  _id: string;
  title: string;
  categoryId: Types.ObjectId | {
    _id: string;
    name: string;
  }; // Reference to Category ID
  subcategoryId: Types.ObjectId | {
    _id: string;
    name: string;
  }; // Reference to Subcategory ID
  createdBy: Types.ObjectId | {
    _id: string;
    name: string;
    email: string;
  }; // User ID of the creator (HR/Admin)
  difficulty: IDifficultyLevel;
  numQuestions: number; // Number of questions for the exam
  questions: string[]; // Array of Question IDs selected for the exam
  timeLimit: number;
}

export interface IExamAssignment {
  _id: string;
  examId: Types.ObjectId | {
    _id:string,
    title:string
  }; // Reference to Exam ID
  userName: string;
  userEmail: string;
  assignedBy: Types.ObjectId | {
    _id:string,
    name:string
  }; // User ID of the assigner (HR/Admin)
  status: 'assigned' | 'completed' | 'reviewed';
  examLink:string,
  createdAt?:string
}

export interface IUserAnswer {
  _id: string;
  examId: Types.ObjectId; // Reference to Exam ID
  userId: Types.ObjectId; // Reference to User ID
  answers: {
    questionId: string; // Reference to Question ID
    selectedOption: string; // Selected option ID or text
  }[];
  submittedAt: Date;
}


export interface PageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string
  }>;
}