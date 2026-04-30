import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Summarizer | Resumos Inteligentes",
  description: "API de sumarização de textos com tradução instantânea usando Qwen LLM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
