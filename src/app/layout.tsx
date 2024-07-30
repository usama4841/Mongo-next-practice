import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/Provider";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next app demo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/src/app/favicon.ico" />
      </head>
      <Providers>
        <body className={inter.className} style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", height: "100vh" }}>
            <div
              className="mb-5"
              style={{
                width: "100vw",
                height: "100%",
                msOverflowX: "hidden",
                msOverflowY: "scroll",
              }}
            >
              {children}
            </div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
