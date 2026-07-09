const buildApiUrl = (path: string) => {
  const baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL || "";

  if (!baseUrl) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getProducts = async () => {
  const res = await fetch(buildApiUrl("/api/products"));
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const getProductById = async (id: any) => {
  const res = await fetch(buildApiUrl(`/api/products/${id}`));
  if (!res.ok) {
    throw new Error("Product not found");
  }
  return res.json();
};