import Link from "next/link";
import { ShoppingBag, Shirt, Truck, ShieldCheck, BadgePercent, } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="grid lg:grid-cols-2 gap-12 items-center px-8 py-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
            <ShoppingBag className="text-blue-600" size={20} />
            <span className="font-semibold">
              Welcome to ZOOK Fashion
            </span>
          </div>
          <div className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-gray-900">
            Discover Your
            <span className="text-blue-600"> Perfect Style</span>
          </div>
          <div className="mt-6 text-lg text-gray-600 leading-8">
            Explore premium men's & women's fashion, sportswear, sneakers, hoodies, t-shirts and accessories from top brands. Dress better. Feel confident.
          </div>
          <Link href={'/products'}>
            <button className="flex item-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] px-6 py-3 mt-5 rounded-xl font-semibold cursor-pointer hover:translate-y-1" >
              Shop Collection
            </button>
          </Link>
          <div className="grid grid-cols-2 gap-5 mt-12">
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow">
              <Truck className="text-blue-600" size={35} />
              <div>
                <div className="font-bold">
                  Free Shipping
                </div>
                <div className="text-sm text-gray-500">
                  Orders above $50
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow">
              <ShieldCheck className="text-green-600" size={35} />
              <div>
                <div className="font-bold">
                  Secure Payment
                </div>
                <div className="text-sm text-gray-500">
                  100% Protected
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow">
              <BadgePercent className="text-red-500" size={35} />
              <div>
                <div className="font-bold">
                  Hot Deals
                </div>
                <div className="text-sm text-gray-500">
                  Up to 70% OFF
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow">
              <Shirt className="text-purple-600" size={35} />
              <div>
                <div className="font-bold">
                  Premium Brands
                </div>
                <div className="text-sm text-gray-500">
                  Nike, Adidas, Puma
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src="https://images.pexels.com/photos/32549963/pexels-photo-32549963.jpeg" alt="fashionimg"
            className="w-full h-[650px] object-cover rounded-3xl shadow-2xl" />
        </div>
      </div>
    </div >
  );
};

export default Home;