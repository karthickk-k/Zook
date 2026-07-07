import { NextRequest } from "next/server";

let orders: any[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  orders.push(body);
  return Response.json({
    success: true,
    message: "Order Created",
    order: body,
  });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const userOrders = orders.filter((item) => item.userId === userId);
  return Response.json(userOrders);
}
