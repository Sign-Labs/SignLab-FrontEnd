import type { Metadata } from "next";
import "./css/central.css";


export const metadata: Metadata = {
  title: "Sign Laboratory",
  description: "Learning as a service for sign language",
  icons: {
    icon: './profile.jpg',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
