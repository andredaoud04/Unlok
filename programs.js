import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { stretches } from '../data/stretches.js';
import { calculateStretchXp } from '../lib/xp.js';

function makeInitialSets(program) {
  const session = program.sessions[0];

  return session.stretches.flatMap((item) => {
    const stretch = stretches.find((stretchItem) => stretchItem.id === item.stretchId);
    return Array.from({ length: item.sets }, (_, index) => ({
      id: `${item.stretchId}-${index + 1}`,
      stretchId: item.stretchId,
      setNumber: index + 1,
      holdSeconds: item.holdSeconds || stretch?.defaultHoldSeconds || 30,
      reps: item.reps || stretch?.defaultReps || 1,
      completed: false,
    }));
  });
}

export default function LogSession({ program, onCancel, onComplete }) {
  const [sets, setSets] = useState(() => makeInitialSets(program));

  const grouped = useMemo(() => {
    return program.sessions[0].stretches.map((item) => {
      const stretch = stretches.find((stretchItem) => stretchItem.id === item.stretchId);
      return {
        stretch,
        planned: item,
        sets: sets.filter((set) => set.stretchId === item.stretchId),
      };
    });
  }, [program, sets]);

  const xpEarned = useMemo(() => {
    return grouped.reduce((total, group) => total + calculateStretchXp(group.stretch, group.sets), 0);
  }, [grouped]);

  const completedCount = sets.filter((set) => set.completed).length;
  const allComplete = completedCount === sets.length;

  function updateSet(setId, patch) {
    setSets((current) =>
      current.map((set) => (set.id === setId ? { ...set, ...patch } : set)),
    );
  }

  function finishSession() {
    onComplete({
      id: crypto.randomUUID(),
      programId: program.id,
      date: new Date().toISOString(),
      completed: completedCount > 0,
      allComplete,
      xpEarned,
      sets,
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-white/40">Logging</p>
          <h1 className="text-4xl font-black tracking-[-0.06em]">{program.sessions[0].title}</h1>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-white/[0.06] p-3 text-white/55"
        >
          <X size={18} />
        </button>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/45">XP earned</p>
            <p className="text-4xl font-black tracking-[-0.06em]">{xpEarned}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/45">Sets</p>
            <p className="text-2xl font-black">{completedCount}/{sets.length}</p>
          </div>
        </div>
      </Card>

      {grouped.map((group) => (
        <Card key={group.stretch.id}>
          <div className="mb-4">
            <h2 className="text-xl font-black tracking-[-0.04em]">{group.stretch.name}</h2>
            <p className="mt-1 text-sm text-white/45">{group.stretch.area} • difficulty {group.stretch.difficulty}/5</p>
          </div>

          <div className="space-y-2">
            {group.sets.map((set) => (
              <div key={set.id} className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2 rounded-2xl bg-white/[0.06] p-2">
                <p className="w-8 text-center text-sm font-bold text-white/50">{set.setNumber}</p>
                <input
                  type="number"
                  min="0"
                  value={set.holdSeconds}
                  onChange={(event) => updateSet(set.id, { holdSeconds: Number(event.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/30"
                />
                <input
                  type="number"
                  min="0"
                  value={set.reps}
                  onChange={(event) => updateSet(set.id, { reps: Number(event.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/30"
                />
                <button
                  type="button"
                  onClick={() => updateSet(set.id, { completed: !set.completed })}
                  className={`rounded-xl p-2 transition ${
                    set.completed ? 'bg-white text-black' : 'bg-white/10 text-white/35'
                  }`}
                >
                  <Check size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-black/25 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-white/30">Cues</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-white/50">
              {group.stretch.cues.map((cue) => (
                <li key={cue}>• {cue}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}

      <div className="sticky bottom-24">
        <Button className="w-full" disabled={completedCount === 0} onClick={finishSession}>
          Finish session · +{xpEarned} XP
        </Button>
      </div>
    </div>
  );
}
