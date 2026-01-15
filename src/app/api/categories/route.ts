import { NextResponse } from "next/server";
import { BASE_URL, DOMAIN_NAME } from "@/lib/zoho-api";

export async function GET() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${BASE_URL}/categories?page=1&per_page=100`, {
      method: "GET",
      headers: {
        "domain-name": DOMAIN_NAME,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    const raw = await res.text();
    try {
      clearTimeout(timer);
    } catch {}

    if (!res.ok) {
      console.error("Zoho Categories Error", res.status, raw);
      return NextResponse.json(
        { error: "Failed to fetch categories", details: raw },
        { status: res.status },
      );
    }

    let data: any = {};
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Zoho Categories JSON parse error");
    }

    const categories: any[] =
      data?.payload?.categories ||
      data?.categories ||
      data?.data?.categories ||
      [];

    return NextResponse.json({ categories });
  } catch (err: any) {
    console.error("CRITICAL CATEGORIES ERROR:", err?.message || err);
    return NextResponse.json(
      { categories: [], error: err?.message || "Unknown error" },
      { status: 200 },
    );
  }
}

