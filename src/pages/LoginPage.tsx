import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Wallet, LogIn } from "lucide-react";

type WalletProvider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey?: { toString: () => string } }>;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [walletError, setWalletError] = useState("");
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const { dispatch } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedUsername = username.trim();
    if (!cleanedUsername) return;

    setWalletError("");
    dispatch({
      type: "LOGIN",
      payload: {
        id: `user-${Date.now()}`,
        username: cleanedUsername,
        avatar: `https://picsum.photos/seed/${encodeURIComponent(cleanedUsername)}/100/100`,
        xp: 0,
        level: 1,
        rank: 999,
      },
    });
    navigate("/dashboard");
  };

  const handleWalletLogin = async () => {
    setWalletError("");

    const provider = (window as Window & { solana?: WalletProvider }).solana;
    if (!provider?.isPhantom) {
      setWalletError("No wallet found. Install Phantom to continue.");
      return;
    }

    try {
      setIsConnectingWallet(true);
      const response = await provider.connect();
      const walletAddress = response.publicKey?.toString();

      if (!walletAddress) {
        setWalletError("Wallet connected, but no address was returned.");
        return;
      }

      const generatedUsername = `wallet_${walletAddress.slice(0, 4)}${walletAddress.slice(-4)}`;
      dispatch({
        type: "LOGIN",
        payload: {
          id: `wallet-${walletAddress}`,
          username: generatedUsername,
          avatar: `https://picsum.photos/seed/${encodeURIComponent(walletAddress)}/100/100`,
          xp: 0,
          level: 1,
          rank: 999,
          walletAddress,
        },
      });
      navigate("/dashboard");
    } catch {
      setWalletError("Wallet connection was cancelled or failed. Try again.");
    } finally {
      setIsConnectingWallet(false);
    }
  };

  return (
    <Layout>
      <section className="layout-shell-wide py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[34px] border border-[#1F7A6B]/20 bg-[#0A1715]/40 p-8 md:p-12 lg:p-14"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1F7A6B]/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#A3E635]/15 blur-[120px]" />

          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A3E635]">
              Access Protocol
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Connect Your Identity.
              <span className="block bg-gradient-to-r from-[#A3E635] via-[#8CF6B0] to-[#1F7A6B] bg-clip-text text-transparent">
                Enter The Arena.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
              Unlock your dashboard, quests, and on-chain achievements with a unified hacker profile built for high-velocity teams.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1F7A6B]/20 bg-[#050A0A]/60 p-5">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Active Builders</div>
              </div>
              <div className="rounded-2xl border border-[#1F7A6B]/20 bg-[#050A0A]/60 p-5">
                <div className="text-3xl font-bold text-[#A3E635]">24/7</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Live Challenges</div>
              </div>
              <div className="rounded-2xl border border-[#1F7A6B]/20 bg-[#050A0A]/60 p-5">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Uptime</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl lg:ml-auto"
        >
          <Card className="p-8 text-left sm:p-10 lg:p-12">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0F2F2B] via-[#1F7A6B] to-[#A3E635] shadow-2xl" />
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to HackQuest AI</h2>
                <p className="text-base text-zinc-400">Connect your identity to start your journey.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3 text-left">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your hacker name"
                  className="w-full rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 px-5 py-4 text-base font-medium text-white transition-all focus:border-[#A3E635]/50 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/20"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <LogIn className="mr-2 h-5 w-5" />
                Login with Username
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#161618] px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                size="lg"
                onClick={handleWalletLogin}
                disabled={isConnectingWallet}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isConnectingWallet ? "Connecting Wallet..." : "Login with Wallet"}
              </Button>

              {walletError && (
                <p className="text-sm font-medium text-[#F87171]">{walletError}</p>
              )}
            </form>

            <p className="mt-10 text-sm text-zinc-500">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </Card>
        </motion.div>
        </div>
      </section>
    </Layout>
  );
};
