import "./globals.css";
import { QuotesContextProvider } from "./QuotesContext.js";
import { Providers } from "./providers";
export const metadata = {
  title: "Random Quotes App",
  description: "Random Quotes App",
};

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
