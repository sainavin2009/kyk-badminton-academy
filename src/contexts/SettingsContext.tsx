"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings, Program, ContactInformation } from '@/types/settings';

interface SettingsContextType {
  settings: SiteSettings | null;
  programs: Program[];
  contactInfo: ContactInformation | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  programs: [],
  contactInfo: null,
  loading: true,
  refresh: async () => {},
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [settingsRes, programsRes, contactRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('programs').select('*').order('order_index', { ascending: true }),
        supabase.from('contact_information').select('*').eq('id', 1).single()
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (programsRes.data) setPrograms(programsRes.data);
      if (contactRes.data) setContactInfo(contactRes.data);
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

    const contactSub = supabase
      .channel('contact-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_information' }, fetchData)
      .subscribe();

    return () => {
      settingsSub.unsubscribe();
      programsSub.unsubscribe();
      contactSub.unsubscribe();
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, programs, contactInfo, loading, refresh: fetchData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);