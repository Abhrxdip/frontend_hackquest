import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { User, Quest, LeaderboardEntry, ActivityEvent, Achievement } from "../types";
import { MOCK_QUESTS, MOCK_LEADERBOARD, MOCK_ACTIVITY, MOCK_ACHIEVEMENTS } from "../constants";

interface State {
  user: User | null;
  quests: Quest[];
  leaderboard: LeaderboardEntry[];
  activity: ActivityEvent[];
  achievements: Achievement[];
}

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "COMPLETE_QUEST"; payload: string }
  | { type: "ADD_ACTIVITY"; payload: ActivityEvent }
  | { type: "UPDATE_LEADERBOARD"; payload: LeaderboardEntry[] };

const initialState: State = {
  user: null,
  quests: MOCK_QUESTS,
  leaderboard: MOCK_LEADERBOARD,
  activity: MOCK_ACTIVITY,
  achievements: MOCK_ACHIEVEMENTS,
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "COMPLETE_QUEST":
      const quest = state.quests.find((q) => q.id === action.payload);
      if (!quest || quest.completed) return state;

      const updatedQuests = state.quests.map((q) =>
        q.id === action.payload ? { ...q, completed: true } : q
      );

      const updatedUser = state.user
        ? {
            ...state.user,
            xp: state.user.xp + quest.xpReward,
            level: Math.floor((state.user.xp + quest.xpReward) / 1000) + 1,
          }
        : null;

      const newActivity: ActivityEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: "QUEST_COMPLETED",
        username: state.user?.username || "Anonymous",
        message: `completed '${quest.title}'`,
        timestamp: "Just now",
      };

      return {
        ...state,
        quests: updatedQuests,
        user: updatedUser,
        activity: [newActivity, ...state.activity],
      };
    case "ADD_ACTIVITY":
      return { ...state, activity: [action.payload, ...state.activity] };
    case "UPDATE_LEADERBOARD":
      return { ...state, leaderboard: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
