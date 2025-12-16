export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string | null
          avatar_url: string | null
          level_id: string | null
          role: string
          xp: number
          points: number
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          level_id?: string | null
          role?: string
          xp?: number
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          level_id?: string | null
          role?: string
          xp?: number
          points?: number
          created_at?: string
        }
      }
      levels: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      training_programs: {
        Row: {
          id: string
          level_id: string | null
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          level_id?: string | null
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          level_id?: string | null
          title?: string
          description?: string | null
          created_at?: string
        }
      }
      training_weeks: {
        Row: {
          id: string
          program_id: string | null
          week_number: number
          focus: string | null
          created_at: string
        }
        Insert: {
          id?: string
          program_id?: string | null
          week_number: number
          focus?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          program_id?: string | null
          week_number?: number
          focus?: string | null
          created_at?: string
        }
      }
      training_days: {
        Row: {
          id: string
          week_id: string | null
          day_number: number
          workout_description: string | null
          duration: number | null
          distance: number | null
          xp_reward: number
          point_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          week_id?: string | null
          day_number: number
          workout_description?: string | null
          duration?: number | null
          distance?: number | null
          xp_reward?: number
          point_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          week_id?: string | null
          day_number?: number
          workout_description?: string | null
          duration?: number | null
          distance?: number | null
          xp_reward?: number
          point_reward?: number
          created_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          topic_id: string | null
          title: string
          video_url: string
          description: string | null
          duration_seconds: number | null
          xp_reward: number
          point_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          topic_id?: string | null
          title: string
          video_url: string
          description?: string | null
          duration_seconds?: number | null
          xp_reward?: number
          point_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          topic_id?: string | null
          title?: string
          video_url?: string
          description?: string | null
          duration_seconds?: number | null
          xp_reward?: number
          point_reward?: number
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string | null
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          xp_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          xp_reward?: number
          created_at?: string
        }
      }
    }
  }
}
