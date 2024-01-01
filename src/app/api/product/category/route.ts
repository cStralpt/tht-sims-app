import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const category = await prisma.category.findMany();
  return NextResponse.json({ category });
}
