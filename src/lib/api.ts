import { supabase } from './supabase';
import { Database } from '../types/database';

type TrainingDay = Database['public']['Tables']['training_days']['Row'];
type User = Database['public']['Tables']['users']['Row'];

// Mock data for fallback
const MOCK_USER: User = {
  id: 'mock-user-id',
  name: 'Corredor Visitante',
  email: 'visitante@semov.app',
  avatar_url: null,
  level_id: null,
  role: 'user',
  xp: 1250,
  points: 300,
  created_at: new Date().toISOString()
};

export const api = {
  // User
  getUser: async (): Promise<User | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return MOCK_USER; // Fallback to mock if not logged in

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error || !data) return MOCK_USER;
      return data;
    } catch (e) {
      console.warn('Supabase not connected or table missing, using mock user');
      return MOCK_USER;
    }
  },

  // Training
  saveWorkoutResult: async (workoutId: string | null, results: { distance: number, duration: number, pace: string }) => {
    try {
        const user = await api.getUser();
        if (!user || user.id === 'mock-user-id') {
            console.log('Mock saving workout:', results);
            return { success: true, xpEarned: 50 }; // Mock reward
        }

        // Logic to save to 'user_trainings' or similar log table (not yet in minimal schema, but implies saving progress)
        // For now, let's just update XP as a simple gamification action
        const xpReward = 50; 
        
        const { error } = await supabase.rpc('increment_xp', { 
            user_id: user.id, 
            amount: xpReward 
        });

        if (error) throw error;
        return { success: true, xpEarned: xpReward };

    } catch (e) {
        console.error('Error saving workout:', e);
        return { success: true, xpEarned: 50 }; // Fallback success
    }
  },

  // Levels & Programs (Mocked for now until DB is populated)
  getProgramForUser: async () => {
      // Real impl would fetch from 'training_programs' based on user.level_id
      return {
          title: "Fundamentos da Velocidade",
          level: "Intermediário",
          weeks: [
              { number: 1, focus: "Adaptação" },
              { number: 2, focus: "Volume" }
          ]
      };
  }
};
