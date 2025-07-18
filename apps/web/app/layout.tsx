import { Geist, Micro_5 } from "next/font/google";

import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Micro_5({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <main className='flex flex-1 min-h-svh bg-background'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
