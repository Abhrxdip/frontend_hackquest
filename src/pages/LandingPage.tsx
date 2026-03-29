import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { cn } from "../lib/utils";
import { Zap, Trophy, Award, Activity, Swords, User, LayoutDashboard, Globe } from "lucide-react";

const StatBox = ({ label, value, sub, delay = 0 }: { label: string, value: string, sub: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="h-full rounded-xl bg-[#00FF9F]/[0.02] border border-[#00FF9F]/5 p-4 group-hover:border-[#00FF9F]/20 transition-colors"
  >
    <div className="text-[10px] font-black text-[#00FF9F]/40 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-2xl font-black text-white mb-1">{value}</div>
    <div className="text-[10px] text-zinc-500 font-bold">{sub}</div>
  </motion.div>
);

const MiniChart = () => (
  <div className="h-24 w-full relative flex items-end gap-1 px-2">
    {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-t from-[#00FF9F]/40 to-[#00FF9F] rounded-t-sm"
      />
    ))}
  </div>
);

const LiveActivityRow = ({ i }: { i: number }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-[#00FF9F]/[0.02] border border-[#00FF9F]/5 mb-3">
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-2">
        <div className="absolute inset-0 rounded-full animate-ping bg-[#00FF9F]/40" />
        <div className="relative h-full w-full rounded-full bg-[#00FF9F]" />
      </div>
      <div className="h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden relative">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF9F]/40 to-transparent"
        />
      </div>
    </div>
    <div className="text-[10px] font-black text-[#00FF9F] opacity-60">NODE_AUTH_{i * 4}2</div>
  </div>
);

const APP_PREVIEWS = [
  {
    id: "dashboard",
    title: "Real-Time Dashboard",
    description: "Monitor your progress, track live activity, and manage your quests from a single, immersive interface.",
    icon: LayoutDashboard,
    color: "#00FF9F",
    path: "/dashboard",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[10px] font-black text-[#00FF9F] tracking-[0.3em] uppercase">System_Overview</div>
          <div className="flex gap-1">
            <div className="h-1 w-4 bg-[#00FF9F] rounded-full" />
            <div className="h-1 w-2 bg-[#00FF9F]/20 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatBox label="Accuracy" value="98.6%" sub="+2.4% vs last epoch" delay={0.1} />
          <StatBox label="Latency" value="12ms" sub="Global optimal" delay={0.2} />
        </div>
        <MiniChart />
      </div>
    )
  },
  {
    id: "quests",
    title: "Gamified Quests",
    description: "Dynamic challenges that reward your building progress in real-time. Complete tasks to earn XP.",
    icon: Swords,
    color: "#00FF9F",
    path: "/quests",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6 flex flex-col justify-center">
        <div className="text-[10px] font-black text-[#00FF9F]/40 tracking-widest uppercase mb-4">Active_Missions</div>
        {[1, 2, 3].map(i => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-[#00FF9F]/[0.02] border border-[#00FF9F]/5 flex items-center justify-between mb-3 last:mb-0 group/item"
          >
            <div className="flex items-center gap-3">
              <Swords className="h-4 w-4 text-[#00FF9F]" />
              <div className="h-1.5 w-20 bg-zinc-800 rounded-full" />
            </div>
            <div className="text-[10px] font-black text-[#00FF9F]">+{i * 500} XP</div>
          </motion.div>
        ))}
      </div>
    )
  },
  {
    id: "leaderboard",
    title: "Global Leaderboard",
    description: "Compete globally and see where you stand against the world's best hackers.",
    icon: Trophy,
    color: "#00FF9F",
    path: "/leaderboard",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6">
        <div className="flex items-end justify-between mb-8 h-32">
          {[60, 100, 40].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-full bg-zinc-800 border border-[#00FF9F]/20" />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "circOut" }}
                className="w-full bg-[#00FF9F]/10 border-t border-[#00FF9F]/40 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-[#00FF9F] shadow-[0_0_10px_#00FF9F]" />
              </motion.div>
            </div>
          ))}
        </div>
        <div className="text-center text-[10px] font-black text-white/40 uppercase tracking-widest">Global_Ranking_Sync</div>
      </div>
    )
  },
  {
    id: "activity",
    title: "Live Activity Feed",
    description: "Stay updated with real-time events from the community. See who's leveling up.",
    icon: Activity,
    color: "#00FF9F",
    path: "/activity",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-black text-[#00FF9F] uppercase tracking-widest">Live_Logs</div>
          <div className="h-1.5 w-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4].map(i => (
            <LiveActivityRow key={i} i={i} />
          ))}
        </div>
      </div>
    )
  },
  {
    id: "achievements",
    title: "NFT Achievements",
    description: "Your wins are minted as permanent proof of skill on-chain. Verified on Solana and Algorand.",
    icon: Award,
    color: "#00FF9F",
    path: "/achievements",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6 flex items-center justify-center">
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative h-40 w-32 [transform-style:preserve-3d]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9F]/20 to-transparent border border-[#00FF9F]/30 rounded-xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,255,159,0.1)] backdrop-blur-sm">
            <Award className="h-12 w-12 text-[#00FF9F] mb-3 drop-shadow-[0_0_10px_#00FF9F]" />
            <div className="h-1 w-16 bg-[#00FF9F]/40 rounded-full" />
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "profile",
    title: "Hacker Profile",
    description: "Your unique identity in the HackQuest ecosystem. Track your level, XP, and badges.",
    icon: User,
    color: "#00FF9F",
    path: "/profile",
    preview: (
      <div className="relative h-full w-full bg-[#05070A] rounded-2xl border border-[#00FF9F]/10 overflow-hidden p-6 flex flex-col items-center justify-center text-center">
        <div className="relative mb-4">
          <div className="h-20 w-20 rounded-full border-2 border-[#00FF9F] bg-zinc-900 p-1">
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-[#00FF9F]/20 to-transparent" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#00FF9F] text-[#05070A] text-[8px] font-black px-1.5 py-0.5 rounded-full">LVL_24</div>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-[#00FF9F] shadow-[0_0_10px_#00FF9F]" 
          />
        </div>
        <div className="grid grid-cols-4 gap-2 w-full px-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square rounded-lg bg-zinc-900 border border-[#00FF9F]/5" />
          ))}
        </div>
      </div>
    )
  },
];

const FloatingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className={cn("absolute rounded-full blur-[100px] pointer-events-none", className)}
  />
);

const FadeInWhenVisible = ({ children, delay = 0, y = 20, blur = true }: { children: React.ReactNode; delay?: number; y?: number; blur?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y, scale: 0.98, filter: blur ? "blur(10px)" : "none" }}
    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const NeuralLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#00FF9F" fillOpacity="0.3" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00FF9F" strokeWidth="0.2" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural-grid)" />
      <motion.path
        d="M -100 100 Q 200 300 500 100 T 1200 400"
        fill="none"
        stroke="url(#green-gradient)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00FF9F" stopOpacity="0" />
        <stop offset="50%" stopColor="#00FF9F" stopOpacity="1" />
        <stop offset="100%" stopColor="#00FF9F" stopOpacity="0" />
      </linearGradient>
    </svg>
  </div>
);

export const LandingPage = () => {
  const { state } = useAppContext();
  const nextRoute = (path: string) => (state.user ? path : "/login");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Hero Parallax Transforms
  const heroX = useSpring(useTransform(mouseX, [0, 1200], [15, -15]), { stiffness: 50, damping: 20 });
  const heroY = useSpring(useTransform(mouseY, [0, 800], [15, -15]), { stiffness: 50, damping: 20 });

  return (
    <Layout>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF9F] via-[#00FFA3] to-[#041B10] origin-left z-[100]"
        style={{ scaleX }}
      />

      <div 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative flex w-full flex-col space-y-28 overflow-x-hidden bg-[#05070A] pb-40 selection:bg-[#00FF9F]/30 md:space-y-52 lg:space-y-72"
      >
        <NeuralLines />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[60]" />
        
        {/* System Scanline */}
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[20vh] bg-gradient-to-b from-transparent via-[#00FF9F]/5 to-transparent pointer-events-none z-[61]"
        />

        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden py-20 md:py-28 xl:py-32">
          <FloatingOrb className="bg-[#00FF9F]/10 h-[600px] w-[800px] -top-40 left-1/2 -translate-x-1/2" delay={0} />
          <FloatingOrb className="bg-[#00FFA3]/5 h-[400px] w-[400px] top-20 right-[10%]" delay={1} />

          <div className="layout-shell-ultra">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:justify-between lg:gap-24 xl:gap-32">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: heroX, y: heroY }}
              className="max-w-4xl lg:max-w-none"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF9F]/20 bg-[#00FF9F]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00FF9F] shadow-[0_0_15px_rgba(0,255,159,0.1)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9F]"></span>
                </span>
                AI Node Season 1 is Live
              </motion.div>
              
              <div className="mb-8 overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: [0, 1, 0.8, 1],
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl 2xl:text-8xl"
                >
                  Turn Hackathons Into <br />
                  <span className="bg-gradient-to-r from-[#00FF9F] via-[#00FFA3] to-[#041B10] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,159,0.2)]">
                    Competitive Games.
                  </span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12 max-w-3xl text-xl leading-relaxed text-zinc-300/85 md:text-2xl"
              >
                Earn XP, climb leaderboards, and unlock achievements across chains. 
                The ultimate meta-game for the modern developer.
              </motion.p>

              <div className="flex flex-wrap gap-5">
                <Link to="/login">
                  <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="relative overflow-hidden border-none bg-[#00FF9F] px-10 font-black text-[#05070A] shadow-[0_0_30px_rgba(0,255,159,0.4)] hover:bg-[#00FFA3]"
                    >
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                      />
                      Enter Arena
                    </Button>
                  </motion.div>
                </Link>
                <Link to={nextRoute("/quests")}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group">
                    <Button variant="secondary" size="lg" className="border-[#00FF9F]/20 bg-white/5 px-10 text-base text-white backdrop-blur-md transition-all hover:bg-[#00FF9F]/10">
                      Explore Quests
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-xl [perspective:1200px] lg:ml-auto lg:max-w-none lg:translate-x-10 xl:translate-x-16"
            >
              <motion.div
                style={{ 
                  rotateX: useSpring(useTransform(mouseY, [0, 800], [8, -8])),
                  rotateY: useSpring(useTransform(mouseX, [0, 1200], [-10, 10])),
                }}
                className="origin-center lg:origin-right lg:scale-[1.06] xl:scale-[1.1]"
              >
                <Card 
                  className="overflow-hidden border-white/10 bg-zinc-900/50 p-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="border-b border-[#1F7A6B]/20 bg-[#0F2F2B]/40 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#A3E635]/20 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-[#A3E635]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold uppercase tracking-wider text-[#A1A1AA]">Current Progress</div>
                          <div className="text-2xl font-bold text-white">Level 14 Hacker</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#A3E635]">+250 XP</div>
                        <div className="text-[11px] font-bold uppercase text-[#A1A1AA]">Quest Completed</div>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-[#050A0A] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#1F7A6B] to-[#A3E635]" 
                      />
                    </div>
                  </div>
                  <div className="space-y-5 p-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between rounded-2xl border border-[#1F7A6B]/10 bg-[#050A0A]/40 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F7A6B]/20 text-sm font-bold">#{i}</div>
                          <div className="h-8 w-8 rounded-full bg-zinc-800" />
                          <div className="text-base font-semibold">Hacker_{i}42</div>
                        </div>
                        <div className="text-base font-bold text-[#A3E635]">{5000 - i * 400} XP</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse pointer-events-none" />
            </motion.div>
          </div>
          </div>
        </section>

        {/* Social Proof */}
        <FadeInWhenVisible y={40}>
        <section className="layout-shell-wide py-16 text-center md:py-24">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-[#6B7280]">
            Used in Hackathons by developers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {["Solana", "Algorand", "Devpost", "ETHGlobal", "Major League Hacking"].map((name) => (
              <span key={name} className="cursor-default text-2xl font-black tracking-tighter text-white transition-all hover:scale-110 hover:text-[#00FF9F] md:text-3xl">{name}</span>
            ))}
          </div>
        </section>
        </FadeInWhenVisible>

        {/* App Previews Section */}
        <section className="layout-shell-wide space-y-36 md:space-y-56 lg:space-y-72">
          {APP_PREVIEWS.map((app, i) => (
            <div 
              key={app.id} 
              id={app.id}
              className={cn(
                "grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-28 xl:gap-32",
                i % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-150px" }}
                className={cn(i % 2 !== 0 ? "lg:order-2" : "", "text-center lg:text-left")}
              >
                <div className="mx-auto mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00FF9F]/20 bg-zinc-900 text-[#00FF9F] shadow-[0_0_20px_rgba(0,255,159,0.1)] lg:mx-0">
                  <app.icon className="h-7 w-7" />
                </div>
                <h2 className="mb-9 text-4xl font-bold leading-tight tracking-tighter text-white md:text-5xl lg:text-7xl">
                  {app.title}
                </h2>
                <p className="mx-auto mb-11 max-w-2xl text-xl leading-relaxed text-zinc-400 md:text-2xl lg:mx-0">
                  {app.description}
                </p>
                <Link to={nextRoute(app.path)}>
                  <Button variant="secondary" size="lg" className="flex items-center gap-2 border-[#00FF9F]/10 px-10 text-base text-white transition-all hover:gap-4 hover:border-[#00FF9F]/30 hover:bg-[#00FF9F]/5">
                    Explore {app.title.split(' ').pop()}
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: i % 2 === 0 ? 10 : -10 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative aspect-[5/4] cursor-pointer [perspective:1500px] lg:aspect-[16/10]",
                  i % 2 !== 0 ? "lg:order-1" : ""
                )}
              >
                <motion.div 
                  whileHover={{ rotateX: 8, rotateY: i % 2 === 0 ? -8 : 8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="h-full w-full"
                >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9F]/20 to-transparent rounded-[32px] -z-10 transition-all duration-700 group-hover:scale-[1.1] group-hover:rotate-3 group-hover:blur-3xl opacity-0 group-hover:opacity-100" />
                <Card className="relative h-full w-full overflow-hidden border-[#00FF9F]/10 bg-[#05070A]/50 p-10 shadow-2xl backdrop-blur-3xl transition-colors group-hover:border-[#00FF9F]/30">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-[#00FF9F]/5 to-transparent pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {app.preview}
                </Card>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <FadeInWhenVisible y={50}>
        <section className="layout-shell-wide">
        <div className="relative overflow-hidden rounded-[36px] border border-[#00FF9F]/10 bg-[#00FF9F]/[0.02] px-6 py-24 text-center backdrop-blur-md md:rounded-[52px] md:px-14 md:py-32">
          <FloatingOrb className="bg-[#00FF9F]/10 h-[500px] w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={0} />
          
          <h2 className="mb-9 text-5xl font-bold tracking-tighter text-white md:text-7xl xl:text-8xl">
            Initiate High-Velocity <br />
            <span className="bg-gradient-to-r from-[#00FF9F] via-[#00FFA3] to-[#041B10] bg-clip-text text-transparent">Hackathon Intel.</span>
          </h2>
          <p className="mx-auto mb-14 max-w-3xl px-4 text-xl leading-relaxed text-zinc-400 md:text-2xl">
            The system is online. Thousands of builders are already synced. 
            Join the neural network of modern development.
          </p>
          <div className="flex justify-center gap-8">
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.1, rotate: 1 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group relative overflow-hidden bg-[#00FF9F] px-12 font-black text-[#05070A] shadow-2xl shadow-[#00FF9F]/30 hover:bg-[#00FFA3]">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Initialize Journey
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
        </section>
        </FadeInWhenVisible>
      </div>
    </Layout>
  );
};
