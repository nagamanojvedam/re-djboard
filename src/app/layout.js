import "./../styles/globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "DevJobs",
  description: "A developer job board built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
