import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import ProgramCard from '../components/ProgramCard.jsx';
import { programs } from '../data/programs.js';

export default function ProgramLibrary({ activeProgramId, onSelectProgram }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesFilter = filter === 'all' || program.goalType === filter;
      const searchText = `${program.name} ${program.description} ${program.tags.join(' ')}`.toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <p className="text-sm text-white/40">Curated tracks</p>
        <h1 className="text-4xl font-black tracking-[-0.06em]">Program Library</h1>
      </header>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-white/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search hips, splits, planche..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ['all', 'All'],
          ['fix', 'Fix'],
          ['achieve', 'Achieve'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
              filter === id ? 'bg-white text-black' : 'bg-white/[0.06] text-white/45'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            active={program.id === activeProgramId}
            onClick={() => onSelectProgram(program.id)}
          />
        ))}
      </div>
    </div>
  );
}
