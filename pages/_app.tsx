import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Frank_Ruhl_Libre, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-frank",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${frankRuhl.variable} font-sans`}>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-frank: ${frankRuhl.style.fontFamily};
        }
        .font-serif {
          font-family: ${frankRuhl.style.fontFamily}, Georgia, serif !important;
        }
      `}</style>
      <Component {...pageProps} />
    </main>
  );
}
