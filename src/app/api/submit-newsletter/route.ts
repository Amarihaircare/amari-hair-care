import { NextRequest, NextResponse } from "next/server";

function getFormattedTimestamp(): string {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const timestamp = getFormattedTimestamp();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("timestamp", timestamp);

    await fetch(
      "https://script.google.com/macros/s/AKfycbwVL86RY5gefiD739zZEOtl0kLad8J-JAlBvznsMDLq0Tn1yPRcJJJJJASzKm17x6c5RA/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    return NextResponse.json({
      status: "success",
      message: "Data submitted successfully",
    });
  } catch (error) {
    console.error("Newsletter submission error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error).message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
