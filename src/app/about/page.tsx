import Link from "next/link";
import { ChevronLeft } from "lucide-react";
const About = () => {
    return (
        <>
            <div className="bg-[#000000] w-[40px] h-[40px] rounded-full p-1 cursor-pointer">
                <Link href="/">
                    <ChevronLeft size={30} color="#FFFF" strokeWidth={2.8} />
                </Link>
            </div>

            <div className="w-full bg-[#F5F5F5] rounded-3xl shadow-[2px_2px_8px_-2px] p-10 mt-10 text-center">
                <div className="text-3xl sm:text-4xl text-[#000000] font-extrabold text-gray-900 tracking-tight mb-6">
                    About Our <span className="text-blue-600" >Store</span>
                </div>
                <div className="text-lg text-gray-600 leading-8 mb-8">
                    Welcome to <span className="font-semibold text-blue-700">Zook Store</span>! We offer high-quality fashion products with modern designs at affordable prices. Our goal is to provide the best shopping experience with stylish collections, secure payments, and fast delivery.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#E5F4E7] p-5 rounded-2xl shadow-[2px_2px_2px_-2px] ">
                        <div className="text-lg font-bold text-[#000000]" >Quality Products</div>
                        <div className="text-sm mt-2 text-[#3C3D37] tracking-wide ">Premium materials and mordern styles</div>
                    </div>
                    <div className="bg-[#E5F4E7] p-5 rounded-2xl shadow-[2px_2px_2px_-2px] ">
                        <div className="text-lg font-bold text-[#000000]">Fast Delivery</div>
                        <div className="text-sm mt-2 text-[#3C3D37] tracking-wide">Quick and reliable shipping services</div>
                    </div>
                    <div className="bg-[#E5F4E7] p-5 rounded-2xl shadow-[2px_2px_2px_-2px]">
                        <div className="text-lg font-bold text-[#000000]" >Customer Satisfactions</div>
                        <div className="text-sm mt-2 text-[#3C3D37] tracking-wide ">Thousands plus of happy customers trust us</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default About;


























