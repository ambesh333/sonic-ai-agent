import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react" // Added import for React
import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookieToInitialState } from "wagmi"
import { getConfig } from "@/lib/config"
import { headers } from "next/headers"
import { Providers } from "@/components/wagmiProvider"


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Providers initialState={initialState}>
          <SidebarProvider>
            <AppSidebar />
              {children}
          </SidebarProvider>
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
