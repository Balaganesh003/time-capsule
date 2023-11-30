'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DragDrop from '@/components/Dragdrop';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerDemo } from '@/components/DateTime';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [document, setDocument] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocument(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const [title, setTitle] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [date, setDate] = useState();

  const handelSubmit = () => {
    setWalletAddress(''), setTitle(''), setDate(''), setDocument('');
    toast.loading('adding the capsule');

    setTimeout(() => {
      toast.dismiss();
      toast.success('Added Capsule Successfully');
    }, 2000);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main className="w-full h-full min-h-screen bg-orange-300 pb-6 relative">
          <Toaster />
          {/* NavBar */}
          <div className="fixed inset-0 w-full h-16 bg-white/50 backdrop-blur-md px-8">
            <div className="flex items-center  h-full justify-end w-full">
              <ConnectButton />
            </div>
          </div>
          <div className="pt-24 px-12 flex flex-col items-center">
            <h1 className="font-sans text-2xl">Welcome to Timecapsule</h1>
            {/* Drag and Drop component */}
            <div className=" max-w-[550px] mt-6    w-full">
              <div className="h-[200px] bg-white/30 backdrop-blur-sm rounded-md">
                <DragDrop
                  document={document}
                  handleFileSelect={handleFileSelect}
                />
              </div>

              {/* Title */}
              <div className="mt-8">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.value)}
                  type="email"
                  placeholder="Title"
                />
              </div>
              {/* Add Alternate Wallet Address */}
              <div className="mt-4">
                <Input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.value)}
                  placeholder="Alternate Wallet Address"
                  walletAddress={walletAddress}
                  setWalletAddress={walletAddress}
                />
              </div>
              {/* Time Date */}

              {/* Submit Button */}
              <div className="my-4 flex justify-between gap-8">
                <DatePickerDemo date={date} setDate={setDate} />
                <Button onClick={handelSubmit} variant="outline">
                  Add Your Capsule
                </Button>
              </div>
            </div>
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
