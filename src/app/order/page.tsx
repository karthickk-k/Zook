"use client";

import { useSession } from "next-auth/react";
import useOrderStore from "@/store/orderStore";
import { CalendarDays, ChevronLeft, Package, PackageOpen, ShoppingBag } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

const OrderPage = () => {
    const { data: session } = useSession();
    const userId = String((session?.user as any)?.id ?? "");
    const ordersMap = useOrderStore((state) => state.orders);
    const orders = userId ? ordersMap[userId] || [] : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] via-[#FFFF] to-[#F5F5F0]  py-10 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex item-center justify-between mb-5">
                    <Link href="/products">
                        <div className="w-[40px] h-[40px] bg-[#222222] rounded-full p-1 cursor-pointer">
                            <ChevronLeft size={30} color="#FFFF" strokeWidth={2.8} />
                        </div>
                    </Link>
                    <div className="flex item-center gap-3">
                        <div className=" bg-[#D0E7E6] w-[40] h-[40] p-2 rounded-2xl shadow-sm mt-1 ">
                            <ShoppingBag color="#2C5EAD" />
                        </div>
                        <div className="text-3xl md:text-4xl text-[#000000] font-extrabold tracking-tight" >
                            Order <span className="text-indigo-600 ">History</span>
                            <p className="text-[#57564F] font-bold text-sm md:text-base p-2">A refined view of your purchases</p>
                        </div>
                    </div>
                    <div></div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-[3px_3px_10px_#000000] p-8 flex flex-col items-center ">
                        <div className="bg-[#D0E7E6] p-6 rounded-full mb-6">
                            <PackageOpen className="w-24 h-24 sm-w-28 sm:h-28 md:w-30 md:h-30" color="#2C5EAD" strokeWidth={1.3} />
                        </div>
                        <div className="text-3xl font-bold tracking-tight">
                            No Orders Yet!
                        </div>
                        <div className="text-gray-500 mt-3 max-w-md text-center">
                            Explore premium collections and elevate your wardrobe experience.</div>
                        <Link href="/products">
                            <button className="mt-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-semibold px-8 py-3 rounded-2xl hover:-translate-y-1 cursor-pointer">
                                Explore Collection
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.orderId} className="bg-[#FFFF] rounded-2xl shadow-[3px_3px_10px_#000000] p-6 overflow-hidden " >
                                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-4 text-[#FFFF] overflow-hidden">
                                    <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <Package />
                                                <div className="text-lg md:text-xl font-bold">
                                                    Order #{order.orderId}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <CalendarDays size={16} />
                                                <div className="text-sm ">  {new Date(order.createdAt).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl px-4 py-2">
                                            <div className="text-xs text-indigo-100 uppercase tracking-widest">
                                                Total Amount
                                            </div>
                                            <div className="text-2xl font-bold text-[#FFFF] mt-1">
                                                ${order.total.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex flex-col md:flex-row gap-5 border  p-4">
                                            <Image src={item.image} alt={item.title} width={144} height={144}
                                                className="w-38 h-38 object-contain bg-[#EEEEEE] rounded-lg" />
                                            <div className="flex-1 ml-3">
                                                <div className="text-xl font-bold"> {item.title}</div>
                                                <div className="text-blue-600 mt-2"> {item.brand}</div>
                                                <div className="text-green-600 font-bold text-lg mt-2"> ${item.price} </div>
                                                <div className="mt-2">
                                                    Quantity : <span className="font-semibold"> {item.quantity} </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button className="mt-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-semibold px-6 py-2 rounded-2xl cursor-pointer">
                                                    Track Order
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default OrderPage;









