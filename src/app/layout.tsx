import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "图片尺寸调整器 - 在线图片压缩工具",
  description: "一款专业的在线图片压缩工具，帮助您轻松调整图片大小，同时保持最佳图片质量。支持KB/MB单位选择，快速导出，操作简单。",
  keywords: "图片压缩,图片大小调整,在线图片工具,图片优化,图片质量调整",
  authors: [{ name: "图片尺寸调整器" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "图片尺寸调整器 - 在线图片压缩工具",
    description: "一款专业的在线图片压缩工具，帮助您轻松调整图片大小，同时保持最佳图片质量。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
