import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navigation from "./navigation/navigation";
import { MyProvider } from "../context/MyContext";
import Footer from "./navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-white text-black font-geist-sans"
      >
        <div className="flex justify-center">
          <MyProvider>
            <div className="container">
              <Navigation />
              <AppRouterCacheProvider>
                {children}
              </AppRouterCacheProvider>
              <Footer />
            </div>
          </MyProvider>
        </div>
      </body>
    </html>
  );
}
