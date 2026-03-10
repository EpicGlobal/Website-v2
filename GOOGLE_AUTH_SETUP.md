# Google Authentication Setup for Knowledge Base

This application uses Google OAuth 2.0 to protect the Knowledge Base section with a login wall.

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API for your project

### 2. Create OAuth 2.0 Credentials

1. In the Google Cloud Console, navigate to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. Configure the OAuth consent screen if prompted:
   - Choose **External** user type
   - Fill in the required application information
   - Add your domain to authorized domains
4. Select **Web application** as the application type
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
7. Click **Create** and copy your **Client ID**

### 3. Configure the Application

1. Open `/src/app/App.tsx`
2. Find the line: `const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';`
3. Replace `'YOUR_GOOGLE_CLIENT_ID_HERE'` with your actual Google Client ID

Example:
```typescript
const GOOGLE_CLIENT_ID = '123456789-abc123def456.apps.googleusercontent.com';
```

### 4. Test the Authentication

1. Navigate to `/knowledge-base` in your application
2. You should see a login screen with a Google Sign-In button
3. Click the button and sign in with your Google account
4. After successful authentication, you'll be redirected to the Knowledge Base
5. Your profile photo and name will appear in the navbar with a logout button

## Features

- **Protected Routes**: `/knowledge-base` and all article pages require authentication
- **Session Persistence**: Users remain logged in across page refreshes
- **User Profile Display**: Shows user name and photo in the navbar when logged in
- **Logout Functionality**: Users can log out via the logout button in the navbar
- **Secure**: Uses Google's OAuth 2.0 standard for authentication
- **Privacy**: User data is only stored in browser session storage and is not sent to any backend

## Security Notes

- This is a frontend-only implementation suitable for access control
- User sessions are stored in browser `sessionStorage` and expire when the browser is closed
- For production applications handling sensitive data, consider using a backend authentication service like Supabase

## Troubleshooting

**Error: "Unauthorized origin"**
- Make sure your domain is added to the authorized JavaScript origins in Google Cloud Console

**Google Sign-In button not appearing**
- Check that your Client ID is correctly configured in `/src/app/App.tsx`
- Check browser console for errors

**Users can't access Knowledge Base**
- Ensure the ProtectedRoute component is properly wrapping the Knowledge Base routes
- Check that the AuthProvider is wrapping your application in App.tsx
