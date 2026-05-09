import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Avyay Group",
    template: "%s | Avyay Group",
  },
  description:
    "Avyay Group offers comprehensive financial services including Fin Sudha, V-Lookup, EFX Motion, and Mixed Emotion. Expert guidance for your financial journey.",
  keywords: ["financial services", "investment", "Avyay Group", "Fin Sudha", "Udupi", "mutual funds"],
  authors: [{ name: "Avyay Group" }],
  metadataBase: new URL("https://avyaygroup.in"),
  icons: {
    icon: "/assets/Avyay Group Logo (Retouch).png",
    apple: "/assets/Avyay Group Logo (Retouch).png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://avyaygroup.in",
    siteName: "Avyay Group",
    title: "Avyay Group",
    description: "Comprehensive financial services and investment solutions for your future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
