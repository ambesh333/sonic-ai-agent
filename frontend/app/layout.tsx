// app/layout.tsx
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ReduxProviders } from "@/components/ReduxProvider";
import Wagmi from "@/components/ClientProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProviders>
            <Wagmi>
              <SidebarProvider>
                <AppSidebar />
                {children}
              </SidebarProvider>
            </Wagmi>
          </ReduxProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
