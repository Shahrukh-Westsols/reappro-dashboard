import { NextResponse } from "next/server";

const mockProperties = [
  {
    id: "1",
    name: "Alfredo Dias",
    netWorth: 5245987,
    irr: 12.45,
    totalValue: 1537987,
    latitude: 40.7128,
    longitude: -74.006,
    imageUrl: "https://images.unsplash.com/...",
  },
  {
    id: "2",
    name: "Craig Ekstrom",
    netWorth: 5015800,
    irr: 7.87,
    totalValue: 1537987,
    latitude: 34.0522,
    longitude: -118.2437,
    imageUrl: "https://images.unsplash.com/...",
  },
  {
    id: "3",
    name: "John Anderson",
    netWorth: 3120000,
    irr: 9.2,
    totalValue: 1120000,
    latitude: 41.8781,
    longitude: -87.6298,
    imageUrl: "https://images.unsplash.com/...",
  },
];

export async function GET() {
  return NextResponse.json({ properties: mockProperties });
}
