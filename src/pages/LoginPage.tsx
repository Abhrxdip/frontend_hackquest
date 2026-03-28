import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { Wallet, LogIn } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would authenticate here
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="p-10 text-center">
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0F2F2B] via-[#1F7A6B] to-[#A3E635] shadow-2xl" />
              <h1 className="text-3xl font-bold tracking-tighter">Welcome to HackQuest</h1>
              <p className="text-sm text-zinc-400">Connect your identity to start your journey.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your hacker name"
                  className="w-full rounded-xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 px-4 py-3 text-sm font-medium text-white transition-all focus:border-[#A3E635]/50 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/20"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
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

              <Button variant="secondary" className="w-full" size="lg">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </form>

            <p className="mt-8 text-xs text-zinc-500">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};
