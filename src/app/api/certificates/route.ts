import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

// GET /api/certificates — Public: fetch all certificates
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST /api/certificates — Admin: create a certificate
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const certificate = await prisma.certificate.create({
      data: {
        title: body.title,
        issuer: body.issuer,
        date: new Date(body.date),
        image: body.image ?? null,
        pdfUrl: body.pdfUrl ?? null,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Failed to create certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
