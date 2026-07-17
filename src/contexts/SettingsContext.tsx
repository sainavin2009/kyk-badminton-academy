"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings, Program, ContactInfo } from '@/types/settings';

interface SettingsContextType {
  settings: SiteSettings | null;
  contactInfo: ContactInfo | null;
  programs: Program[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  contactInfo: null,
  programs: [],
  loading: true,
  refresh: async () => {},
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [settingsRes, contactRes, programsRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
        supabase.from('contact_information').select('*').eq('id', 1).maybeSingle(),
        supabase.from('programs').select('*').order('order_index', { ascending: true })
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (contactRes.data) setContactInfo(contactRes.data);
      if (programsRes.data) setPrograms(programsRes.data);
    } catch (error) {
      console.error('Error fetching CMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const settingsSub = supabase
      .channel('settings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchData)
      .subscribe();

    const contactSub = supabase
      .channel('contact-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_information' }, fetchData)
      .subscribe();

    const programsSub = supabase
      .channel('programs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'programs' }, fetchData)
      .subscribe();

    return () => {
      settingsSub.unsubscribe();
      contactSub.unsubscribe();
      programsSub.unsubscribe();
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, contactInfo, programs, loading, refresh: fetchData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);