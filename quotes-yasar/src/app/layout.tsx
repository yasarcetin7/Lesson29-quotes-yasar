import "./globals.css";
import { QuotesContextProvider } from "./QuotesContext";
import { Providers } from "./providers";



export const metadata = {
  title: "Random Quotes App",
  description: "Random Quotes App",
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">
        <Providers>
          <QuotesContextProvider>{children}</QuotesContextProvider>
        </Providers>
      </body>
    </html>
  );
}
