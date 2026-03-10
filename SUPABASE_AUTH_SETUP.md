# Supabase Google OAuth Setup Guide

Your application is now configured to use Supabase for Google authentication! Follow these steps to complete the setup:

## ✅ What's Already Done

- ✅ Supabase client configured and connected
- ✅ AuthContext updated to use Supabase authentication
- ✅ ProtectedRoute component updated with Supabase auth
- ✅ App.tsx cleaned up (removed @react-oauth/google dependency)
- ✅ Loading states and session persistence implemented

## 🔧 Required Setup Steps

### Step 1: Configure Google OAuth in Supabase

1. **Go to your Supabase Dashboard:**
   - Navigate to: https://supabase.com/dashboard/project/bgsddltmsqdjytllpijm
   - Go to **Authentication** → **Providers**

2. **Enable Google Provider:**
   - Find "Google" in the list of providers
   - Toggle it to **Enabled**

3. **Get Google OAuth Credentials:**
   You need to create OAuth credentials in Google Cloud Console:

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Go to **APIs & Services** → **Credentials**
   
   d. Click **Create Credentials** → **OAuth client ID**
   
   e. Configure the OAuth consent screen if prompted
   
   f. Select **Web application** as the application type
   
   g. Add these **Authorized redirect URIs**:
      ```
      https://bgsddltmsqdjytllpijm.supabase.co/auth/v1/callback
      ```
   
   h. Click **Create** and copy your:
      - **Client ID**
      - **Client Secret**

4. **Add Credentials to Supabase:**
   - Back in Supabase Dashboard → Authentication → Providers → Google
   - Paste your **Client ID**
   - Paste your **Client Secret**
   - Click **Save**

### Step 2: Configure Site URL (Important!)

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**

2. Set your **Site URL** to:
   ```
   https://0716d0a6-5bec-478d-868d-cb4ad08e9ddd-v2-figmaiframepreview.figma.site
   ```
   (Or whatever your current Figma Make preview URL is)

3. Add **Redirect URLs** (one per line):
   ```
   https://0716d0a6-5bec-478d-868d-cb4ad08e9ddd-v2-figmaiframepreview.figma.site/**
   https://localhost:3000/**
   ```

4. Click **Save**

### Step 3: Test the Authentication

1. Navigate to `/knowledge-base` in your application
2. You should see the login page with "Sign in with Google" button
3. Click the button - it should redirect to Google's login page
4. After successful login, you'll be redirected back and authenticated
5. Your user profile should appear in the navbar

## 🔒 Security Notes

- **Never commit OAuth secrets to version control**
- The `publicAnonKey` is safe to use in frontend code
- User sessions are automatically managed by Supabase
- Sessions persist across page refreshes using browser storage

## 🧪 How It Works

1. **User clicks "Sign in with Google"** → Redirects to Google OAuth
2. **User approves permissions** → Google redirects back to Supabase
3. **Supabase processes the OAuth callback** → Creates session
4. **User is redirected to your app** → AuthContext detects session
5. **Protected routes become accessible** → User can access Knowledge Base

## 📱 User Experience

- **Login State**: Persisted across browser sessions
- **Logout**: Clears session and redirects to public pages
- **Profile Display**: Shows user's Google profile picture and name in navbar
- **Protected Routes**: Automatically redirect to login if not authenticated

## 🐛 Troubleshooting

**Issue: Redirect not working**
- Double-check your redirect URIs in both Google Cloud Console and Supabase
- Make sure they match exactly (including trailing slashes)

**Issue: "Provider not enabled" error**
- Verify Google provider is enabled in Supabase Dashboard
- Check that Client ID and Secret are correctly entered

**Issue: User not appearing in navbar**
- Check browser console for errors
- Verify the session is being created (check Supabase Dashboard → Authentication → Users)

## 📚 Documentation Links

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

**Your Supabase Project:** bgsddltmsqdjytllpijm
**Supabase Dashboard:** https://supabase.com/dashboard/project/bgsddltmsqdjytllpijm
