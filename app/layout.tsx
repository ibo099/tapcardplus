export const metadata = {
  title: "TapCard Plus",
  description: "The smarter, sustainable way to connect."
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}