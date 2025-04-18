import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AmplifyProvider } from "./lib/context/AmplifyProvider";
import config from "./lib/config";
import { Suspense } from "react";
import Loading from "./lib/components/Loading";
import { UserProvider } from "./lib/context/UserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <AmplifyProvider>
            <UserProvider>{children}</UserProvider>
          </AmplifyProvider>
        </Suspense>
      </body>
    </html>
  );
}
