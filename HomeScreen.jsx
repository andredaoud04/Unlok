import { ArrowRight, Clock, Target } from 'lucide-react';
import Card from './Card.jsx';

export default function ProgramCard({ program, active = false, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card selected={active} className="relative overflow-hidden">
        <div className={`absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full ${active ? 'bg-black/10' : 'bg-white/5'}`} />
        <div className="relative">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className={`mb-1 text-xs uppercase tracking-[0.22em] ${active ? 'text-black/50' : 'text-white/35'}`}>
                {program.category}
              </p>
              <h3 className="text-xl font-bold leading-tight">{program.name}</h3>
            </div>
            <div className={`rounded-full p-2 ${active ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
              <ArrowRight size={18} />
            </div>
          </div>

          <p className={`mb-4 text-sm leading-6 ${active ? 'text-black/65' : 'text-white/58'}`}>
            {program.description}
          </p>

          <div className={`flex flex-wrap gap-2 text-xs ${active ? 'text-black/65' : 'text-white/55'}`}>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${active ? 'bg-black/10' : 'bg-white/8'}`}>
              <Clock size={13} /> {program.durationWeeks} weeks
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${active ? 'bg-black/10' : 'bg-white/8'}`}>
              <Target size={13} /> {program.sessionsPerWeek}x/week
            </span>
            <span className={`rounded-full px-3 py-1 ${active ? 'bg-black/10' : 'bg-white/8'}`}>
              {program.completionXp} XP completion
            </span>
          </div>
        </div>
      </Card>
    </button>
  );
}
