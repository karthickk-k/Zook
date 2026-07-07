"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import useCartStore from "@/store/cartStore";
import { ShoppingCart, Menu, X, LogIn, LogOut, User, } from "lucide-react";

const navItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Products",
        href: "/products",
    },
    {
        name: "About",
        href: "/about",
    },
];

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const carts = useCartStore((state) => state.carts);
    const cartItems = userId ? (carts[userId] ?? []) : [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = !!session;
    const userName = session?.user?.name;
    const transitionClass = "transition-all duration-300";
    const toggleMenu = () => { setIsOpen((prev) => !prev); };
    const closeMenu = () => { setIsOpen(false); };

    const handleLogout = () => {
        signOut({
            callbackUrl: "/",
        });
    };
    const handleMobileLogout = () => {
        closeMenu();
        handleLogout();
    };

    const getNavClass = (href: any) =>
        pathname === href
            ? "bg-[#FFFF] text-indigo-700 shadow-lg"
            : "text-[#FFFF] hover:bg-[#FFFF] hover:text-indigo-700";

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 shadow-lg">
            <div className="max-w-8xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="text-3xl font-extrabold tracking-wide text-[#FFFF]" >
                        ZOOK
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}
                                className={`px-5 py-2 rounded-xl font-semibold ${transitionClass} ${getNavClass(item.href)}`} >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/cart" className={`relative p-3 rounded-xl ${transitionClass} ${getNavClass("/cart")}`}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-xl">
                                    <User size={18} />
                                    <span className="font-medium">
                                        {userName}
                                    </span>
                                </div>
                                <button onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:bg-red-500 transition cursor-pointer">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:bg-green-500 transition">
                                <LogIn size={20} />
                            </Link>
                        )}
                    </div>
                    <button className="md:hidden text-white p-2 rounded-lg hover:bg-white hover:text-indigo-700 transition" onClick={toggleMenu} >
                        {isOpen ? (<X size={30} />) : (<Menu size={30} />)}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-indigo-800 border-t border-indigo-600 shadow-lg">
                    <div className="flex flex-col gap-2 px-6 py-6">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={closeMenu}
                                className={`px-4 py-3 rounded-lg font-semibold ${transitionClass} ${getNavClass(item.href)}`}>
                                {item.name}
                            </Link>
                        ))}
                        <Link href="/cart" onClick={closeMenu}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg ${transitionClass} ${getNavClass("/cart")}`}>
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={20} /> Cart
                            </div>
                            {cartCount > 0 && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-700 text-white">
                                    <User size={20} />
                                    <div className="flex flex-col">
                                        <div className="text-xs text-gray-200">
                                            Welcome
                                        </div>
                                        <div className="font-semibold">
                                            {userName}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleMobileLogout}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500 transition cursor-pointer">
                                    <LogOut size={20} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-500 transition" >
                                <LogIn size={20} /> Login  </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
