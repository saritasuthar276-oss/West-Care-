"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything... (e.g. today's attendance, food waste, stock, etc.)"
            className="w-full pl-10 pr-16 py-2 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 text-ellipsis overflow-hidden whitespace-nowrap"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500">
              Ctrl + K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative border border-gray-200">
             <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs font-bold">NS</div>
             {/* Actual image can be placed here if available */}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-tight whitespace-nowrap">Naresh Suthar</p>
            <p className="text-[11px] text-gray-500 whitespace-nowrap">Mess Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </header>
  );
}
