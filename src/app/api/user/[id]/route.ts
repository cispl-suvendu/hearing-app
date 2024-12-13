import { connectToDB } from "@/lib/database";
import User from "@/models/user";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const user = await User.findById(id);
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    // Await the params
    const { id } = await params;

    const { name, email, password, role } = await req.json();

    if (!name && !email && !password && !role) {
        return new Response(JSON.stringify({ error: "At least one field is required to update" }), { status: 400 });
    }

    try {
        await connectToDB();
        const user = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "User deleted successfully" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
