import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "GreenBuilt MICP 3D Lab";
const description =
  "3D 生化自癒混凝土模擬器，互動觀察 MICP 碳酸鈣晶簇如何封合裂縫、降低滲漏並恢復承載。";

function getOrigin(requestHeaders: { get(name: string): string | null }) {
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";

  if (!host) {
    return "http://localhost:3000";
  }

  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = getOrigin(await headers());
  const imageUrl = `${origin}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "16x16" },
      ],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title,
      description:
        "操作裂縫寬度、含水率、溫度與熟化時間，觀察 3D 混凝土剖面中的 CaCO3 晶簇合龍。",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1792,
          height: 1024,
          alt: "GreenBuilt MICP 3D Lab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "互動式 3D MICP 生化自癒混凝土模擬器。",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
