import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
    const session =  await getServerSession(authOptions);

    if(!session?.user?.email) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
        include: {links: true},
    });
    
    if(!user) return NextResponse.json({error: "User not found"}, {status: 404});

    return NextResponse.json({ user }, {status: 200});
}