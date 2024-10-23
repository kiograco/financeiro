import "./global.css";
import type { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Financeiro",
  description: "financial app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <ChakraProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ChakraProvider>
        </main>
        
        <footer>
          <p>© 2024 Caio Graco</p>
        </footer>
      </body>
    </html>
  );
}
