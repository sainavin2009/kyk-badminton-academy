import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Unauthorized')

    const token = authHeader.replace('Bearer ', '')
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !caller) throw new Error('Unauthorized')

    // Fetch caller's role to enforce server-side security
    const { data: callerProfile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', caller.id)
      .single()

    const callerRole = callerProfile?.role || ''

    if (!['Super Admin', 'Admin'].includes(callerRole)) {
      throw new Error('Forbidden: Insufficient permissions')
    }

    const { action, userData, userId, newPassword } = await req.json()

    // Create New Admin
    if (action === 'create') {
      // Permission Check: Admins can only create Staff
      if (callerRole === 'Admin' && userData.role !== 'Staff') {
        throw new Error('Restricted: Admins can only provision Staff accounts.')
      }

      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: { full_name: userData.full_name }
      })

      if (createError) throw createError

      await supabaseAdmin.from('profiles').upsert({
        id: newUser.user.id,
        full_name: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: 'Active'
      })

      await supabaseAdmin.from('admin_invites').insert({
        email: userData.email,
        role: userData.role,
        inviter_id: caller.id,
        status: 'Pending'
      })

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    // Delete Admin
    if (action === 'delete') {
      const { data: targetProfile } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      // Permission Check: Admins cannot delete Super Admins or other Admins
      if (callerRole === 'Admin' && ['Super Admin', 'Admin'].includes(targetProfile?.role)) {
        throw new Error('Restricted: Access termination denied.')
      }

      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
      if (deleteError) throw deleteError

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    // Reset Password
    if (action === 'reset_password') {
      if (callerRole !== 'Super Admin') {
        throw new Error('Restricted: Password rotation reserved for Super Administrators.')
      }

      const { error: resetError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword
      })

      if (resetError) throw resetError

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: corsHeaders })

  } catch (error: any) {
    console.error("[manage-admins]", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 403, headers: corsHeaders })
  }
})