import e from "express";

// Model User
export interface User {
    id: number;
    name: string;
    email: string;
    profilePic: string;
};

export interface UserLogin {
    email: string;
    password: string;
};

export interface UserRegister {
    name: string;
    email: string;
    password: string;
};

// Model challenges
export interface challenges {
    id: number;
    name: string;
    description: string;
    image: string;
    reward: string;
    points: number;
};

// Model Challenge
export interface Challenge {
    id: number;
    challenger: User;
    challenged: User;
    status: 'pending' | 'accepted' | 'rejected';
    scoreChallenger: number;
    scoreChallenged: number;
};

// Model Game
interface Game {
    id: number;
    name: string;
    description: string;
    image: string;
};

// Model GameResult
interface GameResult {
    id: number;
    user: User;
    game: Game;
    score: number;
};

// Model Stats
export interface Stats {
    user: User;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesDraw: number;
    totalScore: number;
};

// Model Leaderboard
export interface Leaderboard {
    user: User;
    score: number;
};

// Model UserStats
export interface UserStats {
    user: User;
    stats: Stats;
};

// Model UserLeaderboard
export interface UserLeaderboard {
    user: User;
    leaderboard: Leaderboard;
};

// Model UserChallenges
export interface UserChallenges {
    user: User;
    challenges: Challenge[];
};

// Model UserGameResults
export interface UserGameResults {
    user: User;
    gameResults: GameResult[];
};

// Model UserStatsLeaderboard
export interface UserStatsLeaderboard {
    user: User;
    stats: Stats;
    leaderboard: Leaderboard;
};

// Model UserStatsChallenges
export interface UserStatsChallenges {
    user: User;
    stats: Stats;
    challenges: Challenge[];
};

// Model UserStatsGameResults
export interface UserStatsGameResults {
    user: User;
    stats: Stats;
    gameResults: GameResult[];
};
