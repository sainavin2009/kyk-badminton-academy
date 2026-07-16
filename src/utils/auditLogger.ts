import { supabase } from "@/integrations/supabase/client";

export const logAdminAction = async (action: string, details: any = {}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const ua = navigator.userAgent;
    let browser = "Unknown";
    let device = "Desktop";

    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("SamsungBrowser")) browser = "Samsung Browser";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
    else if (ua.includes("Edge")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";

    if (/Mobi|Android/i.test(ua)) device = "Mobile";
    if (/Tablet|iPad/i.test(ua)) device = "Tablet";

    const logData = {
      user_id: user.id,
      action,
      ip_address: 'Client Connection',
      device: device,
      browser: browser,
      details: {
        ...details,
        timestamp: new Date().toISOString()
      }
    };

    // Standardized table name used in backend and frontend
    await supabase.from('admin_activity_logs').insert([logData]);
  } catch (error) {
    console.error("Audit Log Failure:", error);
  }
};