import { createAuthClient } from "better-auth/react";

//locally it will use Vite's proxy, but in production, it'll use Render's URL
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || window.location.origin,
});
export const { signIn, signUp, signOut, useSession } = authClient;
