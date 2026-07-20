import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * Requires a bucket named 'media' to be created in your Supabase project.
 */
export const uploadImage = async (file: File, bucket: string = 'media') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};