import {
  User,
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
  PlatformNotification
} from '../types';

export const initialCurrentUser: User = {
  id: 'user-fatoumata',
  name: 'Fatoumata Ndiaye',
  email: 'fatoumata.ndiaye@speakup.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  level: 'B1',
  streakDays: 123,
  totalStudyHours: 48,
  completedLessons: ['lesson-1', 'lesson-2'],
  completedExercises: [
    { exerciseId: 'ex-1', score: 100, completedAt: '2026-11-20T14:30:00Z' },
    { exerciseId: 'ex-2', score: 90, completedAt: '2026-11-21T09:15:00Z' }
  ],
  completedWorkbooks: ['wb-1'],
  testResults: [
    {
      testId: 'test-placement',
      testName: 'SpeakUp Diagnostic Placement Test',
      score: 82,
      maxScore: 100,
      levelAchieved: 'B1',
      date: '2026-06-15'
    }
  ],
  savedBooks: ['book-1', 'book-3'],
  savedWords: ['serendipity', 'eloquent', 'perseverance', 'resilient', 'ephemeral']
};

export const sampleUsers: User[] = [
  initialCurrentUser,
  {
    id: 'user-teacher-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.j@speakup.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    level: 'C2',
    streakDays: 240,
    totalStudyHours: 320,
    completedLessons: [],
    completedExercises: [],
    completedWorkbooks: [],
    testResults: [],
    savedBooks: [],
    savedWords: []
  },
  {
    id: 'user-teacher-david',
    name: 'David O\'Connor',
    email: 'david.oc@speakup.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    level: 'C2',
    streakDays: 180,
    totalStudyHours: 400,
    completedLessons: [],
    completedExercises: [],
    completedWorkbooks: [],
    testResults: [],
    savedBooks: [],
    savedWords: []
  },
  {
    id: 'user-admin-moussa',
    name: 'Moussa Diop',
    email: 'moussa.admin@speakup.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    level: 'C2',
    streakDays: 310,
    totalStudyHours: 520,
    completedLessons: [],
    completedExercises: [],
    completedWorkbooks: [],
    testResults: [],
    savedBooks: [],
    savedWords: []
  }
];

