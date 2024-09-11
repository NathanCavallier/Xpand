
// Model User
export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    bio: string;
    created_at: string;
    updated_at: string;
};

// Model challenges
export interface challenges {
    id: number;
    title: string;
    description: string;
    image_url: string;
    points: number;
    difficulty_level: string;
    category: string;
    created_at: string;
    updated_at: string;
};

// Model UserLogin
export interface UserLogin {
    email: string;
    password: string;
};

// Model UserRegister
export interface UserRegister {
    name: string;
    email: string;
    password: string;
};

// Model games
export interface games {
    id: number;
    name: string;
    image: string;
    description: string;
    category: string;
    max_players: number;
    min_players: number;
    created_at: string;
    updated_at: string;
};

// Model user_progress
export interface user_progress {
    id: number;
    user_id: number;
    challenge_id: number;
    game_id: number;
    progress_percentage: number;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

// Model statistics
export interface statistics {
    id: number;
    user_id: number;
    game_id: number;
    challenge_id: number;
    total_time_spent: number;
    score: number;
    attempts: number;
    total_challenges_completed: number;
    total_games_played: number;
    created_at: string;
};

