'use client';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export default function Home() {
  const {
    chains,
    publicClient,
  } =
    configureChains(
      [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
      ],
      [
        alchemyProvider(
          {
            apiKey:
              process
                .env
                .ALCHEMY_ID,
          }
        ),
        publicProvider(),
      ]
    );

  const {
    connectors,
  } =
    getDefaultWallets(
      {
        appName:
          'My RainbowKit App',
        projectId:
          'YOUR_PROJECT_ID',
        chains,
      }
    );

  const wagmiConfig =
    createConfig(
      {
        autoConnect: true,
        connectors,
        publicClient,
      }
    );
  return (
    <WagmiConfig
      config={
        wagmiConfig
      }>
      <RainbowKitProvider
        chains={
          chains
        }>
        <main className='min-h-screen w-full bg-orange-300'>
          {/* NavBar */}
          <div className='fixed inset-0 w-full h-16 bg-white/50 backdrop-blur-md'></div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
