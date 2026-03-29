import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/Button";
import { useAppContext } from "../../store/AppContext";
import { LayoutDashboard, Swords, Trophy, User as UserIcon, Activity, Award, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Quests", path: "/quests", icon: Swords },
  { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { name: "Activity", path: "/activity", icon: Activity },
  { name: "Achievements", path: "/achievements", icon: Award },
  { name: "Profile", path: "/profile", icon: UserIcon },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { state } = useAppContext();
  const { user } = state;
  const isLanding = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentShellClass = isLanding
    ? "w-full"
    : "mx-auto w-full max-w-[1760px] px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-32";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050A0A] text-[#F5F5F5] selection:bg-[#A3E635]/30 selection:text-[#A3E635] flex flex-col">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
        <motion.div
          className="animate-aurora absolute -left-40 top-8 h-[34rem] w-[34rem] rounded-full bg-[#1F7A6B]/25 blur-[150px]"
          animate={{ x: [0, 18, -12, 0], y: [0, 20, -14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="animate-aurora absolute -bottom-10 -right-16 h-[32rem] w-[32rem] rounded-full bg-[#A3E635]/15 blur-[150px]"
          animate={{ x: [0, -24, 12, 0], y: [0, -16, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="animate-aurora absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#134E4A]/18 blur-[150px]"
          animate={{ x: [0, 24, -18, 0], y: [0, -20, 14, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <nav className="fixed top-0 z-50 w-full border-b border-[#1F7A6B]/10 bg-[#050A0A]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1760px] items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-32">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#134E4A] via-[#1F7A6B] to-[#A3E635] shadow-[0_0_15px_rgba(163,230,53,0.3)]" />
            <span className="font-display text-base font-bold tracking-tight sm:text-xl">HackQuest AI</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {user && !isLanding && (
              NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-5 py-2 text-[15px] font-semibold tracking-[0.01em] transition-colors hover:text-white",
                      isActive ? "text-white" : "text-[#A1A1AA]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-[#1F7A6B]/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <link.icon className="h-[18px] w-[18px]" />
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })
            )}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {isLanding ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/login">
                  <Button size="sm">Connect Wallet</Button>
                </Link>
              </>
            ) : user ? (
              <div className="flex items-center gap-3 rounded-full border border-[#1F7A6B]/20 bg-[#0F2F2B]/20 px-4 py-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white">{user.username}</span>
                  <span className="text-[11px] font-medium text-[#A3E635]">LVL {user.level}</span>
                </div>
                <img src={user.avatar} alt="Avatar" className="h-9 w-9 rounded-full border border-[#1F7A6B]/20" />
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Connect Wallet</Button>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#1F7A6B]/30 p-2 text-[#A1A1AA] transition-colors hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#1F7A6B]/10 px-6 pb-4 pt-3 sm:px-10 md:hidden"
            >
            {user && !isLanding && (
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#1F7A6B]/15 text-white"
                            : "text-[#A1A1AA] hover:bg-[#1F7A6B]/10 hover:text-white"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
              </div>
            )}

            <div className="mt-3 border-t border-[#1F7A6B]/10 pt-3">
              {isLanding ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/login" className="w-full">
                    <Button size="sm" className="w-full">Connect Wallet</Button>
                  </Link>
                </div>
              ) : user ? (
                <div className="flex items-center justify-between rounded-lg border border-[#1F7A6B]/20 bg-[#0F2F2B]/20 px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{user.username}</span>
                    <span className="text-[10px] font-medium text-[#A3E635]">LVL {user.level}</span>
                  </div>
                  <img src={user.avatar} alt="Avatar" className="h-8 w-8 rounded-full border border-[#1F7A6B]/20" />
                </div>
              ) : (
                <Link to="/login" className="w-full">
                  <Button size="sm" className="w-full">Connect Wallet</Button>
                </Link>
              )}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 flex-grow pb-20 pt-28">
        <div className={contentShellClass}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
