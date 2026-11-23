export type EnglishLevel = 'All' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  level: EnglishLevel;
  streakDays: number;
  totalStudyHours: number;
  completedLessons: string[];
  completedExercises: { exerciseId: string; score: number; completedAt: string }[];
  completedWorkbooks: string[];
  testResults: { testId: string; testName: string; score: number; maxScore: number; levelAchieved: EnglishLevel; date: string }[];
  savedBooks: string[];
  savedWords: string[];
}

export interface Lesson {
  id: string;
  title: string;
  shortDescription: string;
  level: EnglishLevel;
  category: string;
  datePublished: string;
  durationMinutes: number;
  youtubeUrl?: string;
  customCoverImage?: string;
  objectives: string[];
  content: string;
  explanations: { term: string; explanation: string; example: string }[];
  presentationUrl?: string; // Google Slides / PPTX link
  downloadableMaterials?: { name: string; url: string; size: string }[];
  infographicImage?: string;
  relatedExerciseIds: string[];
  status: 'draft' | 'published';
  authorName: string;
}

export type ExerciseType = 
  | 'multiple-choice'
  | 'fill-in-the-blank'
  | 'sentence-completion'
  | 'matching'
  | 'grammar'
  | 'vocabulary'
  | 'reading-comprehension'
  | 'listening-comprehension'
  | 'writing';

export interface ExerciseQuestion {
  id: string;
  prompt: string;
  type: ExerciseType;
  options?: string[]; // For multiple choice
  correctAnswer: string | string[]; // Single answer or matching pairs or array of acceptable answers
  matchingPairs?: { left: string; right: string }[]; // For matching type
  hint?: string;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  shortDescription: string;
  level: EnglishLevel;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  questions: ExerciseQuestion[];
  status: 'draft' | 'published';
}

export interface OnlineCourse {
  id: string;
  title: string;
  description: string;
  level: EnglishLevel;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  meetingPlatform: 'Google Meet' | 'Zoom' | 'Microsoft Teams';
  meetingUrl: string;
  registeredStudentIds: string[];
  maxCapacity: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  type: 'private' | 'group';
  name: string;
  avatar: string;
  description?: string;
  memberIds: string[];
  adminIds: string[];
  messages: ChatMessage[];
  unreadCount?: number;
  isTeacherRequest?: boolean;
}

export interface TeacherRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  teacherId: string;
  teacherName: string;
  topic: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface AssessmentQuestion {
  id: string;
  category: 'Grammar' | 'Vocabulary' | 'Reading' | 'Listening' | 'Usage';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  audioUrl?: string;
}

export interface AssessmentTest {
  id: string;
  type: 'placement' | 'level';
  targetLevel?: EnglishLevel; // For level tests: A1, A2, etc.
  title: string;
  description: string;
  durationMinutes: number;
  isTimed: boolean;
  questions: AssessmentQuestion[];
  passingScorePercent?: number;
  unlockedLevel?: EnglishLevel;
}

export interface ListeningResource {
  id: string;
  title: string;
  shortDescription: string;
  level: EnglishLevel;
  duration: string;
  topic: string;
  coverImage: string;
  audioUrl: string;
  transcript: string;
  vocabulary: { word: string; definition: string; timestamp?: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ReadingMaterial {
  id: string;
  title: string;
  shortDescription: string;
  level: EnglishLevel;
  estimatedMinutes: number;
  category: string;
  coverImage: string;
  passage: string;
  vocabularyHighlights: { word: string; phonetics?: string; englishDef: string; frenchTranslation: string }[];
  questions: {
    id: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface WorkbookItem {
  id: string;
  title: string;
  description: string;
  level: EnglishLevel;
  category: 'Grammar Worksheets' | 'Vocabulary Activities' | 'Sentence Construction' | 'Writing Practice' | 'PDF Documents';
  previewImage: string;
  pdfDownloadUrl: string;
  interactiveExercises?: {
    id: string;
    instructions: string;
    prompt: string;
    blanks?: string[];
    userAnswer?: string;
    sampleAnswer: string;
    notes?: string;
  }[];
}

export interface UpdateAnnouncement {
  id: string;
  title: string;
  category: 'Platform Announcements' | 'Upcoming Events' | 'Scholarships & Opportunities' | 'Competitions' | 'Deadlines' | 'Community';
  coverImage?: string;
  description: string;
  publicationDate: string;
  externalLink?: string;
  isImportant?: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  level: EnglishLevel;
  genre: string;
  coverImage: string;
  kokoBookId: string;
  kokoUrl: string;
  pagesCount: number;
  rating: number;
}

export interface DictionaryEntry {
  word: string;
  ipa: string;
  audioUrl?: string;
  wordType: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'idiom';
  frenchTranslation: string;
  englishDefinition: string;
  exampleEn: string;
  exampleFr: string;
  synonyms: string[];
  antonyms: string[];
}

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'message' | 'course' | 'test' | 'system' | 'streak';
  read: boolean;
  actionUrl?: string;
}