export const initialLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Mastering Present, Past & Future Tenses in Spoken English',
    shortDescription: 'Learn how to naturally switch between past events, present routines, and future goals without hesitating.',
    level: 'B1',
    category: 'Grammar & Fluency',
    datePublished: '2026-11-18',
    durationMinutes: 25,
    youtubeUrl: 'https://www.youtube.com/watch?v=0x64y7n6d3Q',
    objectives: [
      'Understand the structural difference between Simple Past, Present Perfect, and Future Continuous.',
      'Identify common pronunciation traps with regular past tense -ed endings.',
      'Practice natural speech transitions and conversational connectors.'
    ],
    content: `
### Why Tense Consistency Matters

One of the most noticeable barriers for intermediate English speakers is pausing to recall grammar rules. In natural conversational English, switching tenses feels effortless because native speakers rely on time-marker anchors rather than memorized tables.

#### 1. The Present Reality (Routine vs. Current Action)
We use the **Simple Present** for general truths and habits (*"I work in Dakar"*, *"She teaches English"*). 
In contrast, the **Present Continuous** emphasizes temporary activity right now (*"I am currently studying for my IELTS exam"*).

#### 2. The Past Timeline (Completed vs. Connected)
- **Simple Past:** Finished action in a finished time (*"Yesterday, I submitted my assignment."*)
- **Present Perfect:** Past action with a present consequence or relevance (*"I have already visited the SpeakUp library."*)

#### 3. Navigating the Future
Instead of only using *"will"*, native speakers predominantly use *"going to"* for planned intentions and *"will"* for spontaneous decisions.
    `,
    explanations: [
      {
        term: 'Time-Marker Anchors',
        explanation: 'Words such as "yesterday", "recently", "since", or "by next year" that tell the listener which timeline to expect.',
        example: 'Since 2024, I have improved my conversational confidence.'
      },
      {
        term: 'Present Perfect Continuous',
        explanation: 'Describes an action that began in the past and is still ongoing right now.',
        example: 'I have been practicing pronunciation for 40 minutes.'
      }
    ],
    presentationUrl: 'https://docs.google.com/presentation/d/1examplePresentationSpeakUp/preview',
    downloadableMaterials: [
      { name: 'SpeakUp_Tense_Navigation_Guide.pdf', url: '#', size: '2.4 MB' },
      { name: 'Irregular_Verbs_Audio_Cheatsheet.pdf', url: '#', size: '1.1 MB' }
    ],
    infographicImage: '/assets/speakup_past_present.png',
    relatedExerciseIds: ['ex-1', 'ex-3'],
    status: 'published',
    authorName: 'Sarah Jenkins'
  },
  {
    id: 'lesson-2',
    title: 'Essential Phrasal Verbs for Everyday Communication',
    shortDescription: 'Break down common phrasal verbs that native speakers use in daily business and casual conversations.',
    level: 'A2',
    category: 'Vocabulary & Idioms',
    datePublished: '2026-11-15',
    durationMinutes: 18,
    youtubeUrl: 'https://www.youtube.com/watch?v=L9A8CE4ZfL8',
    objectives: [
      'Differentiate between separable and inseparable phrasal verbs.',
      'Master the top 20 multi-word verbs used in daily professional dialogue.',
      'Eliminate unnatural formal wording in casual chats.'
    ],
    content: `
### Phrasal Verbs Demystified

Phrasal verbs combine a basic verb with one or more prepositions or adverbs (e.g., *look up*, *give up*, *turn down*). 

#### High-Frequency Phrasal Verbs:
1. **Bring up:** Mention a topic in conversation (*"Don't bring up the exam results yet."*)
2. **Call off:** Cancel an event (*"They called off the meeting due to heavy rain."*)
3. **Carry on:** Continue doing something (*"Please carry on with your reading."*)
4. **Figure out:** Understand or find the solution to a problem (*"I finally figured out the answer."*)
    `,
    explanations: [
      {
        term: 'Separable Phrasal Verb',
        explanation: 'A phrasal verb where the direct object can go between the verb and particle.',
        example: 'Turn off the lights OR Turn the lights off.'
      }
    ],
    downloadableMaterials: [
      { name: 'Top_50_Phrasal_Verbs_Card_Deck.pdf', url: '#', size: '3.8 MB' }
    ],
    infographicImage: '/assets/speakup_verbs_1.png',
    relatedExerciseIds: ['ex-2'],
    status: 'published',
    authorName: 'David O\'Connor'
  },
  {
    id: 'lesson-3',
    title: 'Professional Email Writing & Business Etiquette',
    shortDescription: 'Write concise, persuasive, and grammatically polished emails for international clients and colleagues.',
    level: 'B2',
    category: 'Business English',
    datePublished: '2026-11-12',
    durationMinutes: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=0kE1N7Wp_1A',
    objectives: [
      'Structure email subject lines for maximum open and reply rates.',
      'Balance politeness and directness without sounding robotic or aggressive.',
      'Avoid classic translation pitfalls between French and English workplace idioms.'
    ],
    content: `
### The 3C Rule: Clear, Concise, and Courteous

Business communication in the Anglophone world values brevity and structured paragraphs. Never send walls of text.

#### Ideal Email Framework:
1. **Clear Greeting & Hook:** *"Hi Alex, Hope your week is going well."*
2. **Purpose Statement:** *"I am writing to update you on our Q4 deliverables..."*
3. **Actionable Bullet Points:** Highlight decisions needed.
4. **Friendly Closing & Call to Action:** *"Could you confirm your availability by Thursday 3 PM?"*
    `,
    explanations: [
      {
        term: 'Call to Action (CTA)',
        explanation: 'The specific step or decision you want the recipient to take after reading your message.',
        example: 'Please review the attached draft and let me know your thoughts.'
      }
    ],
    presentationUrl: 'https://docs.google.com/presentation/d/1businessEmailMastery/preview',
    downloadableMaterials: [
      { name: 'SpeakUp_Executive_Email_Templates.pdf', url: '#', size: '1.9 MB' }
    ],
    relatedExerciseIds: ['ex-4'],
    status: 'published',
    authorName: 'Sarah Jenkins'
  },
  {
    id: 'lesson-4',
    title: 'Connected Speech & English Pronunciation Secrets',
    shortDescription: 'Discover assimilation, elision, and linking sounds to sound fluent and understand fast native speech.',
    level: 'B1',
    category: 'Pronunciation & Listening',
    datePublished: '2026-11-10',
    durationMinutes: 22,
    youtubeUrl: 'https://www.youtube.com/watch?v=d_2y20K_z8I',
    objectives: [
      'Master consonant-to-vowel linking sounds.',
      'Understand why "going to" sounds like "gonna" and "want to" sounds like "wanna".',
      'Train ear muscle memory for reduced vowel sounds (Schwa /ə/).'
    ],
    content: `
### Why Spoken English Sounds So Different From Written English

When native speakers talk, words don't stop and start individually. They fuse together in a continuous musical flow known as **Connected Speech**.

#### Key Connected Speech Phenomena:
- **Consonant to Vowel Linking:** *"Hold on"* sounds like *"Hol-don"*. *"Turn off"* sounds like *"Tur-noff"*.
- **Weak Forms & Schwa:** Functional words like *to, for, at, can* are rarely stressed. *"I can do it"* sounds like */aɪ kən duː ɪt/* rather than strong */kæn/*.
    `,
    explanations: [
      {
        term: 'The Schwa (/ə/) Sound',
        explanation: 'The most common vowel sound in spoken English; an unstressed, neutral sound.',
        example: 'About, problem, lemon, support.'
      }
    ],
    downloadableMaterials: [
      { name: 'Connected_Speech_Audio_Companion.pdf', url: '#', size: '2.1 MB' }
    ],
    relatedExerciseIds: ['ex-3'],
    status: 'published',
    authorName: 'David O\'Connor'
  }
];

