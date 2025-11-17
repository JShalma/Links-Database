export default function LoginPage(){
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg-300)]">
                <div className="w-full max-w-sm bg-white p-8 rounded-xl black-border">
                    <h1 className="text-2xl font-semibold text-center mb-6">Sign-In</h1>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1"> Email </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 black-border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1"> Password </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 black-border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder=""
                            />
                        </div>
                        <button type="submit" className="w-full bg-[var(--blue)] hover:bg-[var(--pink)] black-border py-2 rounded-lg font-medium">
                            Sign-in
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}