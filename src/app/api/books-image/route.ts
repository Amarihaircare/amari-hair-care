import { NextRequest, NextResponse } from "next/server";

const BOOKS_TOKEN = process.env.ZOHO_BOOKS_TOKEN;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("url");

    if (!target) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    if (!BOOKS_TOKEN) {
      return NextResponse.json({ error: "Zoho Books token is not configured" }, { status: 500 });
    }

    const upstream = await fetch(target, {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${BOOKS_TOKEN}`,
      },
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: "Zoho Books image request failed", status: upstream.status, details: text },
        { status: upstream.status }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}