export const initialExercises: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Present Perfect vs. Simple Past Challenge',
    shortDescription: 'Test your ability to pick the right tense depending on time anchors and completed periods.',
    level: 'B1',
    category: 'Grammar',
    difficulty: 'Medium',
    estimatedMinutes: 10,
    status: 'published',
    questions: [
      {
        id: 'q1',
        prompt: 'Choose the correct sentence:',
        type: 'multiple-choice',
        options: [
          'I have seen that movie yesterday afternoon.',
          'I saw that movie yesterday afternoon.',
          'I was seeing that movie yesterday afternoon.',
          'I had seen that movie yesterday afternoon.'
        ],
        correctAnswer: 'I saw that movie yesterday afternoon.',
        explanation: '"Yesterday afternoon" is a finished time anchor, which strictly requires the Simple Past tense.'
      },
      {
        id: 'q2',
        prompt: 'Fill in the blank: "Fatoumata ________ (live) in Dakar since 2021."',
        type: 'fill-in-the-blank',
        correctAnswer: 'has lived',
        hint: 'Use present perfect (has/have + past participle)',
        explanation: 'The keyword "since 2021" shows an ongoing state that started in the past, so "has lived" (or "has been living") is correct.'
      },
      {
        id: 'q3',
        prompt: 'Match the sentence beginning with the logical completion:',
        type: 'matching',
        correctAnswer: '',
        matchingPairs: [
          { left: 'She has already finished...', right: 'her homework.' },
          { left: 'They went to Paris...', right: 'two years ago.' },
          { left: 'Have you ever eaten...', right: 'traditional Senegalese Thieboudienne?' }
        ],
        explanation: 'Connecting time prepositions ("already", "ago", "ever") with the respective tense structures.'
      }
    ]
  },
  {
    id: 'ex-2',
    title: 'Everyday Phrasal Verbs in Action',
    shortDescription: 'Practice replacing formal verbs with natural multi-word phrasal verbs.',
    level: 'A2',
    category: 'Vocabulary',
    difficulty: 'Easy',
    estimatedMinutes: 8,
    status: 'published',
    questions: [
      {
        id: 'pv-q1',
        prompt: 'The meeting was ________ because the director was unwell.',
        type: 'multiple-choice',
        options: ['called off', 'turned down', 'brought up', 'looked after'],
        correctAnswer: 'called off',
        explanation: '"Call off" means to cancel an event.'
      },
      {
        id: 'pv-q2',
        prompt: 'Fill in the blank: "Could you please ________ (turn on / turn off) the air conditioner? It is very hot inside."',
        type: 'fill-in-the-blank',
        correctAnswer: 'turn on',
        hint: 'Opposite of turn off',
        explanation: '"Turn on" activates an electrical device.'
      },
      {
        id: 'pv-q3',
        prompt: 'Match the phrasal verb to its French equivalent:',
        type: 'matching',
        correctAnswer: '',
        matchingPairs: [
          { left: 'Figure out', right: 'Résoudre / Comprendre' },
          { left: 'Give up', right: 'Abandonner' },
          { left: 'Look forward to', right: 'Attendre avec impatience' }
        ],
        explanation: 'Essential phrasal verbs matched to their French translations.'
      }
    ]
  },
  {
    id: 'ex-3',
    title: 'Sentence Completion & Connected Speech Check',
    shortDescription: 'Identify how reduced words and sounds merge together in rapid conversational dialogues.',
    level: 'B1',
    category: 'Listening Comprehension',
    difficulty: 'Medium',
    estimatedMinutes: 12,
    status: 'published',
    questions: [
      {
        id: 'sc-1',
        prompt: 'When a native speaker says "Whaddya think?", what are the actual grammatically full words?',
        type: 'multiple-choice',
        options: [
          'What did you think?',
          'What do you think?',
          'What would you think?',
          'What are you thinking?'
        ],
        correctAnswer: 'What do you think?',
        explanation: '"Whaddya" is a frequent spoken contraction of "What do you".'
      },
      {
        id: 'sc-2',
        prompt: 'Complete the sentence: "If I ________ more time, I would join every live session."',
        type: 'fill-in-the-blank',
        correctAnswer: 'had',
        hint: 'Second conditional (If + past simple, would + base verb)',
        explanation: 'Second conditional refers to hypothetical scenarios: If + past simple (had), ... would join.'
      }
    ]
  },
  {
    id: 'ex-4',
    title: 'Business Email Etiquette & Collocations',
    shortDescription: 'Select polite and professional phrases for official corporate communications.',
    level: 'B2',
    category: 'Business English',
    difficulty: 'Hard',
    estimatedMinutes: 15,
    status: 'published',
    questions: [
      {
        id: 'be-1',
        prompt: 'Which opening sentence is most appropriate for a formal business inquiry?',
        type: 'multiple-choice',
        options: [
          'Hey buddy, tell me about your pricing.',
          'I am writing to inquire regarding your digital language training enterprise packages.',
          'Send me the details ASAP!',
          'What is up? Can we talk?'
        ],
        correctAnswer: 'I am writing to inquire regarding your digital language training enterprise packages.',
        explanation: 'Polite, clear, professional tone with accurate business vocabulary.'
      }
    ]
  }
];

export const initialCourses: OnlineCourse[] = [
  {
    id: 'course-1',
    title: 'Live Speaking Club: Fluency & Pronunciation Clinic',
    description: 'Interactive conversation practice focusing on small talk, accent reduction, and overcoming nervousness when speaking.',
    level: 'B1',
    teacherId: 'user-teacher-sarah',
    teacherName: 'Sarah Jenkins',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    date: '2026-11-25',
    startTime: '17:00',
    endTime: '18:15',
    meetingPlatform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/spk-live-fluency',
    registeredStudentIds: ['user-fatoumata'],
    maxCapacity: 12,
    status: 'upcoming'
  },
  {
    id: 'course-2',
    title: 'IELTS & TOEFL Academic Writing Masterclass',
    description: 'Deep dive into Task 2 essay structure, cohesive devices, and avoiding repetitive vocabulary.',
    level: 'B2',
    teacherId: 'user-teacher-david',
    teacherName: 'David O\'Connor',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    date: '2026-11-27',
    startTime: '19:00',
    endTime: '20:30',
    meetingPlatform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/88392019284',
    registeredStudentIds: ['user-fatoumata'],
    maxCapacity: 20,
    status: 'upcoming'
  },
  {
    id: 'course-3',
    title: 'Beginner Foundations: Daily Routine & Simple Conversations',
    description: 'Confidence-building session for beginners learning to describe their daily habits, family, and hobbies.',
    level: 'A1',
    teacherId: 'user-teacher-sarah',
    teacherName: 'Sarah Jenkins',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    date: '2026-11-28',
    startTime: '15:00',
    endTime: '16:00',
    meetingPlatform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/spk-beg-daily',
    registeredStudentIds: [],
    maxCapacity: 15,
    status: 'upcoming'
  },
  {
    id: 'course-4',
    title: 'C1 Executive Debate: Global Economics & Innovation',
    description: 'High-level discussion analyzing modern tech disruptions, persuasive debate rhetoric, and nuanced idiomatic phrasing.',
    level: 'C1',
    teacherId: 'user-teacher-david',
    teacherName: 'David O\'Connor',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    date: '2026-11-30',
    startTime: '18:00',
    endTime: '19:30',
    meetingPlatform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/99201948201',
    registeredStudentIds: [],
    maxCapacity: 10,
    status: 'upcoming'
  }
];

