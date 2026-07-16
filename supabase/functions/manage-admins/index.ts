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
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), { status: 401, headers: corsHeaders })
    }

    // Verify caller is a Super Admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'Super Admin') {
      return new Response(JSON.stringify({ error: 'Forbidden: Super Admin access required' }), { status: 403, headers: corsHeaders })
    }

    const { action, userData, userId, newPassword } = await req.json()

    if (action === 'create') {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: { full_name: userData.full_name }
      })

      if (createError) throw createError

      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: newUser.user.id,
          full_name: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          status: userData.status,
          avatar_url: userData.avatar_url
        })

      if (profileError) throw profileError
      return new Response(JSON.stringify({ success: true, user: newUser.user }), { headers: corsHeaders })
    }

    if (action === 'update') {
      const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        email: userData.email
      })
      if (authUpdateError) throw authUpdateError

      const { error: profileUpdateError } = await supabaseAdmin
        .from('profiles')
        .update({
          full_name: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          status: userData.status,
          avatar_url: userData.avatar_url
        })
        .eq('id', userId)

      if (profileUpdateError) throw profileUpdateError
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    if (action === 'delete') {
      // Prevent deleting the last Super Admin logic happens in frontend, but we double check here
      const { data: superAdmins } = await supabaseAdmin.from('profiles').select('id').eq('role', 'Super Admin')
      if (superAdmins?.length === 1 && superAdmins[0].id === userId) {
        throw new Error("Cannot delete the last Super Admin account.")
      }

      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
      if (deleteError) throw deleteError
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    if (action === 'reset_password') {
      const { error: resetError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword
      })
      if (resetError) throw resetError
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: corsHeaders })

  } catch (error: any) {
    console.error("[manage-admins]", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders })
  }
})