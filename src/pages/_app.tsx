import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { Toaster } from "react-hot-toast";
import Chatbot from "../components/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // The shop assistant belongs to the Flock demo shop, not the portfolio homepage
  const isPortfolio = router.pathname === "/";

  return (
    <div className={`${inter.variable} ${display.variable} font-sans`}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
          {!isPortfolio && <Chatbot />}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