export const initialConversations: Conversation[] = [
  {
    id: 'conv-sarah',
    type: 'private',
    name: 'Sarah Jenkins (Teacher)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    memberIds: ['user-fatoumata', 'user-teacher-sarah'],
    adminIds: ['user-teacher-sarah'],
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user-teacher-sarah',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        senderRole: 'teacher',
        text: 'Hi Fatoumata! Great performance on the latest Tenses exercise. Your score was 90%!',
        timestamp: '10:14 AM',
        isRead: true
      },
      {
        id: 'm2',
        senderId: 'user-fatoumata',
        senderName: 'Fatoumata Ndiaye',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        senderRole: 'student',
        text: 'Thank you Sarah! I still hesitate a bit with irregular past verbs, but I am practicing with the new infographics.',
        timestamp: '10:18 AM',
        isRead: true
      },
      {
        id: 'm3',
        senderId: 'user-teacher-sarah',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        senderRole: 'teacher',
        text: 'Here is an extra quick guide we prepared for the upcoming speaking session. See you tomorrow at 5 PM!',
        timestamp: '10:25 AM',
        attachmentName: 'Irregular_Verbs_Practice.pdf',
        attachmentUrl: '#',
        isRead: false
      }
    ]
  },
  {
    id: 'conv-group-speaking',
    type: 'group',
    name: 'SpeakUp B1 Conversation Club 🎙️',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=250',
    description: 'Weekly student debate and language exchange room for B1 & B2 learners.',
    memberIds: ['user-fatoumata', 'user-teacher-sarah', 'user-teacher-david'],
    adminIds: ['user-teacher-sarah'],
    unreadCount: 2,
    messages: [
      {
        id: 'mg1',
        senderId: 'user-teacher-sarah',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        senderRole: 'teacher',
        text: 'Welcome everyone! This week our debate topic is: "Can AI fully replace human language tutors?" Prepare 2 arguments for Wednesday!',
        timestamp: 'Yesterday 3:45 PM',
        isRead: true
      },
      {
        id: 'mg2',
        senderId: 'user-fatoumata',
        senderName: 'Fatoumata Ndiaye',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        senderRole: 'student',
        text: 'I think AI helps a lot with instant feedback, but human teachers give true emotional empathy and cultural nuance!',
        timestamp: 'Yesterday 4:10 PM',
        isRead: true
      },
      {
        id: 'mg3',
        senderId: 'user-teacher-david',
        senderName: 'David O\'Connor',
        senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
        senderRole: 'teacher',
        text: 'Spot on, Fatoumata! That nuance is what moves you from B1 to C1.',
        timestamp: '09:00 AM',
        isRead: false
      }
    ]
  }
];

export const initialTeacherRequests: TeacherRequest[] = [
  {
    id: 'req-1',
    studentId: 'user-fatoumata',
    studentName: 'Fatoumata Ndiaye',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    teacherId: 'user-teacher-david',
    teacherName: 'David O\'Connor',
    topic: 'Pronunciation and Accent Coaching',
    message: 'Hello Mr. David, I would like to schedule a 15-minute 1-on-1 session to review my intonation for my upcoming presentation.',
    status: 'pending',
    createdAt: '2026-11-23T08:30:00Z'
  }
];

