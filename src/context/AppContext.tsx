import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Lesson,
  Exercise,
  OnlineCourse,
  Conversation,
  TeacherRequest,
  AssessmentTest,
  ListeningResource,
  ReadingMaterial,
  WorkbookItem,
  UpdateAnnouncement,
  Book,
  DictionaryEntry,
  PlatformNotification,
  EnglishLevel
} from '../types';

import {
  initialCurrentUser,
  sampleUsers,
  initialLessons,
  initialExercises,
  initialCourses,
  initialConversations,
  initialTeacherRequests,
  initialTests,
  initialListeningResources,
  initialReadingMaterials,
  initialWorkbooks,
  initialUpdates,
  initialBooks,
  initialDictionary,
  initialNotifications
} from '../data/initialData';

interface AppContextType {
  currentUser: User;
  users: User[];
  switchUserRole: (role: UserRole) => void;
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id' | 'datePublished' | 'authorName'>) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;
  markLessonCompleted: (id: string) => void;
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  submitExerciseResult: (exerciseId: string, score: number) => void;
  courses: OnlineCourse[];
  addCourse: (course: Omit<OnlineCourse, 'id' | 'registeredStudentIds'>) => void;
  toggleCourseRegistration: (courseId: string) => void;
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendChatMessage: (conversationId: string, text: string, attachmentName?: string) => void;
  createNewGroup: (name: string, description: string, memberIds: string[]) => void;
  teacherRequests: TeacherRequest[];
  sendTeacherRequest: (teacherId: string, topic: string, message: string) => void;
  respondTeacherRequest: (requestId: string, status: 'accepted' | 'declined') => void;
  tests: AssessmentTest[];
  submitTestScore: (testId: string, score: number, maxScore: number, levelAchieved: EnglishLevel) => void;
  listeningResources: ListeningResource[];
  addListeningResource: (res: Omit<ListeningResource, 'id'>) => void;
  readingMaterials: ReadingMaterial[];
  addReadingMaterial: (mat: Omit<ReadingMaterial, 'id'>) => void;
  workbooks: WorkbookItem[];
  markWorkbookCompleted: (workbookId: string) => void;
  updates: UpdateAnnouncement[];
  addUpdate: (update: Omit<UpdateAnnouncement, 'id' | 'publicationDate'>) => void;
  deleteUpdate: (id: string) => void;
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  toggleSaveBook: (bookId: string) => void;
  dictionary: DictionaryEntry[];
  toggleSaveWord: (word: string) => void;
  notifications: PlatformNotification[];
  markAllNotificationsRead: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  // Detail modals / pages
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedExerciseId: string | null;
  setSelectedExerciseId: (id: string | null) => void;
  selectedTestId: string | null;
  setSelectedTestId: (id: string | null) => void;
  selectedListeningId: string | null;
  setSelectedListeningId: (id: string | null) => void;
  selectedReadingId: string | null;
  setSelectedReadingId: (id: string | null) => void;
  selectedWorkbookId: string | null;
  setSelectedWorkbookId: (id: string | null) => void;
  selectedBookForKoko: Book | null;
  setSelectedBookForKoko: (book: Book | null) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  searchFilterQuery: string;
  setSearchFilterQuery: (query: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'speakup_storage_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage or defaults
  const loadInitial = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [currentUser, setCurrentUser] = useState<User>(() => loadInitial('user', initialCurrentUser));
  const [users] = useState<User[]>(sampleUsers);
  const [lessons, setLessons] = useState<Lesson[]>(() => loadInitial('lessons', initialLessons));
  const [exercises, setExercises] = useState<Exercise[]>(() => loadInitial('exercises', initialExercises));
  const [courses, setCourses] = useState<OnlineCourse[]>(() => loadInitial('courses', initialCourses));
  const [conversations, setConversations] = useState<Conversation[]>(() => loadInitial('conversations', initialConversations));
  const [teacherRequests, setTeacherRequests] = useState<TeacherRequest[]>(() => loadInitial('teacherRequests', initialTeacherRequests));
  const [tests, setTests] = useState<AssessmentTest[]>(() => loadInitial('tests', initialTests));
  const [listeningResources, setListeningResources] = useState<ListeningResource[]>(() => loadInitial('listening', initialListeningResources));
  const [readingMaterials, setReadingMaterials] = useState<ReadingMaterial[]>(() => loadInitial('reading', initialReadingMaterials));
  const [workbooks, setWorkbooks] = useState<WorkbookItem[]>(() => loadInitial('workbooks', initialWorkbooks));
  const [updates, setUpdates] = useState<UpdateAnnouncement[]>(() => loadInitial('updates', initialUpdates));
  const [books, setBooks] = useState<Book[]>(() => loadInitial('books', initialBooks));
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>(() => loadInitial('dictionary', initialDictionary));
  const [notifications, setNotifications] = useState<PlatformNotification[]>(() => loadInitial('notifications', initialNotifications));

  // Navigation state
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-sarah');

  // Selected item modals/views
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [selectedListeningId, setSelectedListeningId] = useState<string | null>(null);
  const [selectedReadingId, setSelectedReadingId] = useState<string | null>(null);
  const [selectedWorkbookId, setSelectedWorkbookId] = useState<string | null>(null);
  const [selectedBookForKoko, setSelectedBookForKoko] = useState<Book | null>(null);

  // Global search
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [searchFilterQuery, setSearchFilterQuery] = useState('');

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
      localStorage.setItem(`${STORAGE_KEY}_lessons`, JSON.stringify(lessons));
      localStorage.setItem(`${STORAGE_KEY}_exercises`, JSON.stringify(exercises));
      localStorage.setItem(`${STORAGE_KEY}_courses`, JSON.stringify(courses));
      localStorage.setItem(`${STORAGE_KEY}_conversations`, JSON.stringify(conversations));
      localStorage.setItem(`${STORAGE_KEY}_teacherRequests`, JSON.stringify(teacherRequests));
      localStorage.setItem(`${STORAGE_KEY}_tests`, JSON.stringify(tests));
      localStorage.setItem(`${STORAGE_KEY}_listening`, JSON.stringify(listeningResources));
      localStorage.setItem(`${STORAGE_KEY}_reading`, JSON.stringify(readingMaterials));
      localStorage.setItem(`${STORAGE_KEY}_workbooks`, JSON.stringify(workbooks));
      localStorage.setItem(`${STORAGE_KEY}_updates`, JSON.stringify(updates));
      localStorage.setItem(`${STORAGE_KEY}_books`, JSON.stringify(books));
      localStorage.setItem(`${STORAGE_KEY}_dictionary`, JSON.stringify(dictionary));
      localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [currentUser, lessons, exercises, courses, conversations, teacherRequests, tests, listeningResources, readingMaterials, workbooks, updates, books, dictionary, notifications]);

