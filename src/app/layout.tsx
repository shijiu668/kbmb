import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MB to KB Image Resizer",
  description: "Resize Images Online with Optimal Quality, Support KB/MB Units, Fast Export and Simple Operation",
  keywords: "Image Resizer, MB to KB, Resize Images with Optimal Quality, Resize Image KB MB, Image Size Converter, Fast Image Resizing, Online Image Resizer Tool, Resize Images Quickly, Download Resized Images, Image Optimization Tool",
  authors: [{ name: "MB to KB Image Resizer" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "MB to KB Image Resizer",
    description: "Resize Images Online with Optimal Quality, Support KB/MB Units, Fast Export and Simple Operation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4PYRGFJ932" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4PYRGFJ932');
          `}
        </Script>
      </head>
      <body className={geist.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
