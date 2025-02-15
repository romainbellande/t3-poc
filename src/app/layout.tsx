import { LanguageProvider } from '@inlang/paraglide-next';
import "~/styles/globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Geist } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = 'en';

  return (
    <LanguageProvider>
      <html lang={locale} className={`${geist.variable} font-sans`}>
        <body>
          <NextTopLoader showSpinner={false} />
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
