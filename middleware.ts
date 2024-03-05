import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// protect all routes
export const config = {
  matcher: ["/", "/myfavorites", "/search/:path*"],
};