export const initialTests: AssessmentTest[] = [
  {
    id: 'test-placement',
    type: 'placement',
    title: 'Diagnostic Placement Test (CEFR)',
    description: 'Comprehensive 5-part assessment measuring Grammar, Vocabulary, Reading Comprehension, Listening, and Practical Language Usage to accurately diagnose your starting level.',
    durationMinutes: 20,
    isTimed: true,
    questions: [
      {
        id: 'pq1',
        category: 'Grammar',
        prompt: 'If she ________ study harder, she would pass the Cambridge exam.',
        options: ['will', 'did', 'does', 'has'],
        correctIndex: 1,
        explanation: 'Second conditional uses the past subjunctive "did" in the if-clause.'
      },
      {
        id: 'pq2',
        category: 'Vocabulary',
        prompt: 'Choose the word that best completes the sentence: "The new renewable energy initiative has received ________ praise from environmental scientists."',
        options: ['widespread', 'narrow', 'superficial', 'reluctant'],
        correctIndex: 0,
        explanation: '"Widespread praise" is a natural English collocation meaning praised extensively.'
      },
      {
        id: 'pq3',
        category: 'Usage',
        prompt: 'Which sentence demonstrates correct register for an apology to a corporate client?',
        options: [
          'My bad, won\'t do it again.',
          'Please accept our sincere apologies for any inconvenience this delay may have caused.',
          'Sorry for the trouble guys.',
          'It is not really our fault, but whatever.'
        ],
        correctIndex: 1,
        explanation: 'Demonstrates professional corporate register and polite modal construction.'
      },
      {
        id: 'pq4',
        category: 'Listening',
        prompt: 'In fast spoken English, "Could you have done it?" is typically heard phonetically as:',
        options: [
          '/kʊd juː hæv dʌn ɪt/',
          '/kʊ-dʒəv dʌn ɪt/',
          '/kʊd juː hæz dʌn ɪt/',
          '/kʊd juː duː ɪt/'
        ],
        correctIndex: 1,
        explanation: 'Due to palatalization (/d/ + /j/ -> /dʒ/) and vowel reduction (/hæv/ -> /əv/).'
      },
      {
        id: 'pq5',
        category: 'Reading',
        prompt: 'Read the short excerpt: "Despite initial headwinds, the cross-border trade agreement catalysed exponential regional growth." What does "headwinds" mean here?',
        options: [
          'Strong coastal breezes',
          'Difficult challenges or resistance',
          'Financial windfalls',
          'Political agreements'
        ],
        correctIndex: 1,
        explanation: '"Headwinds" is a common business metaphor denoting obstacles and adverse conditions.'
      }
    ]
  },
  {
    id: 'test-a1',
    type: 'level',
    targetLevel: 'A1',
    title: 'A1 – Beginner Level Assessment',
    description: 'Verify your mastery of basic greetings, introducing yourself, telling time, numbers, and simple daily present routines.',
    durationMinutes: 15,
    isTimed: false,
    passingScorePercent: 70,
    unlockedLevel: 'A2',
    questions: [
      {
        id: 'a1-1',
        category: 'Grammar',
        prompt: 'She ________ a student at SpeakUp.',
        options: ['is', 'are', 'am', 'be'],
        correctIndex: 0,
        explanation: 'Third person singular of "to be" is "is".'
      },
      {
        id: 'a1-2',
        category: 'Vocabulary',
        prompt: 'What time is 14:30 in conversational English?',
        options: ['Half past two in the afternoon', 'Two forty', 'Quarter to two', 'Half past three'],
        correctIndex: 0,
        explanation: '14:30 is 2:30 PM, spoken as "half past two".'
      }
    ]
  },
  {
    id: 'test-a2',
    type: 'level',
    targetLevel: 'A2',
    title: 'A2 – Elementary Level Assessment',
    description: 'Test your understanding of past simple stories, comparative adjectives, and practical situations like shopping and travel.',
    durationMinutes: 20,
    isTimed: true,
    passingScorePercent: 75,
    unlockedLevel: 'B1',
    questions: [
      {
        id: 'a2-1',
        category: 'Grammar',
        prompt: 'This smartphone is ________ than that older model.',
        options: ['more fast', 'faster', 'fastest', 'fast'],
        correctIndex: 1,
        explanation: 'Short 1-syllable adjectives add "-er" for the comparative.'
      },
      {
        id: 'a2-2',
        category: 'Usage',
        prompt: 'Where would you hear: "Single or return ticket, please?"',
        options: ['At a train or bus station', 'In a bakery', 'At a hospital', 'In a clothing store'],
        correctIndex: 0,
        explanation: 'Standard phrase for passenger transport tickets.'
      }
    ]
  },
  {
    id: 'test-b1',
    type: 'level',
    targetLevel: 'B1',
    title: 'B1 – Intermediate Level Assessment',
    description: 'Test your command of present perfect, relative clauses, expressing feelings, and sustaining discussions.',
    durationMinutes: 25,
    isTimed: true,
    passingScorePercent: 75,
    unlockedLevel: 'B2',
    questions: [
      {
        id: 'b1-1',
        category: 'Grammar',
        prompt: 'The woman ________ founded the community school was honored yesterday.',
        options: ['which', 'who', 'whom', 'whose'],
        correctIndex: 1,
        explanation: '"Who" is the relative pronoun used for persons as the subject.'
      },
      {
        id: 'b1-2',
        category: 'Vocabulary',
        prompt: 'If something is "unbearable", it is:',
        options: ['Too pleasant to forget', 'Too painful or unpleasant to tolerate', 'Extremely light', 'Very funny'],
        correctIndex: 1,
        explanation: 'Prefix un- + bear (tolerate) + -able.'
      }
    ]
  },
  {
    id: 'test-b2',
    type: 'level',
    targetLevel: 'B2',
    title: 'B2 – Upper Intermediate Assessment',
    description: 'Assess passive voice, mixed conditionals, abstract concepts, and nuanced conversational debate.',
    durationMinutes: 30,
    isTimed: true,
    passingScorePercent: 80,
    unlockedLevel: 'C1',
    questions: [
      {
        id: 'b2-1',
        category: 'Grammar',
        prompt: 'The new hospital ________ by the end of next year.',
        options: ['will have been built', 'will build', 'will be build', 'has been building'],
        correctIndex: 0,
        explanation: 'Future perfect passive: will have been + past participle.'
      }
    ]
  },
  {
    id: 'test-c1',
    type: 'level',
    targetLevel: 'C1',
    title: 'C1 – Advanced Level Assessment',
    description: 'Measure fluency in complex rhetorical structures, idiomatic sophistication, and critical evaluation.',
    durationMinutes: 35,
    isTimed: true,
    passingScorePercent: 85,
    unlockedLevel: 'C2',
    questions: [
      {
        id: 'c1-1',
        category: 'Grammar',
        prompt: 'Seldom ________ such a compelling keynote address.',
        options: ['I have heard', 'have I heard', 'did I heard', 'I heard'],
        correctIndex: 1,
        explanation: 'Negative inversion: Seldom + auxiliary verb (have) + subject (I) + main verb (heard).'
      }
    ]
  },
  {
    id: 'test-c2',
    type: 'level',
    targetLevel: 'C2',
    title: 'C2 – Proficient Mastery Assessment',
    description: 'Evaluate near-native precision, subtle humor, cultural references, and academic prose synthesis.',
    durationMinutes: 40,
    isTimed: true,
    passingScorePercent: 90,
    unlockedLevel: 'C2',
    questions: [
      {
        id: 'c2-1',
        category: 'Vocabulary',
        prompt: 'The speaker gave a ________ response that avoided answering the tough question directly.',
        options: ['circumspect', 'equilateral', 'circuitous', 'corporeal'],
        correctIndex: 2,
        explanation: '"Circuitous" means indirect, roundabout, or evasive.'
      }
    ]
  }
];

