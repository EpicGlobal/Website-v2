import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c2dab185/health", (c) => {
  return c.json({ status: "ok" });
});

/**
 * ACCOUNT LINKING SYSTEM
 * 
 * This authentication system allows users to sign up/sign in with either email/password
 * OR Google OAuth, and seamlessly switch between them using the same email address.
 * 
 * How it works:
 * 
 * 1. Email/Password → Google OAuth:
 *    - User creates account with email/password
 *    - Later tries to sign in with Google using same email
 *    - System automatically detects existing account and links Google provider
 *    - User can now use either method to sign in
 * 
 * 2. Google OAuth → Email/Password:
 *    - User signs in with Google
 *    - Later tries to sign up with email/password using same email
 *    - System detects OAuth account and adds password to it
 *    - User can now use either method to sign in
 * 
 * 3. Edge cases handled:
 *    - Unconfirmed email accounts are automatically confirmed
 *    - Profile pictures from OAuth are preserved
 *    - User metadata is merged, not overwritten
 *    - All scenarios provide clear user feedback
 */

// Sign up endpoint is intentionally disabled.
// Email/password signup now goes through Supabase's verified client signUp flow.
app.post("/make-server-c2dab185/auth/signup", async (c) => {
  return c.json(
    {
      error:
        "This signup endpoint is deprecated. Use the verified client signup flow instead.",
    },
    410,
  );
});

// Confirm email endpoint - confirms unconfirmed user accounts
app.post("/make-server-c2dab185/auth/confirm-email", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find user by email
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === email);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Confirm the email
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        email_confirm: true,
      }
    );

    if (error) {
      console.error("Error confirming email:", error);
      return c.json({ error: "Failed to confirm email" }, 400);
    }

    return c.json({
      success: true,
      message: "Email confirmed successfully! You can now sign in."
    });

  } catch (err) {
    console.error("Unexpected error confirming email:", err);
    return c.json({ error: "An unexpected error occurred" }, 500);
  }
});

// Account linking endpoint - links OAuth accounts to existing email/password accounts
app.post("/make-server-c2dab185/auth/link-account", async (c) => {
  try {
    const { email, provider, providerId, providerData } = await c.req.json();

    if (!email || !provider) {
      return c.json({ error: "Email and provider are required" }, 400);
    }

    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find user by email
    const { data: users } = await supabase.auth.admin.listUsers();
    const existingUser = users?.users?.find(u => u.email === email);

    if (!existingUser) {
      // No existing user - OAuth will create a new account naturally
      return c.json({
        success: true,
        shouldCreateNew: true,
        message: "No existing account found. Will create new account."
      });
    }

    // Check if this provider is already linked
    const identities = existingUser.identities || [];
    const providerAlreadyLinked = identities.some(
      identity => identity.provider === provider
    );

    if (providerAlreadyLinked) {
      return c.json({
        success: true,
        alreadyLinked: true,
        userId: existingUser.id,
        message: "Account already linked with this provider."
      });
    }

    // User exists with different auth method - we need to link accounts
    // Update user metadata to include OAuth provider info
    const updatedMetadata = {
      ...existingUser.user_metadata,
      [`${provider}_linked`]: true,
      [`${provider}_linked_at`]: new Date().toISOString(),
    };

    // Add avatar/picture from OAuth if available and not already set
    if (providerData?.avatar_url && !existingUser.user_metadata?.avatar_url) {
      updatedMetadata.avatar_url = providerData.avatar_url;
    }
    if (providerData?.picture && !existingUser.user_metadata?.picture) {
      updatedMetadata.picture = providerData.picture;
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      {
        user_metadata: updatedMetadata,
        email_confirm: true, // Ensure email is confirmed
      }
    );

    if (error) {
      console.error("Error linking account:", error);
      return c.json({ error: "Failed to link account" }, 400);
    }

    return c.json({
      success: true,
      linked: true,
      userId: existingUser.id,
      message: "Account successfully linked! You can now sign in with either method."
    });

  } catch (err) {
    console.error("Unexpected error linking account:", err);
    return c.json({ error: "An unexpected error occurred during account linking" }, 500);
  }
});

Deno.serve(app.fetch);
