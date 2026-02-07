"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        else router.push("/folder/6bfc1161-d799-4b46-b15b-0d9107adeb95") 
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg-300)]">
                <div className="w-full max-w-sm bg-white p-8 rounded-xl black-border">
                    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
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
                            Login
                        </button>

                        <p> Have no account? <Link href={"/signup"} className="text-[var(--orange)] underline">Sign-Up</Link></p>
                        { error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {/* <strong className="font-bold">Error: </strong> */}
                            <span className="block sm:inline">Incorrect username or password</span>
                        </div>}
                    
                    </form>
                </div>
            </div>
        </>
    );
}