export const initialListeningResources: ListeningResource[] = [
  {
    id: 'listen-1',
    title: 'SpeakUp Voices: The Power of Multilingualism in West Africa',
    shortDescription: 'Discover how speaking Wolof, French, and English unlocks global career opportunities and cross-cultural empathy.',
    level: 'B1',
    duration: '06:45',
    topic: 'Culture & Careers',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400',
    audioUrl: 'https://cdn.freesound.org/previews/518/518888_6142149-lq.mp3', // Sample gentle ambient voice audio
    transcript: `
Welcome to SpeakUp Voices! Today we are discussing why mastering English alongside French and your native African language gives you an unrivaled competitive edge. 

When you navigate international boardrooms or tech companies, code switching isn't just a linguistic ability—it represents cognitive agility. Studies show that multilingual speakers solve problems faster and adapt more gracefully to global team dynamics. 

Don't worry about speaking with an accent. An accent is simply proof that you have the courage to learn a second or third language. The key is clarity, tone, and confidence.
    `,
    vocabulary: [
      { word: 'Linguistic agility', definition: 'The mental flexibility to switch seamlessly between diverse languages and communication styles.' },
      { word: 'Code switching', definition: 'The practice of alternating between two or more languages in conversation.' },
      { word: 'Unrivaled', definition: 'Better than everyone or everything of the same kind.' }
    ],
    quiz: [
      {
        question: 'According to the speaker, what does having an accent signify?',
        options: [
          'A lack of grammatical study',
          'Proof that you courageously speak multiple languages',
          'Inability to work internationally',
          'A need to remain silent'
        ],
        correctIndex: 1,
        explanation: 'The speaker highlights that having an accent is proof of your courage to learn languages.'
      },
      {
        question: 'What is the primary factor emphasized over an accent?',
        options: ['Fast speech', 'Clarity and confidence', 'Strict slang usage', 'Loudness'],
        correctIndex: 1,
        explanation: 'The speaker explicitly notes: "The key is clarity, tone, and confidence."'
      }
    ]
  },
  {
    id: 'listen-2',
    title: 'TED Insights: Overcoming Fear When Speaking in Public',
    shortDescription: 'Proven psychological techniques to calm speech anxiety and speak English with charisma.',
    level: 'B2',
    duration: '08:12',
    topic: 'Public Speaking',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400',
    audioUrl: 'https://cdn.freesound.org/previews/476/476657_1015240-lq.mp3',
    transcript: `
Most people think public speaking fear comes from a lack of vocabulary. In reality, it comes from an evolutionary fight-or-flight response. Your brain misinterprets the audience's stare as a physical threat. 

To overcome this, reframe your adrenaline: instead of saying "I am terrified", say "I am excited to share value". Breathe deeply through your diaphragm, pause intentionally, and remember that pauses sound profound to the listener.
    `,
    vocabulary: [
      { word: 'Reframe', definition: 'To look at a situation from a new, more empowering angle.' },
      { word: 'Diaphragm', definition: 'The muscular partition used in deep, calm breathing.' }
    ],
    quiz: [
      {
        question: 'What mental reframe does the podcast suggest for anxiety?',
        options: [
          'Say: "I am excited to share value"',
          'Memorize every single sentence',
          'Never look at the audience',
          'Apologize immediately'
        ],
        correctIndex: 0,
        explanation: 'Reframing anxiety as excitement primes the body for positive enthusiasm.'
      }
    ]
  }
];

export const initialReadingMaterials: ReadingMaterial[] = [
  {
    id: 'reading-1',
    title: 'The Rise of Digital Nomads & Remote Work in Africa',
    shortDescription: 'How young African software engineers and creative professionals are tapping into global salaries through English fluency.',
    level: 'B1',
    estimatedMinutes: 6,
    category: 'Society & Career',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    passage: `
Across tech hubs from Dakar and Lagos to Nairobi and Kigali, a silent revolution is underway. Young professionals are no longer limited by geographic boundaries. With high-speed internet and fluent command of English, thousands of graduates are securing remote roles with international startups in San Francisco, London, and Berlin.

"English is the universal API of the modern knowledge economy," explains Amina, a full-stack engineer based in Senegal. "When I improved my English from basic reading to spontaneous verbal debate, my freelance earnings tripled in under six months."

However, linguistic confidence requires more than memorizing syntax. It demands cultural empathy—understanding how Western teams communicate with constructive candor, punctuality, and async documentation. As language platforms like SpeakUp modernize learning, African talent is poised to become the most dynamic workforce of the twenty-first century.
    `,
    vocabularyHighlights: [
      {
        word: 'Underway',
        phonetics: '/ˌʌndəˈweɪ/',
        englishDef: 'Currently happening or in progress.',
        frenchTranslation: 'En cours, en développement'
      },
      {
        word: 'Linguistic confidence',
        phonetics: '/lɪŋˈɡwɪstɪk ˈkɒnfɪdəns/',
        englishDef: 'The inner assurance to speak and write a language without anxiety.',
        frenchTranslation: 'Assurance linguistique'
      },
      {
        word: 'Candor',
        phonetics: '/ˈkændə/',
        englishDef: 'The quality of being open, honest, and direct in speech.',
        frenchTranslation: 'Franchise, sincérité'
      },
      {
        word: 'Poised to',
        phonetics: '/pɔɪzd tuː/',
        englishDef: 'Ready and positioned to do something big.',
        frenchTranslation: 'Prêt à, en position de'
      }
    ],
    questions: [
      {
        id: 'rq1',
        prompt: 'Why does Amina describe English as "the universal API of the modern knowledge economy"?',
        options: [
          'Because it is only used by computer programmers',
          'Because it connects professionals globally across different borders and platforms',
          'Because it is very difficult to learn',
          'Because French is disappearing'
        ],
        correctIndex: 1,
        explanation: 'An API connects distinct systems; similarly, English connects global knowledge workers.'
      },
      {
        id: 'rq2',
        prompt: 'Besides grammar syntax, what other element does the article emphasize for remote collaboration?',
        options: [
          'Buying expensive webcams',
          'Cultural empathy and understanding constructive candor',
          'Moving to London immediately',
          'Never writing emails'
        ],
        correctIndex: 1,
        explanation: 'The passage stresses cultural empathy, constructive candor, and punctuality.'
      }
    ]
  },
  {
    id: 'reading-2',
    title: 'The Science of Habits: How 15 Minutes a Day Outperforms Cramming',
    shortDescription: 'Neuroscience reveals why daily micro-learning sessions create permanent English fluency.',
    level: 'A2',
    estimatedMinutes: 5,
    category: 'Learning Hacks',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400',
    passage: `
Many students believe that studying English for five hours on Sunday is effective. Cognitive scientists have proven the exact opposite. When you cram information into your brain in one massive session, over 80 percent of the new words fade within 48 hours.

This forgetting curve can be defeated by a principle called Spaced Repetition. When you practice English for just 15 to 20 minutes every single day, you stimulate your synaptic pathways right before you forget.

By maintaining your daily streak on SpeakUp, you train your brain to consider English as an active life skill rather than a boring academic chore.
    `,
    vocabularyHighlights: [
      {
        word: 'Cramming',
        phonetics: '/ˈkræmɪŋ/',
        englishDef: 'Studying intensively right before a deadline or test.',
        frenchTranslation: 'Bâcler / Réviser intensivement à la dernière minute'
      },
      {
        word: 'Spaced Repetition',
        phonetics: '/speɪst ˌrɛpəˈtɪʃən/',
        englishDef: 'A learning technique that incorporates increasing intervals of time between subsequent review.',
        frenchTranslation: 'Répétition espacée'
      }
    ],
    questions: [
      {
        id: 'rq2-1',
        prompt: 'What happens to vocabulary when you cram for hours in one session?',
        options: [
          'It stays permanently',
          'Over 80 percent fades within 48 hours',
          'You automatically become fluent',
          'You never need to review again'
        ],
        correctIndex: 1,
        explanation: 'The article states that cramming causes more than 80% of words to fade rapidly.'
      }
    ]
  }
];

