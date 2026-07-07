"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";
import { Trash2, Plus, Minus, ShoppingCart, ChevronLeft } from "lucide-react";

type CartItem = {
    id: number;
    image: string;
    title: string;
    brand: string;
    price: number;
    quantity: number;
};

const CartPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const userId = (session?.user as any)?.id as | string | undefined;
    const carts = useCartStore((state: any) => state.carts);
    const cartItems: CartItem[] = userId ? carts[userId] ?? [] : [];
    const removeItem = useCartStore((state: any) => state.removeItem);
    const clearCart = useCartStore((state: any) => state.clearCart);
    const increase = useCartStore((state: any) => state.increase);
    const decrease = useCartStore((state: any) => state.decrease);
    const addOrder = useOrderStore((state: any) => state.addOrder);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleCheckout = () => {
        if (!userId || cartItems.length === 0) return;
        addOrder(String(userId), cartItems, totalPrice);
        clearCart(String(userId));
        router.push("/order");
    };

    return (
        <div className="bg-[#F5F5F0] min-h-screen py-10 rounded-xl">
            <div className="max-w-8xl mx-auto px-4 sm:px-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <Link href="/products">
                        <div className="bg-[#000000] w-[40px] h-[40px] rounded-full p-1 cursor-pointer ">
                            <ChevronLeft size={30} color="#FFFF" strokeWidth={2.8} />
                        </div>
                    </Link>
                    <div className="text-3xl sm:text-4xl text-[#000000] font-extrabold text-gray-900 tracking-tight">
                        Shopping <span className="text-indigo-600" >Cart</span>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/order">
                            <button className="bg-gradient-to-r from-green-600 via-lime to-green-700 text-[#FFFF] font-bold px-5 py-3 rounded-xl cursor-pointer">
                                Order History
                            </button>
                        </Link>
                        {cartItems.length > 0 && (
                            <button onClick={() => clearCart(String(userId))}
                                className="bg-gradient-to-r from-zinc-800 via-stone-700 to-black text-[#FFFF] font-bold px-5 py-3 rounded-xl cursor-pointer">
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-[#EEEEEE] shadow-2xl m-5 p-10 rounded-xl text-center w-full max-w-7xl flex flex-col items-center gap-5 ">
                        <div className="text-2xl sm:text-3xl text-[#000000] font-semibold">
                            Your Cart Is Empty
                        </div>
                        <div className="bg-[#D0E7E6] p-5 rounded-full mb-6">
                            <ShoppingCart className="w-24 h-24 sm-w-28 sm:h-28 md:w-30 md:h-30" color="#FEEC41" fill="#57595B" strokeWidth={1.3} />
                        </div>


                        <div className="text-[#57564F] font-semibold tracking-wide text-base sm:text-lg">
                            Add some products to see them here.
                        </div>
                        <Link href="/products">
                            <button className="mt-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-semibold px-6 py-3 rounded-2xl hover:translate-y-1 cursor-pointer">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6 w-full max-w-5xl mx-auto">
                        {cartItems.map((item: CartItem) => (
                            <div key={item.id}
                                className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5" >
                                <img src={item.image} alt={item.title}
                                    className="w-full md:w-52 h-52 object-contain rounded-lg bg-[#EEEEEE] p-2" />
                                <div className="flex-1 space-y-3">
                                    <div className="text-xl sm:text-2xl font-bold"> {item.title} </div>
                                    <div className="bg-[#CDFADB] text-[#0065F8] px-3 py-1 rounded-full w-fit"> {item.brand} </div>
                                    <div className="text-[#08CB00] text-xl sm:text-2xl font-bold">  ${item.price} </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => decrease(item.id, String(userId))}
                                            className="border rounded-lg p-2 hover:bg-[#EDE9E6] cursor-pointer" >
                                            <Minus size={18} />
                                        </button>
                                        <span className="font-bold text-lg sm:text-xl"> {item.quantity}  </span>
                                        <button onClick={() => increase(item.id, String(userId))}
                                            className="border rounded-lg p-2 hover:bg-[#EDE9E6] cursor-pointer">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="self-end md:self-start">
                                    <button onClick={() => removeItem(item.id, String(userId))}>
                                        <Trash2 size={24} color="#F62440" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 sm:p-6">
                            <div className="text-xl sm:text-2xl font-bold mb-5">
                                Order Summary
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span>Total Items</span>
                                <span className="font-semibold"> {totalItems} </span>
                            </div>
                            <div className="flex justify-between py-4 text-lg sm:text-xl font-bold">
                                <span>Total Price</span>
                                <span className="text-[#08CB00]"> ${totalPrice.toFixed(2)} </span>
                            </div>
                            <button onClick={handleCheckout}
                                className="w-full mt-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-bold py-3 rounded-xl cursor-pointer">
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;


