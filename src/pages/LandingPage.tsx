import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { cn } from "../lib/utils";
import { Zap, Trophy, Award, Activity, Swords, User, LayoutDashboard, Globe } from "lucide-react";

const APP_PREVIEWS = [
  {
    id: "dashboard",
    title: "Real-Time Dashboard",
    description: "Monitor your progress, track live activity, and manage your quests from a single, immersive interface.",
    icon: LayoutDashboard,
    color: "#1F7A6B",
    path: "/dashboard",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-2 w-24 bg-[#1F7A6B]/20 rounded-full" />
          <div className="h-6 w-6 rounded-full bg-[#A3E635]/20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 rounded-xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/10 p-4">
            <div className="h-1.5 w-12 bg-[#1F7A6B]/20 rounded-full mb-4" />
            <div className="space-y-2">
              <div className="h-1 w-full bg-[#1F7A6B]/10 rounded-full" />
              <div className="h-1 w-2/3 bg-[#1F7A6B]/10 rounded-full" />
            </div>
          </div>
          <div className="h-32 rounded-xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/10 p-4 flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-[#A3E635] border-t-transparent animate-spin-slow" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "quests",
    title: "Gamified Quests",
    description: "Dynamic challenges that reward your building progress in real-time. Complete tasks to earn XP.",
    icon: Swords,
    color: "#A3E635",
    path: "/quests",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6 flex flex-col justify-center gap-4">
        {[1, 2].map(i => (
          <div key={i} className="p-4 rounded-xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#1F7A6B]/20 flex items-center justify-center">
                <Swords className="h-4 w-4 text-[#A3E635]" />
              </div>
              <div className="h-2 w-24 bg-[#1F7A6B]/20 rounded-full" />
            </div>
            <div className="h-4 w-12 bg-[#A3E635]/20 rounded-full" />
          </div>
        ))}
      </div>
    )
  },
  {
    id: "leaderboard",
    title: "Global Leaderboard",
    description: "Compete globally and see where you stand against the world's best hackers.",
    icon: Trophy,
    color: "#F59E0B",
    path: "/leaderboard",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/10">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-zinc-800" />
                <div className="h-1.5 w-20 bg-[#1F7A6B]/20 rounded-full" />
              </div>
              <div className="h-1.5 w-12 bg-[#A3E635]/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "activity",
    title: "Live Activity Feed",
    description: "Stay updated with real-time events from the community. See who's leveling up.",
    icon: Activity,
    color: "#3B82F6",
    path: "/activity",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6">
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#A3E635]">
              <div className="h-1.5 w-full bg-[#1F7A6B]/10 rounded-full mb-2" />
              <div className="h-1 w-1/2 bg-[#1F7A6B]/5 rounded-full" />
            </div>
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
    color: "#A3E635",
    path: "/achievements",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6 flex items-center justify-center">
        <div className="h-32 w-24 bg-gradient-to-br from-[#134E4A] to-[#050A0A] border border-[#A3E635]/30 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(163,230,53,0.1)]">
          <Award className="h-10 w-10 text-[#A3E635] mb-2" />
          <div className="h-1 w-12 bg-[#A3E635]/20 rounded-full" />
        </div>
      </div>
    )
  },
  {
    id: "profile",
    title: "Hacker Profile",
    description: "Your unique identity in the HackQuest ecosystem. Track your level, XP, and badges.",
    icon: User,
    color: "#1F7A6B",
    path: "/profile",
    preview: (
      <div className="relative h-full w-full bg-[#050A0A] rounded-2xl border border-[#1F7A6B]/20 overflow-hidden p-6 text-center">
        <div className="mx-auto h-16 w-16 rounded-full border-2 border-[#A3E635] bg-zinc-800 mb-4" />
        <div className="mx-auto h-2 w-24 bg-[#1F7A6B]/20 rounded-full mb-6" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-8 rounded-lg bg-[#0F2F2B]/40 border border-[#1F7A6B]/10" />
          ))}
        </div>
      </div>
    )
  }
];