export const initialWorkbooks: WorkbookItem[] = [
  {
    id: 'wb-1',
    title: 'Mastering English Verb Tenses & Timelines',
    description: 'Practical fill-in worksheets analyzing Past, Present, and Future structures with visual diagrams.',
    level: 'B1',
    category: 'Grammar Worksheets',
    previewImage: '/assets/speakup_past_present.png',
    pdfDownloadUrl: '/assets/speakup_past_present.png',
    interactiveExercises: [
      {
        id: 'wb-q1',
        instructions: 'Conjugate the verb in brackets into the correct Past or Present Perfect tense.',
        prompt: '1. I ________ (meet) Fatoumata three years ago, and we ________ (be) close friends ever since.',
        sampleAnswer: 'met, have been',
        notes: 'Notice the specific time "three years ago" triggers Simple Past, while "ever since" connects to Present Perfect.'
      },
      {
        id: 'wb-q2',
        instructions: 'Choose between Present Simple and Present Continuous.',
        prompt: '2. She normally ________ (speak) French, but today she ________ (speak) English at the workshop.',
        sampleAnswer: 'speaks, is speaking',
        notes: 'Habitual routine vs. temporary exception happening today.'
      }
    ]
  },
  {
    id: 'wb-2',
    title: 'Daily Phrasal Verbs & Action Words Practice',
    description: 'Vocabulary expansion worksheets with real-life context sentences and dialogue construction.',
    level: 'A2',
    category: 'Vocabulary Activities',
    previewImage: '/assets/speakup_verbs_1.png',
    pdfDownloadUrl: '/assets/speakup_verbs_1.png',
    interactiveExercises: [
      {
        id: 'wb-q3',
        instructions: 'Insert the correct particle (up, out, off, down).',
        prompt: '1. Never give ________ on your English dreams. 2. Please turn ________ the volume.',
        sampleAnswer: 'up, down',
        notes: '"Give up" = abandon; "turn down" = reduce intensity.'
      }
    ]
  },
  {
    id: 'wb-3',
    title: 'Sentence Construction & Linking Words Lab',
    description: 'Transform simple ideas into complex, persuasive sentences using transition connectors.',
    level: 'B2',
    category: 'Sentence Construction',
    previewImage: '/assets/speakup_future.png',
    pdfDownloadUrl: '/assets/speakup_future.png',
    interactiveExercises: [
      {
        id: 'wb-q4',
        instructions: 'Combine the two sentences using "Although" or "Despite".',
        prompt: 'Sentence A: It rained heavily. Sentence B: We enjoyed our English debate outdoors.',
        sampleAnswer: 'Although it rained heavily, we enjoyed our English debate outdoors.',
        notes: 'Although takes a subject + verb clause, while Despite takes a noun phrase.'
      }
    ]
  }
];

export const initialUpdates: UpdateAnnouncement[] = [
  {
    id: 'up-1',
    title: 'SpeakUp 2026 Ambassador Scholarship Program Now Open!',
    category: 'Scholarships & Opportunities',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    description: 'We are thrilled to announce 50 full scholarships for ambitious students across West Africa. Selected ambassadors receive 1-on-1 native coaching, free Cambridge exam vouchers, and leadership mentorship.',
    publicationDate: 'November 22, 2026',
    externalLink: 'https://speakup.edu/ambassador-2026',
    isImportant: true
  },
  {
    id: 'up-2',
    title: 'New Feature: Instant English-to-French Dictionary with Voice Playback',
    category: 'Platform Announcements',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    description: 'Look up any word, listen to crystal-clear native pronunciation, view French translations and idiomatic usage examples without leaving your dashboard.',
    publicationDate: 'November 20, 2026',
    isImportant: false
  },
  {
    id: 'up-3',
    title: 'Annual West African English Debate Championship 2026',
    category: 'Competitions',
    coverImage: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80&w=600',
    description: 'Registration is officially open for the regional debate cup. Showcase your persuasive rhetoric and win tech prizes, laptops, and study grants.',
    publicationDate: 'November 15, 2026',
    externalLink: 'https://speakup.edu/debate-2026',
    isImportant: true
  }
];

