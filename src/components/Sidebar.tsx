'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tracks } from '@/data/tracks';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleTrack(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#111] border border-[#222] text-white"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] z-40 flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-[#1a1a1a]">
          <Link href="/" onClick={() => setOpen(false)}>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#00E6B9] to-[#00B894] bg-clip-text text-transparent">
              VE Academy
            </h1>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tracks.map(track => (
            <div key={track.id}>
              <button
                onClick={() => toggleTrack(track.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-[#111] transition-colors"
              >
                <span>
                  {track.icon} {track.title}
                </span>
                <span className="text-xs text-gray-500">{expanded[track.id] ? '▾' : '▸'}</span>
              </button>
              {expanded[track.id] && (
                <div className="ml-4 mt-1 space-y-0.5">
                  <Link
                    href={`/tracks/${track.id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-1.5 rounded text-xs transition-colors ${
                      isActive(`/tracks/${track.id}`)
                        ? 'bg-[#00E6B9]/10 text-[#00E6B9]'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    Track Overview
                  </Link>
                  {track.modules.map(mod => (
                    <Link
                      key={mod.id}
                      href={`/tracks/${track.id}/modules/${mod.id}`}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-1.5 rounded text-xs transition-colors truncate ${
                        isActive(`/tracks/${track.id}/modules/${mod.id}`)
                          ? 'bg-[#00E6B9]/10 text-[#00E6B9]'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {mod.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a1a1a] space-y-1">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive('/profile') ? 'bg-[#00E6B9]/10 text-[#00E6B9]' : 'text-gray-400 hover:text-white'
            }`}
          >
            👤 Profile
          </Link>
          <Link
            href="/badges"
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive('/badges') ? 'bg-[#00E6B9]/10 text-[#00E6B9]' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏅 Badges
          </Link>
        </div>
      </aside>
    </>
  );
}
