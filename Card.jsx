import { useMemo, useState } from 'react';
import { Activity, BarChart3, Compass, Home, ListChecks } from 'lucide-react';
import Onboarding from './screens/Onboarding.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProgramLibrary from './screens/ProgramLibrary.jsx';
import ProgramDetail from './screens/ProgramDetail.jsx';
import LogSession from './screens/LogSession.jsx';
import ProgressScreen from './screens/ProgressScreen.jsx';
import { programs } from './data/programs.js';
import { getInitialState, saveState } from './lib/storage.js';
import { calculateProgramProgress } from './lib/progress.js';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'library', label: 'Programs', icon: Compass },
  { id: 'log', label: 'Log', icon: ListChecks },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];

export default function App() {
  const [state, setState] = useState(() => getInitialState());
  const [activeTab, setActiveTab] = useState(state.hasCompletedOnboarding ? 'home' : 'onboarding');
  const [selectedProgramId, setSelectedProgramId] = useState(state.activeProgramId || programs[0].id);

  const activeProgram = useMemo(() => {
    return programs.find((program) => program.id === state.activeProgramId) || programs[0];
  }, [state.activeProgramId]);

  const selectedProgram = useMemo(() => {
    return programs.find((program) => program.id === selectedProgramId) || activeProgram;
  }, [selectedProgramId, activeProgram]);

  const progress = useMemo(() => calculateProgramProgress(state, activeProgram), [state, activeProgram]);

  function updateState(next) {
    setState((current) => {
      const resolved = typeof next === 'function' ? next(current) : next;
      saveState(resolved);
      return resolved;
    });
  }

  function completeOnboarding(payload) {
    const firstProgram = payload.goalProgramId || programs[0].id;
    updateState({
      ...state,
      hasCompletedOnboarding: true,
      userName: payload.userName || 'Rookie',
      entryPath: payload.entryPath,
      fixAreas: payload.fixAreas,
      goals: payload.goals,
      activeProgramId: firstProgram,
    });
    setSelectedProgramId(firstProgram);
    setActiveTab('home');
  }

  function selectProgram(programId) {
    setSelectedProgramId(programId);
    setActiveTab('program-detail');
  }

  function startProgram(programId) {
    updateState((current) => ({
      ...current,
      activeProgramId: programId,
      activeSessionIndex: 0,
    }));
    setSelectedProgramId(programId);
    setActiveTab('home');
  }

  function startLogging(programId = activeProgram.id) {
    setSelectedProgramId(programId);
    setActiveTab('log');
  }

  function completeSession(sessionLog) {
    updateState((current) => {
      const logs = [...current.sessionLogs, sessionLog];
      return {
        ...current,
        sessionLogs: logs,
        totalXp: current.totalXp + sessionLog.xpEarned,
        streak: sessionLog.completed ? current.streak + 1 : current.streak,
        lastSessionDate: sessionLog.date,
      };
    });
    setActiveTab('progress');
  }

  if (!state.hasCompletedOnboarding || activeTab === 'onboarding') {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  const ActiveIcon = Activity;

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="noise-overlay" />
      <main className="relative mx-auto min-h-screen w-full max-w-md px-4 pb-28 pt-5">
        {activeTab === 'home' && (
          <HomeScreen
            state={state}
            program={activeProgram}
            progress={progress}
            onStartLogging={() => startLogging(activeProgram.id)}
            onViewProgram={() => selectProgram(activeProgram.id)}
            onOpenLibrary={() => setActiveTab('library')}
          />
        )}

        {activeTab === 'library' && (
          <ProgramLibrary
            activeProgramId={state.activeProgramId}
            onSelectProgram={selectProgram}
          />
        )}

        {activeTab === 'program-detail' && (
          <ProgramDetail
            program={selectedProgram}
            isActive={selectedProgram.id === state.activeProgramId}
            onBack={() => setActiveTab('library')}
            onStartProgram={() => startProgram(selectedProgram.id)}
            onLog={() => startLogging(selectedProgram.id)}
          />
        )}

        {activeTab === 'log' && (
          <LogSession
            program={selectedProgram}
            userState={state}
            onCancel={() => setActiveTab('home')}
            onComplete={completeSession}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressScreen
            state={state}
            program={activeProgram}
            progress={progress}
            onOpenProgram={() => selectProgram(activeProgram.id)}
          />
        )}
      </main>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md border-t border-white/10 bg-[#050507]/90 px-3 pt-2 backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon || ActiveIcon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition ${
                  active ? 'bg-white text-black' : 'text-white/45 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
