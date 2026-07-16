import { supabase } from "@/integrations/supabase/client";
import UAParser from "ua-parser-js";

export const logAdminAction = async (action: string, details: any = {}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const parser = new UAParser();
    const result = parser.getResult();

    const logData = {
      user_id: user.id,
      action,
      ip_address: 'Logged via Client', // In a real app, you'd get this from an Edge Function
      device: `${result.os.name || 'Unknown'} ${result.device.model || ''}`,
      browser: `${result.browser.name} ${result.browser.version}`,
      details
    };

    await supabase.from('admin_activity_logs').insert([logData]);
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
};