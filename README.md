# SpeakUp — Interactive English Learning Platform 🎙️

![SpeakUp Dashboard](/public/assets/dashboard-ref.jpg)

**SpeakUp** is a modern, interactive English-learning platform designed to help learners improve their English skills through structured video lessons, interactive multi-format exercises, live online courses, 1-on-1 tutoring requests, CEFR assessments, podcast listening with synchronized transcripts, reading comprehension with instant French vocabulary translations, digital workbooks, an English-to-French dictionary with voice pronunciation, and seamless integration with the Koko reading ecosystem.

---

## 🌟 Key Features

- **Exact Design System:** Soft pastel aesthetic (lavender, purple, light blue, soft green, golden yellow), rounded 3-column dashboard layout, custom typography (`Plus Jakarta Sans`), and authentic SpeakUp infographics.
- **12 Interactive Modules:**
  1. **Home / Dashboard:** Personalized greeting, 60% completion gauge, 5 pastel quick-access cards, library preview, dictionary quick widget, and recent lessons.
  2. **Lessons & Exercises:**
     - **Lessons:** Video masterclasses with automated YouTube thumbnails, learning objectives checklist, structured notes, Google Slides presentation links, and downloadable PDF materials.
     - **Exercises:** Multi-format question runner supporting Multiple Choice, Fill-in-the-Blank, and Matching Pairs with instant scoring and explanations.
  3. **Online Courses:** Live course calendar (Google Meet, Zoom) with teacher assignment, registration toggles, and seat limits.
  4. **Messages & Communication:** Direct 1-on-1 private messaging, discussion groups, and a 1-on-1 Teacher Request review workflow.
  5. **Tests & Assessment:** 5-competency Diagnostic Placement Test (CEFR level calculation from A1 to C2) and 6 distinct Level Tests (A1–C2) with celebratory confetti.
  6. **Listening (Podcasts):** Custom audio player with speed controls (0.75x–1.5x), 10s skips, synchronized transcripts, key vocabulary with audio pronunciation, and comprehension quizzes.
  7. **Reading Lab:** Graded passages with font scaling, clickable vocabulary tooltips with instant French translations, and comprehension tests.
  8. **Workbook:** Printable PDF worksheets alongside a digital interactive mode to type answers and reveal model solutions.
  9. **Updates & Announcements:** Official announcement center for scholarships, competitions, and deadlines.
  10. **Library (Koko Reader Integration):** Graded literature reader connecting to external Koko reader links while preserving reading bookmarks in SpeakUp.
  11. **English-to-French Dictionary:** Instant search with autocomplete, IPA phonetic transcription, Web Speech native pronunciation, French translations, definitions, bilingual example sentences, and synonyms/antonyms.
  12. **Learner Profile:** Streak statistics (123-Day Streak), CEFR certificates, completed lessons, saved words, and books.
- **Multi-Role Access Control:** Top-bar role switcher to test permissions as **Student**, **Teacher**, or **Administrator**.
- **Data Persistence:** All progress, test scores, messages, and bookmarks automatically persist in `localStorage`.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS, Lucide Icons
- **Animation & Celebration:** Canvas Confetti
- **Audio & Speech:** Browser Web Speech API (`speechSynthesis`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Fatoumata32/speakup-platform.git
   cd speakup-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be located in the `dist/` directory.

---

## 📄 License

This project is licensed under the MIT License.
