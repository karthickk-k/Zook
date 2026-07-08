"use client";

import { ChevronLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useCartStore from "@/store/cartStore";
import { getProductById } from "@/services/productService";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  title: string;
  brand: string;
  description: string;
  rating: number;
  price: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state: any) => state.addItem);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const userId = (session?.user as { id?: number })?.id;
    if (!userId) {
      router.push("/login");
      return;
    }
    if (!product) return;
    addItem(product, userId);
  };

  if (loading) {
    return (
      <div className="flex justify-center item-center min-h-screen">
        <div className="text-3xl font-bold">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="text-3xl font-bold text-[#FF0000]">
          Product Not Found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-2">
      <Link href="/products">
        <div className="bg-[#000000] w-[40px] h-[40px] rounded-full p-1 mb-5  ">
          <ChevronLeft size={30} color="#FFFF" strokeWidth={2.8} />
        </div>
      </Link>
      <div className="grid md:grid-cols-2 gap-8 p-5">
        <Image src={product.image} alt={product.title} width={500} height={400}
          className="w-full p-2 bg-[#EEEEEE] rounded-2xl" />
        <div className="flex flex-col justify-center p-3">
          <div className="text-4xl font-bold">
            {product.title}
          </div>
          <div className="bg-[#CDFADB] text-[#0065F8] mt-5 px-3 py-1 rounded-full w-fit">
            {product.brand}
          </div>
          <div className="mt-4">
            {product.description}
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Star size={20} color="#FEEC41" fill="#FEEC41" />
            <div>{product.rating}</div>
          </div>
          <div className="text-3xl text-[#08CB00] font-semibold mt-4">
            ${product.price}
          </div>
          <button onClick={handleAddToCart}
            className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-semibold w-[120px] h-[40px] mt-6 rounded-2xl cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
