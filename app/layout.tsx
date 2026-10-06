import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/content/site";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Abu Bakr Electronics — Home Technology & Electric Mobility in Lahore",
    template: "%s | Abu Bakr Electronics",
  },
  description:
    "Air conditioners, refrigerators, home appliances, electronics and Jinpeng electric bikes & scooties. Free delivery across Lahore, delivering across Pakistan.",
  robots: site.demoMode ? { index: false, follow: false } : undefined,
  openGraph: { type: "website", siteName: "Abu Bakr Electronics", locale: "en_PK" },
};

export const viewport: Viewport = {
  themeColor: "#F7F4F0",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${bodoni.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xs focus:bg-white focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main id="main">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
