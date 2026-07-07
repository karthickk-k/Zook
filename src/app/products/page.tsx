"use client";

import { getProducts } from "@/services/productService";
import Link from "next/link";
import { useEffect, useMemo, useState, } from "react";
import { useRouter, useSearchParams, } from "next/navigation";
import { Search } from "lucide-react";

interface ProductList {
  id: number;
  image: string;
  title: string;
  brand: string;
  price: number;
}

const ProductCard = () => {
  const [allproduct, setAllproduct] = useState<ProductList[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") || "all");
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 6);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setAllproduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (priceFilter !== "all") { params.set("price", priceFilter); }
    params.set("limit", String(limit));
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);
  }, [search, priceFilter, limit, page, router]);

  useEffect(() => {
    setPage(1);
  }, [search, priceFilter, limit]);

  const filteredProducts = useMemo(() => {
    let products = [...allproduct];
    if (search) {
      products = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()));
    }
    switch (priceFilter) {
      case "0-10":
        products = products.filter((item) => item.price <= 10);
        break;
      case "10-15":
        products = products.filter((item) => item.price > 10 && item.price <= 15);
        break;
      case "15-20":
        products = products.filter((item) => item.price > 15 && item.price <= 20);
        break;
      case "30":
        products = products.filter((item) => item.price > 30);
        break;
    }
    return products;
  }, [allproduct, search, priceFilter]);

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProducts.slice(
      start,
      start + limit
    );
  }, [filteredProducts, page, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <h1 className="text-2xl font-bold">
          Loading Products...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F4F4] min-h-screen py-10 px-5">
      <div className="text-3xl md:text-4xl text-[#000000] font-extrabold text-center tracking-tight mb-10">
        SEE IT ON YOU BEFORE <span className="text-indigo-600 ">YOU BUY IT</span>
      </div>

      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div className="flex relative sm:w-auto">
          <Search className="absolute left-[10px] top-[6px]" />
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-[#FFFF] border focus:border-indigo-400 rounded-xl h-[40px] w-xs pl-10" />
        </div>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 bg-[#FFFF] cursor-pointer">
          <option value="all"> All Prices</option>
          <option value="0-10"> $0 - $10 </option>
          <option value="10-15"> $10 - $15 </option>
          <option value="15-20"> $15 - $20 </option>
          <option value="30"> Above $30 </option>
        </select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((item) => (
          <div key={item.id} className="bg-[#FFFF] rounded-3xl shadow-[2px_2px_2px_-2px] p-6 flex flex-col gap-3">
            <div className="bg-[#F7F9FF] rounded-xl p-4 overflow-hidden ">
              <img src={item.image} alt={item.title}
                className="w-full h-56 object-contain transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="text-xl text-[#000000] font-bold mt-4"> {item.title} </div>
            <div className="text-gray-500"> {item.brand} </div>
            <div className="text-green-600 font-bold text-xl"> ${item.price} </div>
            <Link href={`/products/${item.id}`}>
              <button className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-[#FFFF] font-semibold py-3 mt-4 rounded-xl cursor-pointer">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 flex-wrap gap-4">
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded-lg px-4 py-2 bg-[#FFFF] cursor-pointer shadow-sm">
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
        </select>
        <div className="flex items-center gap-4">
          <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}
            className="bg-[#FFFF] px-3 py-2 border rounded-lg disabled:opacity-40 cursor-pointer" >
            Prev
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages || 1}
          </span>
          <button disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-[#FFFF] px-3 py-2 border rounded-lg disabled:opacity-40 cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




