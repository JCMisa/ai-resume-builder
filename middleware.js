import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]); // protects the path with folder dashboard with page.tsx

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect(); // check if user is authenticated when accessing the protected routes above
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
