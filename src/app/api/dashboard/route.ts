import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    totalBookValue: 344827000,
    investmentRealEstate: 79100000,
    primaryRealEstate: 165517000,
    aum: 101568200,
  };
  return NextResponse.json(data);
}
