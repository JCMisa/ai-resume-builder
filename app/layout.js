import { Inter } from "next/font/google";
import "./globals.css";
import { icons } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReUp",
  description: "AI-powered resume builder. Craft your dream job application",
  logos: {
    logo: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
