import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { clientEnv } from '@/lib/client-env.ts';

// todo config networks
export const networks = [mainnet, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: clientEnv.REOWN_PROJECT_ID,
  networks
})

export const config = wagmiAdapter.wagmiConfig