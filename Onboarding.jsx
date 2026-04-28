import { Trophy } from 'lucide-react';
import { getRank } from '../lib/xp.js';

export default function XPBadge({ xp = 0, compact = false }) {
  const rank = getRank(xp);

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
      <Trophy size={compact ? 14 : 16} className="text-white/70" />
      <span className="font-semibold">{xp} XP</span>
      <span className="text-white/35">•</span>
      <span className="text-white/60">{rank}</span>
    </div>
  );
}
