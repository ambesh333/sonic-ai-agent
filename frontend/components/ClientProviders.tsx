import { type ReactNode } from 'react'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from "@/lib/config";
import { WagmiProviders } from "@/components/wagmiProvider";


export default async function Wagmi({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )
  return (
    <html lang="en">
      <body>
        <WagmiProviders initialState={initialState}>
          {children}
        </WagmiProviders>
      </body>
    </html>
  )
}