  // Switch role between student / teacher / admin
  const switchUserRole = (role: UserRole) => {
    let target = sampleUsers.find(u => u.role === role);
    if (!target) {
      target = { ...initialCurrentUser, role };
    }
    setCurrentUser(target);
  };

  // Lessons actions
  const addLesson = (newLessonData: Omit<Lesson, 'id' | 'datePublished' | 'authorName'>) => {
    const newLesson: Lesson = {
      ...newLessonData,
      id: `lesson-${Date.now()}`,
      datePublished: new Date().toISOString().split('T')[0],
      authorName: currentUser.name
    };
    setLessons(prev => [newLesson, ...prev]);
    // Notify
    addNotification({
      title: 'New Lesson Published! 📚',
      message: `"${newLesson.title}" is now available in Lessons.`,
      type: 'system'
    });
  };

  const updateLesson = (updated: Lesson) => {
    setLessons(prev => prev.map(l => l.id === updated.id ? updated : l));
  };

  const deleteLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
  };

  const markLessonCompleted = (id: string) => {
    if (!currentUser.completedLessons.includes(id)) {
      setCurrentUser(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, id],
        streakDays: prev.streakDays + 1
      }));
      addNotification({
        title: 'Lesson Completed! 🌟',
        message: 'You marked a lesson as completed! Streak +1',
        type: 'streak'
      });
    }
  };

  // Exercises actions
  const addExercise = (exData: Omit<Exercise, 'id'>) => {
    const newEx: Exercise = {
      ...exData,
      id: `ex-${Date.now()}`
    };
    setExercises(prev => [newEx, ...prev]);
  };

  const submitExerciseResult = (exerciseId: string, score: number) => {
    const record = {
      exerciseId,
      score,
      completedAt: new Date().toISOString()
    };
    setCurrentUser(prev => ({
      ...prev,
      completedExercises: [record, ...prev.completedExercises.filter(e => e.exerciseId !== exerciseId)]
    }));
    addNotification({
      title: 'Exercise Submitted! 🎯',
      message: `You scored ${score}% on the exercise.`,
      type: 'test'
    });
  };

  // Courses actions
  const addCourse = (cData: Omit<OnlineCourse, 'id' | 'registeredStudentIds'>) => {
    const newCourse: OnlineCourse = {
      ...cData,
      id: `course-${Date.now()}`,
      registeredStudentIds: []
    };
    setCourses(prev => [...prev, newCourse]);
    addNotification({
      title: 'New Online Course Scheduled 🗓️',
      message: `${newCourse.title} on ${newCourse.date} at ${newCourse.startTime}.`,
      type: 'course'
    });
  };

  const toggleCourseRegistration = (courseId: string) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const isRegistered = c.registeredStudentIds.includes(currentUser.id);
          const updated = isRegistered
            ? c.registeredStudentIds.filter(id => id !== currentUser.id)
            : [...c.registeredStudentIds, currentUser.id];
          return { ...c, registeredStudentIds: updated };
        }
        return c;
      })
    );
  };

  // Messaging actions
  const sendChatMessage = (conversationId: string, text: string, attachmentName?: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentName,
      isRead: true
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Auto simulated reply after 1.5 seconds if sending in private chat with teacher
    const conv = conversations.find(c => c.id === conversationId);
    if (conv && conv.type === 'private' && currentUser.role === 'student') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-reply-${Date.now()}`,
          senderId: 'user-teacher-sarah',
          senderName: conv.name,
          senderAvatar: conv.avatar,
          senderRole: 'teacher' as UserRole,
          text: `Thank you for sharing, Fatoumata! That's a wonderful insight. Keep up the consistent speaking practice! 💬✨`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        setConversations(cur =>
          cur.map(c => (c.id === conversationId ? { ...c, messages: [...c.messages, replyMsg], unreadCount: (c.unreadCount || 0) + 1 } : c))
        );
      }, 1500);
    }
  };

  const createNewGroup = (name: string, description: string, memberIds: string[]) => {
    const newGroup: Conversation = {
      id: `group-${Date.now()}`,
      type: 'group',
      name,
      description,
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=250',
      memberIds: [currentUser.id, ...memberIds],
      adminIds: [currentUser.id],
      messages: [
        {
          id: `m-init-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          senderRole: currentUser.role,
          text: `Welcome everyone to "${name}"! Let's practice English together.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true
        }
      ]
    };
    setConversations(prev => [newGroup, ...prev]);
    setActiveConversationId(newGroup.id);
  };

  // Teacher request actions
  const sendTeacherRequest = (teacherId: string, topic: string, message: string) => {
    const teacher = sampleUsers.find(u => u.id === teacherId);
    const newReq: TeacherRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      teacherId,
      teacherName: teacher ? teacher.name : 'Teacher',
      topic,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setTeacherRequests(prev => [newReq, ...prev]);
    addNotification({
      title: 'Teacher Request Sent 📤',
      message: `Your 1-on-1 request to ${newReq.teacherName} was submitted.`,
      type: 'message'
    });
  };

  const respondTeacherRequest = (requestId: string, status: 'accepted' | 'declined') => {
    setTeacherRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
    const req = teacherRequests.find(r => r.id === requestId);
    if (req && status === 'accepted') {
      // Create private conversation
      const newConv: Conversation = {
        id: `conv-req-${Date.now()}`,
        type: 'private',
        name: `${req.studentName} & ${req.teacherName}`,
        avatar: req.studentAvatar,
        memberIds: [req.studentId, req.teacherId],
        adminIds: [req.teacherId],
        messages: [
          {
            id: `msg-acc-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            senderRole: currentUser.role,
            text: `Hello ${req.studentName}! I have accepted your 1-on-1 tutoring request regarding "${req.topic}". When are you free?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: true
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      setActiveNav('Messages');
    }
  };

  // Test scoring
  const submitTestScore = (testId: string, score: number, maxScore: number, levelAchieved: EnglishLevel) => {
    const test = tests.find(t => t.id === testId);
    const result = {
      testId,
      testName: test ? test.title : 'Assessment Test',
      score,
      maxScore,
      levelAchieved,
      date: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(prev => ({
      ...prev,
      level: levelAchieved !== 'All' ? levelAchieved : prev.level,
      testResults: [result, ...prev.testResults.filter(r => r.testId !== testId)]
    }));
    addNotification({
      title: 'Assessment Test Complete! 🏆',
      message: `You scored ${score}/${maxScore} (${Math.round((score / maxScore) * 100)}%). Achieved Level: ${levelAchieved}.`,
      type: 'test'
    });
  };

  // Workbook completion
  const markWorkbookCompleted = (wbId: string) => {
    if (!currentUser.completedWorkbooks.includes(wbId)) {
      setCurrentUser(prev => ({
        ...prev,
        completedWorkbooks: [...prev.completedWorkbooks, wbId]
      }));
      addNotification({
        title: 'Workbook Saved & Completed! 📝',
        message: 'Your practical workbook worksheet has been verified.',
        type: 'system'
      });
    }
  };

  // Listening & Reading creation
  const addListeningResource = (res: Omit<ListeningResource, 'id'>) => {
    const newRes: ListeningResource = { ...res, id: `listen-${Date.now()}` };
    setListeningResources(prev => [newRes, ...prev]);
  };

  const addReadingMaterial = (mat: Omit<ReadingMaterial, 'id'>) => {
    const newMat: ReadingMaterial = { ...mat, id: `reading-${Date.now()}` };
    setReadingMaterials(prev => [newMat, ...prev]);
  };

  // Updates & Library
  const addUpdate = (up: Omit<UpdateAnnouncement, 'id' | 'publicationDate'>) => {
    const newUp: UpdateAnnouncement = {
      ...up,
      id: `up-${Date.now()}`,
      publicationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setUpdates(prev => [newUp, ...prev]);
  };

  const deleteUpdate = (id: string) => {
    setUpdates(prev => prev.filter(u => u.id !== id));
  };

  const addBook = (bData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bData,
      id: `book-${Date.now()}`
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const toggleSaveBook = (bookId: string) => {
    setCurrentUser(prev => {
      const exists = prev.savedBooks.includes(bookId);
      return {
        ...prev,
        savedBooks: exists ? prev.savedBooks.filter(id => id !== bookId) : [...prev.savedBooks, bookId]
      };
    });
  };

  const toggleSaveWord = (word: string) => {
    setCurrentUser(prev => {
      const exists = prev.savedWords.includes(word.toLowerCase());
      return {
        ...prev,
        savedWords: exists
          ? prev.savedWords.filter(w => w !== word.toLowerCase())
          : [...prev.savedWords, word.toLowerCase()]
      };
    });
  };

  // Notification helper
  const addNotification = (notif: Omit<PlatformNotification, 'id' | 'timestamp' | 'read'>) => {
    const newN: PlatformNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(initialCurrentUser);
    setLessons(initialLessons);
    setExercises(initialExercises);
    setCourses(initialCourses);
    setConversations(initialConversations);
    setTeacherRequests(initialTeacherRequests);
    setTests(initialTests);
    setListeningResources(initialListeningResources);
    setReadingMaterials(initialReadingMaterials);
    setWorkbooks(initialWorkbooks);
    setUpdates(initialUpdates);
    setBooks(initialBooks);
    setDictionary(initialDictionary);
    setNotifications(initialNotifications);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        switchUserRole,
        lessons,
        addLesson,
        updateLesson,
        deleteLesson,
        markLessonCompleted,
        exercises,
        addExercise,
        submitExerciseResult,
        courses,
        addCourse,
        toggleCourseRegistration,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendChatMessage,
        createNewGroup,
        teacherRequests,
        sendTeacherRequest,
        respondTeacherRequest,
        tests,
        submitTestScore,
        listeningResources,
        addListeningResource,
        readingMaterials,
        addReadingMaterial,
        workbooks,
        markWorkbookCompleted,
        updates,
        addUpdate,
        deleteUpdate,
        books,
        addBook,
        toggleSaveBook,
        dictionary,
        toggleSaveWord,
        notifications,
        markAllNotificationsRead,
        activeNav,
        setActiveNav,
        selectedLessonId,
        setSelectedLessonId,
        selectedExerciseId,
        setSelectedExerciseId,
        selectedTestId,
        setSelectedTestId,
        selectedListeningId,
        setSelectedListeningId,
        selectedReadingId,
        setSelectedReadingId,
        selectedWorkbookId,
        setSelectedWorkbookId,
        selectedBookForKoko,
        setSelectedBookForKoko,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        searchFilterQuery,
        setSearchFilterQuery,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
