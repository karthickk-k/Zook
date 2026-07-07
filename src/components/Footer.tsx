import { Copyright } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#222831]">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-2xl font-bold text-white text-center mb-2">
                    Zook Store
                </div>
                <div className="text-center text-gray-400 mb-6">
                    Premium Fashion, Quality Products, Modern Style
                </div>
                <div className="border-t border-gray-700 mb-6"></div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Copyright size={16} />
                    <span>2026 Zook Store. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