export const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Atomic Habits for Language Learners',
    author: 'James Clear & SpeakUp Editorial',
    shortDescription: 'Tiny changes, remarkable results. How small 1% daily improvements compound into fluent English mastery.',
    level: 'B1',
    genre: 'Personal Development',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=350',
    kokoBookId: 'koko-atomic-habits-en',
    kokoUrl: 'https://koko.reader/books/atomic-habits-en',
    pagesCount: 280,
    rating: 4.9
  },
  {
    id: 'book-2',
    title: 'Things Fall Apart (Annotated Edition)',
    author: 'Chinua Achebe',
    shortDescription: 'A classic of world literature capturing pre-colonial life in southeastern Nigeria and the impact of British colonialism.',
    level: 'B2',
    genre: 'African Literature',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=350',
    kokoBookId: 'koko-things-fall-apart',
    kokoUrl: 'https://koko.reader/books/things-fall-apart',
    pagesCount: 209,
    rating: 4.8
  },
  {
    id: 'book-3',
    title: 'Short Stories in English for Beginners',
    author: 'Olly Richards',
    shortDescription: 'Engaging, graded short stories crafted especially for A1 and A2 learners to build confidence without checking the dictionary every line.',
    level: 'A2',
    genre: 'Graded Reader',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=350',
    kokoBookId: 'koko-olly-richards-a2',
    kokoUrl: 'https://koko.reader/books/short-stories-beginners-a2',
    pagesCount: 160,
    rating: 4.7
  },
  {
    id: 'book-4',
    title: 'The Alchemist: The English Reader Experience',
    author: 'Paulo Coelho',
    shortDescription: 'Follow Santiago on his journey across the Andalusian plains and Egyptian desert in accessible, poetic English prose.',
    level: 'B1',
    genre: 'Inspirational Fiction',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=350',
    kokoBookId: 'koko-alchemist-en',
    kokoUrl: 'https://koko.reader/books/the-alchemist-en',
    pagesCount: 198,
    rating: 4.9
  }
];

export const initialDictionary: DictionaryEntry[] = [
  {
    word: 'resilient',
    ipa: '/rɪˈzɪl.jənt/',
    wordType: 'adjective',
    frenchTranslation: 'résilient, capable de surmonter les épreuves',
    englishDefinition: 'Able to withstand or recover quickly from difficult conditions or adversity.',
    exampleEn: 'African entrepreneurs are remarkably resilient in the face of economic hurdles.',
    exampleFr: 'Les entrepreneurs africains sont remarquablement résilients face aux obstacles économiques.',
    synonyms: ['tough', 'tenacious', 'adaptable', 'buoyant'],
    antonyms: ['fragile', 'vulnerable', 'weak']
  },
  {
    word: 'serendipity',
    ipa: '/ˌser.ənˈdɪp.ə.ti/',
    wordType: 'noun',
    frenchTranslation: 'sérendipité, heureux hasard',
    englishDefinition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    exampleEn: 'Meeting my future business partner at the SpeakUp speaking club was pure serendipity.',
    exampleFr: 'Rencontrer mon futur associé au club de conversation SpeakUp était un pur heureux hasard.',
    synonyms: ['fluke', 'happy chance', 'providence'],
    antonyms: ['misfortune', 'bad luck']
  },
  {
    word: 'eloquent',
    ipa: '/ˈel.ə.kwənt/',
    wordType: 'adjective',
    frenchTranslation: 'éloquent, persuasif',
    englishDefinition: 'Fluent or persuasive in speaking or writing.',
    exampleEn: 'Fatoumata delivered an eloquent speech during the regional debate cup.',
    exampleFr: 'Fatoumata a prononcé un discours éloquent lors de la coupe régionale de débat.',
    synonyms: ['articulate', 'expressive', 'fluent', 'silver-tongued'],
    antonyms: ['inarticulate', 'hesitant']
  },
  {
    word: 'perseverance',
    ipa: '/ˌpɜː.sɪˈvɪə.rəns/',
    wordType: 'noun',
    frenchTranslation: 'persévérance, ténacité',
    englishDefinition: 'Persistence in doing something despite difficulty or delay in achieving success.',
    exampleEn: 'With perseverance, you can move from beginner A1 to fluent C1.',
    exampleFr: 'Avec de la persévérance, vous pouvez passer de débutant A1 à un niveau C1 courant.',
    synonyms: ['persistence', 'tenacity', 'determination', 'grit'],
    antonyms: ['apathy', 'giving up']
  },
  {
    word: 'empower',
    ipa: '/ɪmˈpaʊ.ər/',
    wordType: 'verb',
    frenchTranslation: 'autonomiser, donner les moyens à',
    englishDefinition: 'Give someone the authority or power to do something; make someone stronger and more confident.',
    exampleEn: 'Speaking English empowers students to access worldwide academic research.',
    exampleFr: 'Parler anglais permet aux étudiants d\'accéder à la recherche académique mondiale.',
    synonyms: ['enable', 'authorize', 'strengthen', 'uplift'],
    antonyms: ['disempower', 'restrict', 'hinder']
  },
  {
    word: 'thrive',
    ipa: '/θraɪv/',
    wordType: 'verb',
    frenchTranslation: 'prospérer, s\'épanouir',
    englishDefinition: 'Grow or develop well or vigorously; flourish.',
    exampleEn: 'Children thrive in supportive, interactive educational environments.',
    exampleFr: 'Les enfants s\'épanouissent dans des environnements éducatifs stimulants et bienveillants.',
    synonyms: ['flourish', 'prosper', 'bloom', 'succeed'],
    antonyms: ['decline', 'fail', 'deteriorate']
  }
];

export const initialNotifications: PlatformNotification[] = [
  {
    id: 'notif-1',
    title: 'Speaking Club Starting Soon! 🎙️',
    message: 'Sarah Jenkins scheduled "Live Speaking Club: Fluency & Pronunciation" for tomorrow at 5:00 PM.',
    timestamp: '15m ago',
    type: 'course',
    read: false
  },
  {
    id: 'notif-2',
    title: '123-Day Streak Maintained! 🔥',
    message: 'Awesome consistency! You have practiced every day this week.',
    timestamp: '2h ago',
    type: 'streak',
    read: false
  },
  {
    id: 'notif-3',
    title: 'New Feedback on Exercise',
    message: 'Your score for "Present Perfect vs. Simple Past" was recorded: 100%. Keep it up!',
    timestamp: 'Yesterday',
    type: 'test',
    read: true
  }
];
