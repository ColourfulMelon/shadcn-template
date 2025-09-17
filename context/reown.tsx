'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { clientEnv } from '@/lib/client-env.ts';
import { SetMetadata } from '@/metadata.ts';
import { type AppKitNetwork, mainnet, sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Set up queryClient
const queryClient = new QueryClient()

//todo config networks
export const networks = [mainnet, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: clientEnv.REOWN_PROJECT_ID,
  networks
})

// Set up metadata
const metadata = {
  name: SetMetadata.siteName,
  description: SetMetadata.description,
  url: clientEnv.SITE_URL,
  icons: [SetMetadata.image]
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: clientEnv.REOWN_PROJECT_ID,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
