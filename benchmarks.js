import { ArrowLeft, BadgeCheck, Clock, Target } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { benchmarks } from '../data/benchmarks.js';
import { stretches } from '../data/stretches.js';

export default function ProgramDetail({ program, isActive, onBack, onStartProgram, onLog }) {
  const benchmark = benchmarks.find((item) => item.id === program.finalBenchmarkId);

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-sm text-white/60"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/35">{program.category}</p>
        <h1 className="text-4xl font-black tracking-[-0.06em]">{program.name}</h1>
        <p className="mt-4 text-sm leading-6 text-white/50">{program.description}</p>
      </header>

      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3">
          <Clock size={18} className="mb-2 text-white/45" />
          <p className="font-black">{program.durationWeeks}w</p>
          <p className="text-xs text-white/40">timeline</p>
        </Card>
        <Card className="p-3">
          <Target size={18} className="mb-2 text-white/45" />
          <p className="font-black">{program.sessionsPerWeek}x</p>
          <p className="text-xs text-white/40">weekly</p>
        </Card>
        <Card className="p-3">
          <BadgeCheck size={18} className="mb-2 text-white/45" />
          <p className="font-black">+{program.completionXp}</p>
          <p className="text-xs text-white/40">XP</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-black tracking-[-0.04em]">Progression logic</h2>
        <div className="mt-4 space-y-3">
          {program.weeklyProgression.map((item) => (
            <p key={item} className="rounded-2xl bg-white/[0.06] p-3 text-sm leading-6 text-white/60">
              {item}
            </p>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-black tracking-[-0.04em]">Session template</h2>
        <div className="mt-4 space-y-3">
          {program.sessions[0].stretches.map((item) => {
            const stretch = stretches.find((stretchItem) => stretchItem.id === item.stretchId);
            return (
              <div key={item.stretchId} className="rounded-2xl bg-white/[0.06] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{stretch?.name}</p>
                    <p className="mt-1 text-xs text-white/40">{stretch?.area} • {stretch?.technique}</p>
                  </div>
                  <p className="text-sm text-white/55">{item.sets} × {item.holdSeconds}s</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-black tracking-[-0.04em]">Final benchmark</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          <span className="font-bold text-white">{benchmark?.name}:</span> {benchmark?.target}
        </p>
      </Card>

      <div className="sticky bottom-24 grid grid-cols-2 gap-3">
        {isActive ? (
          <Button className="col-span-2" onClick={onLog}>Log this program</Button>
        ) : (
          <>
            <Button className="col-span-2" onClick={onStartProgram}>Start program</Button>
          </>
        )}
      </div>
    </div>
  );
}
