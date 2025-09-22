// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "DH Panel",
  description: "Law firm.",
  // icons: {
  //   icon: "/logo.png"
  // }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={` antialiased`}>
        <AuthProvider>
          {children}
          <Toaster richColors toastOptions={{}} />
        </AuthProvider>
      </body>
    </html>
  );
}
