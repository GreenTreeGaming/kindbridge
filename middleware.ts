import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // redirect here if not logged in
  },
});

// Protect specific routes
export const config = {
  matcher: [
    "/donate/new", // ✅ only this route is protected for now
  ],
};