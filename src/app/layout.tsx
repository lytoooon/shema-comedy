import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shema Comedy — My life, my lens.",
  description:
    "I'm Shema, a 21-year-old University of Zambia mining engineering student and lifestyle and comedy content creator.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
