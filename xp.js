import { Award, CalendarCheck, Flame, Trophy } from 'lucide-react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import XPBadge from '../components/XPBadge.jsx';

export default function ProgressScreen({ state, program, progress, onOpenProgram }) {
  const recentLogs = [...state.sessionLogs].slice(-5).reverse();

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <p className="text-sm text-white/40">Your unlock path</p>
        <h1 className="text-4xl font-black tracking-[-0.06em]">Progress</h1>
      </header>

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/45">Total XP</p>
            <p className="text-5xl font-black tracking-[-0.07em]">{state.totalXp}</p>
          </div>
          <XPBadge xp={state.totalXp} compact />
        </div>
        <ProgressBar value={progress.percent} label={program.name} detail={`${progress.percent}%`} />
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3">
          <Flame size={18} className="mb-2 text-white/45" />
          <p className="text-2xl font-black">{state.streak}</p>
          <p className="text-xs text-white/40">streak</p>
        </Card>
        <Card className="p-3">
          <CalendarCheck size={18} className="mb-2 text-white/45" />
          <p className="text-2xl font-black">{progress.completedSessions}</p>
          <p className="text-xs text-white/40">sessions</p>
        </Card>
        <Card className="p-3">
          <Trophy size={18} className="mb-2 text-white/45" />
          <p className="text-2xl font-black">{progress.earnedProgramXp}</p>
          <p className="text-xs text-white/40">program XP</p>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <Award size={18} />
          <h2 className="text-xl font-black tracking-[-0.04em]">Next benchmark</h2>
        </div>
        <p className="text-sm leading-6 text-white/50">
          <span className="font-bold text-white">{progress.benchmark?.name}</span> — {progress.benchmark?.target}
        </p>
        <Button variant="secondary" className="mt-4 w-full" onClick={onOpenProgram}>
          View active plan
        </Button>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-black tracking-[-0.04em]">Recent sessions</h2>
        {recentLogs.length === 0 ? (
          <p className="text-sm text-white/45">No sessions logged yet. Start ugly. Get consistent.</p>
        ) : (
          <div className="space-y-2">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-2xl bg-white/[0.06] p-3">
                <div>
                  <p className="font-bold">{new Date(log.date).toLocaleDateString()}</p>
                  <p className="text-xs text-white/40">{log.sets.filter((set) => set.completed).length} sets completed</p>
                </div>
                <p className="font-black">+{log.xpEarned}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
