import React from "react";
import { PrimeReactProvider } from "primereact/api";
import MainLayout from "@/components/MainLayout";
import "./globals.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-dm bg-lightPrimary">
        <Toaster position="top-right" />
        <PrimeReactProvider>
          <MainLayout>{children}</MainLayout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
