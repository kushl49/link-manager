import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const{ displayName, bio} = body;

    if(!session || !session.user?.email) {
        return NextResponse.json({error: "Unauthorized" }, {status: 401 });
    }

    try{
        const updatedUser = await prisma.user.update({
            where: {email: session.user.email},
            data: {
                name: displayName,
                bio: bio,
            },
        });
        return NextResponse.json({success: true, user: updatedUser});
    }
    catch(e){
        return NextResponse.json({error: "Failed to update user"}, {status: 500});
    }
}