const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const getProductById = async (id: any) => {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }
  return res.json();
};