import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/route";

export async function getSessionOrThrow() {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) throw new Error("Not authenticated!");
    return session;
}