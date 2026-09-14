"use client";

import { useState } from "react";

export default function BlobUploadForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  async function handleUpload(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setBlobUrl(data.url); // Blob の公開URL
  }

  return (
    <div>
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          // ローカルプレビュー
          setPreviewUrl(URL.createObjectURL(file));

          // Blob にアップロード
          handleUpload(file);
        }}
      />

      {previewUrl && (
        <div>
          <p>ローカルプレビュー</p>
          <video src={previewUrl} width={300} controls />
        </div>
      )}

      {blobUrl && (
        <div>
          <p>Blob URL（公開）</p>
          <a href={blobUrl} target="_blank">
            {blobUrl}
          </a>

          <video src={blobUrl} width={300} controls />
        </div>
      )}
    </div>
  );
}
