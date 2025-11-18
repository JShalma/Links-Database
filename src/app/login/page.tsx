"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const router = useRouter();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError ] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        if (res?.error) setError(res.error)
        else router.push("/folder/") 
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg-300)]">
                <div className="w-full max-w-sm bg-white p-8 rounded-xl black-border">
                    <h1 className="text-2xl font-semibold text-center mb-6">Sign-In</h1>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1"> Email </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 black-border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1"> Password </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 black-border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-[var(--blue)] hover:bg-[var(--pink)] black-border py-2 rounded-lg font-medium">
                            Sign-in
                        </button>
                        { error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}