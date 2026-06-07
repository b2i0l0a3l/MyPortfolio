import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/data";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return (await auth()).redirectToSignIn({ returnBackUrl: req.url });
    }

    const email =
      (sessionClaims as Record<string, unknown>)?.email ??
      (sessionClaims as Record<string, unknown>)?.primaryEmail ??
      ((sessionClaims as Record<string, unknown>)?.emailAddresses as string[] | undefined)?.[0];

    if (email && email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
