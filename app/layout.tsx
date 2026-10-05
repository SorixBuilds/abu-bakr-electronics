import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Preloader } from "@/components/layout/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/content/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

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
  themeColor: "#0B0A0C",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xs focus:bg-ivory focus:px-4 focus:py-3 focus:text-obsidian"
        >
          Skip to content
        </a>
        <Preloader />
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
