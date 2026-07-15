import { supabase } from '@/lib/supabase';
import { Program, GalleryImage, ContactFormData } from '@/types';

export const apiService = {
  // Programs
  getPrograms: async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getFeaturedPrograms: async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Gallery
  getGalleryImages: async (): Promise<GalleryImage[]> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Contact
  submitContactForm: async (formData: ContactFormData): Promise<void> => {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);
    
    if (error) throw error;
  },

  // Auth
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};