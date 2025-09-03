import React from "react";
import { motion } from "motion/react";
import {
  User,
  Settings,
  Download,
  Clock,
  LayoutGrid,
  Gamepad2,
  Github,
  Bookmark,
} from "lucide-react";

interface SidebarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "accounts", icon: User, label: "Accounts" },
  { id: "games", icon: Gamepad2, label: "Games" },
  { id: "github", icon: Github, label: "GitHub" },
  { id: "settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
}: SidebarProps) {
  return (
    <div className="fixed right-0 top-0 h-full w-16 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700 z-20">
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 space-y-2 px-2">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <div key={item.id} className="relative">
                {/* Active tab background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500/20 rounded-lg border border-emerald-500/30"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                <motion.button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    relative w-12 h-12 rounded-lg flex items-center justify-center
                    transition-colors duration-200 group
                    ${
                      isActive
                        ? "text-emerald-400 bg-transparent"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />

                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}