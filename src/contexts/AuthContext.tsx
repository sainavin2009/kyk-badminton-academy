"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'Super Admin' | 'Admin' | 'Staff';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    console.group(`[AuthAudit] Profile Sync - ${new Date().toLocaleTimeString()}`);
    console.log("Current Auth User ID:", userId);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Profile Fetch Error:", error.message);
        console.log("Attempting to auto-create missing profile...");
        
        // Auto-recovery: If profile missing, create it
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .upsert({ 
              id: userId, 
              email: userData.user.email,
              role: 'Staff', // Default, should be updated via SQL for Super Admin
              status: 'Active'
            })
            .select()
            .single();
            
          if (!createError) {
            console.log("Auto-created missing profile:", newProfile);
            setProfile(newProfile);
          }
        }
      } else {
        console.log("Profile Data Received:", {
          db_id: data.id,
          db_email: data.email,
          db_role: data.role,
          db_status: data.status
        });
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected Auth Error:", err);
    } finally {
      console.groupEnd();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Auth Init Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[AuthAudit] Event: ${event}`);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);