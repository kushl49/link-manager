import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { urls } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },

    });
    
    if(urls.length === 0) return NextResponse.json({error: "Invalid inputs"}, {status: 400});

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const linkData = urls.filter((url: string) => url.trim() !== "")
        .map((url: string) => ({
            title: "Link",
            url,
            userId: user.id,
        })
        )

    await prisma.links.createMany({
        data: linkData,
    });

    return NextResponse.json({message: "Links saved"}, {status: 200});

}