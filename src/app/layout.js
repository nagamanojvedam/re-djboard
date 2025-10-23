import Providers from "@/components/Providers";
import "./../styles/globals.css";

export const metadata = {
  title: "DevJobs",
  description: "Find your dream developer job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
