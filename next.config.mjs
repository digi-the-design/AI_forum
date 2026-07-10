/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        //Next.jsの画像最適化機能を使用して、外部ドメインから画像を許可するための設定
        protocol: "https",
        //microCMSの画像URLは、images.microcms-assets.ioで始まるため、hostnameにこのドメインを指定
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  // Basic認証を有効にするための設定
  turbopack: {
    root: "/Users/sasakirikiya/Sites/next-react-website_project01/nextjs-website-main",
  },
};

export default nextConfig;
