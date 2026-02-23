import { NextRequest, NextResponse } from "next/server";

const allRows = [
  {
    id: "1",
    name: "Alfredo Dias",
    netWorth: 5245987,
    irr: 12.45,
    totalValue: 1537987,
  },
  {
    id: "2",
    name: "Craig Ekstrom",
    netWorth: 5015800,
    irr: 7.87,
    totalValue: 1537987,
  },
  {
    id: "3",
    name: "John Anderson",
    netWorth: 3120000,
    irr: 9.2,
    totalValue: 1120000,
  },
  {
    id: "4",
    name: "Jane Smith",
    netWorth: 4250000,
    irr: 10.5,
    totalValue: 1875000,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const sort = searchParams.get("sort") || "name";
  const direction = searchParams.get("direction") || "asc";

  const sorted = [...allRows].sort((a, b) => {
    const aVal = a[sort as keyof typeof a];
    const bVal = b[sort as keyof typeof b];
    if (direction === "asc") return aVal > bVal ? 1 : -1;
    else return aVal < bVal ? 1 : -1;
  });

  const start = (page - 1) * size;
  const rows = sorted.slice(start, start + size);
  const totalPages = Math.ceil(allRows.length / size);

  return NextResponse.json({ rows, totalPages });
}
