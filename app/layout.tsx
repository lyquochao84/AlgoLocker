import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/layout/header/page";
import Sidebar from "@/components/sidebar/page";

import { AuthContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AlgoLocker",
  description: "Coding solution for all programmers",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <main className='main'>
            <Sidebar />
            <Header />
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
