import "./globals.css";
import { QuotesContextProvider } from "./QuotesContext.js";


export const metadata = {
  title: "Random Quotes App",
  description: "Random Quotes App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full"><QuotesContextProvider>{children}</QuotesContextProvider></body>

    </html>
 );
}