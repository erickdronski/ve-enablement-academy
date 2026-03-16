'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tracks } from '@/data/tracks';
import { isModuleCompleted } from '@/lib/store';
import XPCounter from './XPCounter';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const nav = (
    <div className="flex flex-col h-full">
      <Link href="/" className="block px-6 py-5 border-b border-[#1a1a1a]" onClick={() => setOpen(false)}>
        <span className="text-xl font-black bg-gradient-to-r from-[#00E6B9] to-[#06b6d4] bg-clip-text text-transparent">VE Academy</span>
      </Link>
      <div className="flex-1 overflow-y-auto py-4">
        {tracks.map(track => (
          <div key={track.id} className="mb-2">
            <button onClick={() => setExpanded(expanded === track.id ? null : track.id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              <span>{track.icon}</span>
              <span className="truncate">{track.title}</span>
              <span className="ml-auto text-xs">{expanded === track.id ? '▼' : '▶'}</span>
            </button>
            {expanded === track.id && (
              <div className="ml-4 space-y-0.5">
                {track.modules.map((mod, i) => {
                  const completed = mounted && isModuleCompleted(track.id, mod.id);
                  const prevCompleted = i === 0 || (mounted && isModuleCompleted(track.id, track.modules[i - 1].id));
                  const isLocked = !prevCompleted && !completed;
                  const isActive = pathname === `/learn/${track.id}/${mod.id}`;
                  return (
                    <div key={mod.id}>
                      {isLocked ? (
                        <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-gray-600">
                          <span>🔒</span><span className="truncate">{mod.title}</span>
                        </div>
                      ) : (
                        <Link href={`/learn/${track.id}/${mod.id}`} onClick={() => setOpen(false)}
                          className={`flex items-center gap-2 px-4 py-1.5 text-xs transition-colors rounded-r ${isActive ? 'text-[#00E6B9] border-l-2 border-[#00E6B9] bg-[#00E6B9]/5' : 'text-gray-400 hover:text-white'}`}>
                          <span>{completed ? '✓' : '→'}</span><span className="truncate">{mod.title}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-[#1a1a1a] p-4 space-y-2">
        <Link href="/profile" onClick={() => setOpen(false)} className={`block text-sm px-2 py-1 rounded ${pathname === '/profile' ? 'text-[#00E6B9]' : 'text-gray-400 hover:text-white'}`}>
          👤 Profile
        </Link>
        <XPCounter />
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#111] border border-[#222]">
        <span className="text-xl">{open ? '✕' : '☰'}</span>
      </button>
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[280px] bg-[#0a0a0a] border-r border-[#1a1a1a] flex-col z-40">
        {nav}
      </aside>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col z-50 md:hidden">
            {nav}
          </aside>
        </>
      )}
    </>
  );
}