export const LandingPage = () => {
  const { state } = useAppContext();
  const nextRoute = (path: string) => (state.user ? path : "/login");

  return (
    <Layout>
      <div className="flex flex-col space-y-32 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] pt-12">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-45 sm:opacity-55"
            style={{ backgroundImage: "url('/bkg.jpeg')" }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050A0A]/35 via-[#050A0A]/55 to-[#050A0A]/85" />
          <div className="absolute -top-40 left-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#134E4A]/20 blur-[120px]" />
          
          <div className="relative z-10 grid grid-cols-1 gap-16 items-center lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#A3E635]">
                Season 1 is Live
              </div>
              <h1 className="mb-6 text-6xl font-bold leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl">
                Turn Hackathons Into <br />
                <span className="bg-gradient-to-r from-[#1F7A6B] via-[#A3E635] to-[#2563EB] bg-clip-text text-transparent">
                  Competitive Games.
                </span>
              </h1>
              <p className="mb-10 max-w-xl text-xl leading-relaxed text-[#A1A1AA]">
                Earn XP, climb leaderboards, and unlock achievements across chains. 
                The ultimate meta-game for the modern developer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg">Enter Arena</Button>
                </Link>
                <Link to={nextRoute("/quests")}>
                  <Button variant="secondary" size="lg">
                    Explore Quests
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <Card className="p-0 overflow-hidden border-[#1F7A6B]/30 shadow-[0_0_50px_rgba(31,122,107,0.1)]">
                <div className="bg-[#0F2F2B]/40 p-6 border-b border-[#1F7A6B]/20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#A3E635]/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-[#A3E635]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Current Progress</div>
                        <div className="text-lg font-bold text-white">Level 14 Hacker</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#A3E635]">+250 XP</div>
                      <div className="text-[10px] font-bold text-[#A1A1AA] uppercase">Quest Completed</div>
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
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#050A0A]/40 border border-[#1F7A6B]/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#1F7A6B]/20 flex items-center justify-center text-xs font-bold">#{i}</div>
                        <div className="h-8 w-8 rounded-full bg-zinc-800" />
                        <div className="text-sm font-medium">Hacker_{i}42</div>
                      </div>
                      <div className="text-sm font-bold text-[#A3E635]">{5000 - i * 400} XP</div>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#A3E635]/10 blur-3xl animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-8">
            Used in Hackathons by developers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Solana", "Algorand", "Devpost", "ETHGlobal", "Major League Hacking"].map((name) => (
              <span key={name} className="text-xl font-black tracking-tighter text-[#A1A1AA]">{name}</span>
            ))}
          </div>
        </section>

        {/* App Previews Section */}
        <section className="space-y-32">
          {APP_PREVIEWS.map((app, i) => (
            <div 
              key={app.id} 
              id={app.id}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-24 items-center",
                i % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={i % 2 !== 0 ? "lg:order-2" : ""}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2F2B] border border-[#1F7A6B]/20 text-[#A3E635]">
                  <app.icon className="h-6 w-6" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                  {app.title}
                </h2>
                <p className="text-xl text-[#A1A1AA] leading-relaxed mb-10">
                  {app.description}
                </p>
                <Link to={nextRoute(app.path)}>
                  <Button variant="secondary" size="lg">
                    Explore {app.title.split(' ').pop()}
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={cn(
                  "relative aspect-square lg:aspect-video",
                  i % 2 !== 0 ? "lg:order-1" : ""
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#134E4A]/10 to-transparent rounded-[32px] -z-10" />
                <Card className="h-full w-full p-8 border-[#1F7A6B]/20 bg-[#0B0F0F]/50 backdrop-blur-sm overflow-hidden">
                  {app.preview}
                </Card>
                <div 
                  className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full blur-[120px] opacity-20 -z-20"
                  style={{ backgroundColor: app.color }}
                />
              </motion.div>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="relative py-24 text-center overflow-hidden rounded-[48px] border border-[#1F7A6B]/20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2F2B]/20 to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#A3E635]/5 blur-[120px] -z-10" />
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Ready to Level Up <br />
            <span className="text-[#A3E635]">Your Hackathon?</span>
          </h2>
          <p className="text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto">
            Join thousands of developers competing in the world's first hackathon meta-game. 
            Build, earn, and climb.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/login">
              <Button size="lg">Join Now</Button>
            </Link>
            <Link to={nextRoute("/dashboard")}>
              <Button variant="secondary" size="lg">Explore Demo</Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};
