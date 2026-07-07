const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (order: any) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getOrders = async (userId: string) => {
  const res = await fetch(`${API_URL}/api/orders?userId=${userId}`);
  return res.json();
};

