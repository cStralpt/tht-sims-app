import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextUIProviders, ReduxProvider } from "../providers";
import SideNav from "@/components/SideNav";
import ProtectedRouteProvider from "@/components/ProtectedRouteProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THT Sims Web App",
  description: "manage your product easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen flex`}>
          <ReduxProvider>
            <NextUIProviders>
              <main className="flex justify-between h-full w-full">
                <SideNav />
                {children}
              </main>
            </NextUIProviders>
          </ReduxProvider>
        </body>
      </html>
    </ProtectedRouteProvider>
  );
}
