
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

// Model friends
export interface friends {
    id: number;
    user_id: number;
    friend_id: number;
    created_at: string;
};

// Model friend_requests
export interface friend_requests {
    id: number;
    user_id: number;
    sender_id: number;
    receiver_id: number;
    status: string; // pending, accepted, declined
    created_at: string;
};

// Model messages
export interface messages {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    sent_at: string;
};

// Model posts
export interface posts {
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    updated_at: string;
};

// Model comments
export interface comments {
    id: number;
    user_id: number;
    post_id: number;
    content: string;
    created_at: string;
    updated_at: string;
};

// Model likes
export interface likes {
    id: number;
    post_id: number;
    comment_id: number;
    user_id: number;
    created_at: string;
};

// Model courses
export interface courses {
    id: number;
    title: string;
    image_url: string;
    description: string;
    category: string;
    difficulty_level: string;
    created_at: string;
    updated_at: string;
};

// Model lessons
export interface lessons {
    id: number;
    course_id: number;
    title: string;
    content: string;
    image_url: string;
    video_url: string;
    created_at: string;
    updated_at: string;
};

// Model user_courses
export interface user_courses {
    id: number;
    user_id: number;
    course_id: number;
    lesson_id: number;
    progress_percentage: number;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

// Model rewards
export interface rewards {
    id: number;
    user_id: number;
    challenge_id: number;
    game_id: number;
    reward_type: string;
    points_awarded: number;
    created_at: string;
};

// Model events
export interface events {
    id: number;
    name: string;
    image_url: string;
    location: string;
    description: string;
    start_date: Date;
    end_date: Date;
    created_at: string;
};

// Model event_rewards
export interface event_rewards {
    id: number;
    user_id: number;
    event_id: number;
    reward_type: string;
    points_awarded: number;
    created_at: string;
};

// Model event_participants
export interface event_participants {
    id: number;
    user_id: number;
    event_id: number;
    participation_status: string; // pending, accepted, declined
    created_at: string;
};

// Model badges
export interface badges {
    id: number;
    user_id: number;
    badge_type: string;
    created_at: string;
};

// Model user_badges
export interface user_badges {
    id: number;
    user_id: number;
    badge_id: number;
    obtained_at: string;
};

// Model notifications
export interface notifications {
    id: number;
    user_id: number;
    image_url: string; // avatar_url
    type: string; // friend_request, message, post, comment, like, reward, event, badge
    content: string;
    is_read: boolean;
    created_at: string;
};


// Model user_settings
export interface user_settings {
    id: number;
    user_id: number;
    notifications_enabled: boolean;
    email_notifications: boolean;
    push_notifications: boolean;
    dark_mode: string; // light, dark
    language: string; // en, fr, es
    privacy_level: string; // public, private
    created_at: string;
    updated_at: string;
};
