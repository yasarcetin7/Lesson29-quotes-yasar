import "./globals.css";

export const metadata = {
  title: "Random Quotes Application",
  description: "Random Quotes Application ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}