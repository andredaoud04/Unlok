import { CalendarDays, Flame, Play, Target } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import XPBadge from '../components/XPBadge.jsx';
import { getWeeklyTargetStatus } from '../lib/progress.js';

export default function HomeScreen({ state, program, progress, onStartLogging, onViewProgram, onOpenLibrary }) {
  const weekly = getWeeklyTargetStatus(state, program);

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40">Welcome back</p>
            <h1 className="text-4xl font-black tracking-[-0.06em]">{state.userName || 'Rookie'}</h1>
          </div>
          <XPBadge xp={state.totalXp} compact />
        </div>
      </header>

      <Card className="overflow-hidden">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">Active program</p>
            <h2 className="text-3xl font-black tracking-[-0.06em]">{program.name}</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">{program.description}</p>
          </div>
          <div className="rounded-3xl bg-white p-3 text-black">
            <Target />
          </div>
        </div>

        <ProgressBar
          value={progress.percent}
          label="Program progress"
          detail={`${progress.completedSessions}/${progress.targetSessions} sessions`}
        />

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/[0.06] p-3">
            <CalendarDays size={17} className="mb-2 text-white/50" />
            <p className="text-lg font-black">{program.durationWeeks}w</p>
            <p className="text-xs text-white/40">timeline</p>
          </div>
          <div className="rounded-2xl bg-white/[0.06] p-3">
            <Flame size={17} className="mb-2 text-white/50" />
            <p className="text-lg font-black">{state.streak}</p>
            <p className="text-xs text-white/40">streak</p>
          </div>
          <div className="rounded-2xl bg-white/[0.06] p-3">
            <Play size={17} className="mb-2 text-white/50" />
            <p className="text-lg font-black">{program.estimatedMinutes}</p>
            <p className="text-xs text-white/40">minutes</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button className="flex-1" onClick={onStartLogging}>Log session</Button>
          <Button variant="secondary" className="flex-1" onClick={onViewProgram}>View plan</Button>
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black tracking-[-0.04em]">This week</h3>
            <p className="text-sm text-white/45">Hit the weekly target. That is the real streak.</p>
          </div>
          <p className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
            {weekly.completed}/{weekly.target}
          </p>
        </div>
        <ProgressBar value={weekly.percent} />
      </Card>

      <Card>
        <h3 className="text-xl font-black tracking-[-0.04em]">Final unlock</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Complete the timeline, then pass: <span className="font-bold text-white">{progress.benchmark?.name}</span>.
        </p>
        <Button variant="ghost" className="mt-4 w-full" onClick={onOpenLibrary}>
          Browse other programs
        </Button>
      </Card>
    </div>
  );
}
