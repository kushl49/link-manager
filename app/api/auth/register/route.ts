import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, hashedPassword },
        });

        return new Response(JSON.stringify({ message: "User created", userId: user.id }), { status: 201 });
    }
    catch (e) {
        console.log("Registration Error: ", e);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }




}