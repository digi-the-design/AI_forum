import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Blob にアップロード（public）
  const blob = await put(file.name, file, {
    access: "public",
  });

  return NextResponse.json({
    url: blob.url, // 公開URL
    pathname: blob.pathname,
    size: blob.size,
  });
}
