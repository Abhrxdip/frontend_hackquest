import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestsPage } from "./pages/QuestsPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ActivityPage } from "./pages/ActivityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AchievementsPage } from "./pages/AchievementsPage";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
