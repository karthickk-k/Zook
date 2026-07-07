"use client";

import { useState, useEffect, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Lock, LogIn, ShoppingBag } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (status === "authenticated") { router.replace("/"); }
    }, [status, router]);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Username is required.");
            return;
        }
        if (!password.trim()) {
            setError("Password is required.");
            return;
        }
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        setLoading(false);
        if (result?.error) {
            setError("Invalid username or password.");
            return;
        }
        router.push("/");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#FFFFF] flex items-center justify-center px-5 py-10">
            <div className="max-w-4xl w-full bg-[#FFFFF] rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                    <div className="hidden lg:flex bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-[#FFFFF] p-10 flex-col justify-center">
                        <ShoppingBag size={70} color="#FFFF" />
                        <div className="text-5xl text-[#FFFF] font-bold tracking-wide mt-8">
                            ZOOK
                        </div>
                        <div className="mt-6 text-lg leading-8 text-blue-100">
                            Welcome back to ZOOK Fashion. Explore the latest fashion collections.
                        </div>
                    </div>

                    <div className="p-5 md:p-12">
                        <div className="text-4xl font-bold text-gray-900 mb-4">
                            Login
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="font-semibold text-gray-700">
                                Username
                            </div>
                            <div className="relative mt-2">
                                <User size={20} className="absolute left-4 top-4 text-gray-400" />
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"
                                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                            </div>
                            <div className="font-semibold text-gray-700"> Password </div>
                            <div className="relative mt-2">
                                <Lock size={20} className="absolute left-4 top-4 text-gray-400" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                            </div>
                            {error && (<div className="text-base text-red-600 font-normal pl-2"> {error} </div>)}
                            <div className="flex w-full gap-8">
                                <Link href="/">
                                    <button type="button" className="w-[150px] bg-[#E1DCC9] hover:bg-[#DDDDDD] text-black py-3 rounded-xl font-semibold text-center gap-3 transition cursor-pointer">
                                        Cancel
                                    </button>
                                </Link>
                                <button type="submit" disabled={loading}
                                    className="w-[150px] bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3 transition cursor-pointer">
                                    {loading ? "" : <LogIn size={20} />}
                                    {loading ? "Signing In..." : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


