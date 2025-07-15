import type { Metadata } from "next";
import "./globals.css";
import { AdProvider } from "../presentation/providers/AdProvider";

export const metadata: Metadata = {
  title: "NextJS to Android Ad Platform",
  description: "A platform for displaying ads in Android apps using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased" suppressHydrationWarning={true}>
        <AdProvider>
          {children}
        </AdProvider>
      </body>
    </html>
  );
}