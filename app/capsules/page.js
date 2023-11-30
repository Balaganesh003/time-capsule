'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { FaBackward } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CapsuleCard from '@/components/CapsuleCard';

const Capsules = () => {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({
        apiKey: process.env.ALCHEMY_ID,
      }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="bg-orange-300 min-h-screen pb-8">
          <div className="fixed inset-0 z-[1000] w-full h-16 bg-white/50 backdrop-blur-md px-8">
            <div className="flex items-center  h-full justify-between w-full">
              <Link href={'/'}>
                <Button>
                  <FaBackward />
                </Button>
              </Link>

              <ConnectButton />
            </div>
          </div>
          {/* Capsules */}
          <div className="pt-24">
            <h1 className="text-center text-2xl font-semibold text-black mb-8">
              Capsule Memories
            </h1>
            <div className="flex flex-col items-center w-full gap-5">
              <CapsuleCard isover={false} />
              <CapsuleCard isover={true} />
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Capsules;
