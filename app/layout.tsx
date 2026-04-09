import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Techinfigo | Growth Infrastructure",
  description: "We build compounding growth systems for D2C brands doing ₹20L–₹2Cr/mo who value profit over vanity.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  }
};

export const viewport = {
  themeColor: '#001d21',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
