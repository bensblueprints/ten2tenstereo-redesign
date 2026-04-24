import type { Metadata } from "next";
import { Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monoPanel = JetBrains_Mono({
  variable: "--font-mono-panel",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ten2tenstereo.com"),
  title: {
    default: "Ten 2 Ten Stereo — Car Audio, Tint, Wraps & Security in Azusa, CA",
    template: "%s · Ten 2 Ten Stereo",
  },
  description:
    "San Gabriel Valley's most-recommended car audio shop. Stereo installs, subs, amps, window tint, vehicle wraps, alarms, and LED headlights — built by people who treat every vehicle like their own.",
  keywords: [
    "car audio Azusa",
    "car stereo installation",
    "window tint Azusa",
    "vehicle wraps SGV",
    "car alarm installation",
    "LED headlights",
    "San Gabriel Valley car audio",
  ],
  openGraph: {
    title: "Ten 2 Ten Stereo — Car Audio & Install Experts",
    description: "15+ years in Azusa. Clean installs, fair pricing, real shop culture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${monoPanel.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
