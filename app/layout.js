
import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "A full-stack todo application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
