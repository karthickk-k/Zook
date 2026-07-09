const buildApiUrl = (path: string) => {
  const baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL || "";

  if (!baseUrl) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const createOrder = async (order: any) => {
  const res = await fetch(buildApiUrl("/api/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getOrders = async (userId: string) => {
  const res = await fetch(buildApiUrl(`/api/orders?userId=${userId}`));
  return res.json();
};

