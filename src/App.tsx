import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SidebarLeft } from './components/layout/SidebarLeft';
import { SidebarRight } from './components/layout/SidebarRight';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Module views
import { DashboardView } from './components/modules/DashboardView';
import { LessonsExercisesView } from './components/modules/LessonsExercisesView';
import { OnlineCoursesView } from './components/modules/OnlineCoursesView';
import { MessagesView } from './components/modules/MessagesView';
import { TestsView } from './components/modules/TestsView';
import { ListeningView } from './components/modules/ListeningView';
import { ReadingView } from './components/modules/ReadingView';
import { WorkbookView } from './components/modules/WorkbookView';
import { UpdatesView } from './components/modules/UpdatesView';
import { LibraryView } from './components/modules/LibraryView';
import { DictionaryView } from './components/modules/DictionaryView';
import { ProfileView } from './components/modules/ProfileView';

const MainLayout: React.FC = () => {
  const { activeNav } = useApp();

  // Render active module
  const renderModuleContent = () => {
    switch (activeNav) {
      case 'Home':
        return <DashboardView />;
      case 'Lessons & Exercises':
        return <LessonsExercisesView />;
      case 'Online Courses':
        return <OnlineCoursesView />;
      case 'Messages':
        return <MessagesView />;
      case 'Tests':
        return <TestsView />;
      case 'Listening':
        return <ListeningView />;
      case 'Reading':
        return <ReadingView />;
      case 'Workbook':
        return <WorkbookView />;
      case 'Updates':
        return <UpdatesView />;
      case 'Library':
        return <LibraryView />;
      case 'English Dictionary':
        return <DictionaryView />;
      case 'Profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      {/* 3-Column Core Dashboard Layout */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        {/* Column 1: Left Navigation Sidebar */}
        <SidebarLeft />

        {/* Column 2: Center Dynamic Learning Module */}
        <main className="flex-1 min-w-0 p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-65px)]">
          {renderModuleContent()}
        </main>

        {/* Column 3: Right Streak & Progress Sidebar */}
        <div className="hidden xl:block">
          <SidebarRight />
        </div>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearchModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
