"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings, Program } from '@/types/settings';

interface SettingsContextType {
  settings: SiteSettings | null;
  programs: Program[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  programs: [],
  loading: true,
  refresh: async () => {},
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [settingsRes, programsRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('programs').select('*').order('order_index', { ascending: true })
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (programsRes.data) setPrograms(programsRes.data);
    } catch (error) {
      console.error('Error fetching CMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to changes
    const settingsSub = supabase
      .channel('settings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchData)
      .subscribe();

    const programsSub = supabase
      .channel('programs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'programs' }, fetchData)
      .subscribe();

    return () => {
      settingsSub.unsubscribe();
      programsSub.unsubscribe();
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, programs, loading, refresh: fetchData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);