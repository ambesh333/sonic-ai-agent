import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react" // Added import for React
import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookieToInitialState } from "wagmi"
import { getConfig } from "@/lib/config"
import { headers } from "next/headers"
import { Providers } from "@/components/wagmiProvider"
import { CopilotKit } from "@copilotkit/react-core";

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
            <CopilotKit publicApiKey="ck_pub_b2e98f385638148a792e83151883e4f8"> 
              {children}
            </CopilotKit>
          </SidebarProvider>
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
