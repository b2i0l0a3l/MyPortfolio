import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/data";

const f = createUploadthing();

async function adminAuth() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const email =
    (sessionClaims as Record<string, unknown>)?.email ??
    (sessionClaims as Record<string, unknown>)?.primaryEmail ??
    ((sessionClaims as Record<string, unknown>)?.emailAddresses as string[] | undefined)?.[0];

  if (email !== ADMIN_EMAIL) throw new Error("Forbidden");
  return { userId };
}

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(adminAuth)
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),

  certificateFile: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(adminAuth)
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
