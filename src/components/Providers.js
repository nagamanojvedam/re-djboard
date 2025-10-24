"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import Footer from "./Footer";
import Header from "./Header";

export default function Providers({ children }) {
  const swrOptions = {
    fetcher: async (url) => {
      console.log("********************************************************");
      console.log("[SWR → Fetching]:", url);
      const res = await fetch(url);
      console.log("[SWR → Response]:", res.status, res.statusText);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      console.log("[SWR → Data]:", data);
      console.log("********************************************************");
      return data;
    },
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  return (
    <SWRConfig value={swrOptions}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
