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
      <Link href="/" className="block px-6 py-5 border-b border-gray-100" onClick={() => setOpen(false)}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-[#E8192C]">ivanti</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">VE Academy</span>
        </div>
      </Link>
      <div className="flex-1 overflow-y-auto py-4">
        {tracks.map(track => (
          <div key={track.id} className="mb-2">
            <button onClick={() => setExpanded(expanded === track.id ? null : track.id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#1A1F36] transition-colors">
              <span>{track.icon}</span>
              <span className="truncate">{track.title}</span>
              <span className="ml-auto text-xs text-gray-400">{expanded === track.id ? '▼' : '▶'}</span>
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
                        <div className="flex items-center gap-2 px-4 py-1.5 text-xs text-gray-300">
                          <span>🔒</span><span className="truncate">{mod.title}</span>
                        </div>
                      ) : (
                        <Link href={`/learn/${track.id}/${mod.id}`} onClick={() => setOpen(false)}
                          className={`flex items-center gap-2 px-4 py-1.5 text-xs transition-colors rounded-r ${isActive ? 'text-[#E8192C] border-l-2 border-[#E8192C] bg-red-50 font-semibold' : 'text-gray-500 hover:text-[#1A1F36]'}`}>
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
      <div className="border-t border-gray-100 p-4 space-y-2">
        <Link href="/profile" onClick={() => setOpen(false)} className={`block text-sm px-2 py-1 rounded ${pathname === '/profile' ? 'text-[#E8192C] font-semibold' : 'text-gray-500 hover:text-[#1A1F36]'}`}>
          👤 Profile
        </Link>
        <XPCounter />
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm">
        <span className="text-xl">{open ? '✕' : '☰'}</span>
      </button>
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-100 flex-col z-40">
        {nav}
      </aside>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-100 flex flex-col z-50 md:hidden shadow-2xl">
            {nav}
          </aside>
        </>
      )}
    </>
  );
}
