"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import Header from "./Header";
import Footer from "./Footer";
import { SWRDevTools } from "swr-devtools";

export default function Providers({ children }) {
  const swrOptions = {
    fetcher: async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {/* SWR + DevTools wrapper */}
        <SWRConfig value={swrOptions}>
          {process.env.NODE_ENV === "development" ? (
            <SWRDevTools position="bottom-right">
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </SWRDevTools>
          ) : (
            <>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </>
          )}
        </SWRConfig>
      </SessionProvider>
    </ThemeProvider>
  );
}
