import { useMemo, useState } from 'react';
import { Check, Flame, LockKeyhole, Target, Zap } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { programs } from '../data/programs.js';

const fixAreas = [
  { id: 'hips', label: 'Tight hips', description: 'Squats feel blocked, hip flexors always feel short.' },
  { id: 'back', label: 'Lower back stiffness', description: 'Back feels loaded after sitting, lifting, or waking up.' },
  { id: 'hamstrings', label: 'Tight hamstrings', description: 'Toe touches, RDLs, and hinging feel restricted.' },
  { id: 'shoulders', label: 'Shoulders / lats', description: 'Overhead mobility feels limited or uncomfortable.' },
];

const goalOptions = [
  { id: 'front-splits-foundation', label: 'Front splits', emoji: '🦵', xp: 900, timeline: '10 wks' },
  { id: 'pancake-unlock', label: 'Pancake fold', emoji: '🧘', xp: 800, timeline: '8 wks' },
  { id: 'planche-prep-mobility', label: 'Planche prep', emoji: '💪', xp: 850, timeline: '8 wks' },
  { id: 'upper-body-unlock', label: 'Bridge mobility', emoji: '🤸', xp: 450, timeline: '6 wks' },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [entryPath, setEntryPath] = useState(null);
  const [selectedFixAreas, setSelectedFixAreas] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [name, setName] = useState('');

  const firstGoalProgram = selectedGoals[0] || (entryPath === 'fix' ? 'tight-hips-reset' : 'front-splits-foundation');

  const headline = useMemo(() => {
    if (step === 1) return 'Why are you here?';
    if (step === 2) return 'What feels locked?';
    if (step === 3) return 'What are you trying to unlock?';
    if (step === 4) return 'What should we call you?';
    return '';
  }, [step]);

  function toggleFixArea(id) {
    setSelectedFixAreas((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function toggleGoal(id) {
    setSelectedGoals((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function finish() {
    onComplete({
      userName: name.trim() || 'Rookie',
      entryPath,
      fixAreas: selectedFixAreas,
      goals: selectedGoals,
      goalProgramId: firstGoalProgram,
    });
  }

  if (step === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-6 text-white">
        <div className="noise-overlay" />
        <div className="text-center">
          <div className="mb-5 inline-flex rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <LockKeyhole size={34} />
          </div>
          <h1 className="text-7xl font-black tracking-[-0.08em]">unlok</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.32em] text-white/35">Mobility for skill</p>

          <div className="relative mx-auto mt-16 h-2 w-16 rounded-full bg-white/10">
            <div className="absolute left-0 top-0 h-2 w-7 rounded-full bg-white" style={{ animation: 'slideDot 2.6s ease-in-out infinite alternate' }} />
          </div>

          <Button className="mt-10 w-full max-w-xs" onClick={() => setStep(1)}>
            Start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050507] px-5 py-6 text-white">
      <div className="noise-overlay" />
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col">
        <div className="mb-8 flex items-center justify-between">
          <p className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            Step {Math.max(1, step)} of 4
          </p>
          <p className="text-sm font-black tracking-[-0.05em]">unlok</p>
        </div>

        <h2 className="mb-2 text-4xl font-black tracking-[-0.06em]">{headline}</h2>
        <p className="mb-7 text-sm leading-6 text-white/45">
          Built for lifters and calisthenics people who think in unlocks, not vague wellness streaks.
        </p>

        {step === 1 && (
          <div className="space-y-3">
            <button type="button" className="w-full text-left" onClick={() => setEntryPath('fix')}>
              <Card selected={entryPath === 'fix'} className={entryPath === 'fix' ? '' : 'border-red-400/20'}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-2xl p-3 ${entryPath === 'fix' ? 'bg-black text-white' : 'bg-red-500/10 text-red-100'}`}>
                    <Zap />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Something hurts</h3>
                    <p className={entryPath === 'fix' ? 'text-black/60' : 'text-white/45'}>
                      Tight hips, stiff back, locked hamstrings, bad positions.
                    </p>
                  </div>
                </div>
              </Card>
            </button>

            <button type="button" className="w-full text-left" onClick={() => setEntryPath('achieve')}>
              <Card selected={entryPath === 'achieve'}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-2xl p-3 ${entryPath === 'achieve' ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                    <Target style={{ animation: entryPath === 'achieve' ? undefined : 'pulseSkill 2.4s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">I want a skill</h3>
                    <p className={entryPath === 'achieve' ? 'text-black/60' : 'text-white/45'}>
                      Splits, pancake, bridge, planche prep, better lines.
                    </p>
                  </div>
                </div>
              </Card>
            </button>

            <button
              type="button"
              onClick={() => setEntryPath('both')}
              className="mx-auto block px-4 py-4 text-sm text-white/45 underline-offset-4 hover:text-white hover:underline"
            >
              Both. I’m stiff and chasing a skill.
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {fixAreas.map((area) => {
              const selected = selectedFixAreas.includes(area.id);
              return (
                <button key={area.id} type="button" onClick={() => toggleFixArea(area.id)} className="w-full text-left">
                  <Card className={`${selected ? 'border-white bg-white/[0.08]' : ''} ${selected ? 'border-l-4' : ''}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{area.label}</h3>
                        <p className="mt-1 text-sm leading-5 text-white/45">{area.description}</p>
                      </div>
                      {selected && <Check size={20} />}
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {goalOptions.map((goal) => {
              const selected = selectedGoals.includes(goal.id);
              return (
                <button key={goal.id} type="button" onClick={() => toggleGoal(goal.id)} className="w-full text-left">
                  <Card selected={selected}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{goal.emoji}</span>
                        <div>
                          <h3 className="font-bold">{goal.label}</h3>
                          <p className={selected ? 'text-sm text-black/55' : 'text-sm text-white/40'}>
                            Final test + timeline unlock
                          </p>
                        </div>
                      </div>
                      {selected && (
                        <div className="animate-rise-in text-right">
                          <p className="text-sm font-black">+{goal.xp} XP</p>
                          <p className="rounded-full bg-black/10 px-2 py-1 text-xs text-black/55">{goal.timeline}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-xl font-bold text-white outline-none transition placeholder:text-white/20 focus:border-white/30 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
            />
            <p className="text-sm text-white/40">We don’t need your email yet.</p>
            {name.trim() && (
              <p className="animate-rise-in text-2xl font-black tracking-[-0.05em]">
                Let’s go, {name.trim()}.
              </p>
            )}
          </div>
        )}

        <div className="mt-auto pt-8">
          {step < 4 ? (
            <Button
              className="w-full"
              disabled={step === 1 && !entryPath}
              onClick={() => {
                if (step === 1 && entryPath === 'fix') setStep(2);
                else if (step === 1 && entryPath === 'achieve') setStep(3);
                else if (step === 1 && entryPath === 'both') setStep(2);
                else if (step === 2 && entryPath === 'fix') setStep(4);
                else if (step === 2) setStep(3);
                else setStep(step + 1);
              }}
            >
              Continue {step === 2 && selectedFixAreas.length > 0 ? `with ${selectedFixAreas.length} selected` : ''}
            </Button>
          ) : (
            <>
              <div className="mb-5 h-px bg-white/10" />
              <Button className="w-full" onClick={finish}>
                Enter Unlok
              </Button>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-white/[0.15]">
          0 XP — Rookie
        </p>
      </div>
    </div>
  );
}
