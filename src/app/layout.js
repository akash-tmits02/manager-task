import { Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import ThemeProvider from "../components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TaskFlow - Task Manager",
  description: "Manage your tasks efficiently with TaskFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
