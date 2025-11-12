"use client"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css"
import config from "@/rainbowKitConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query" 

import { type ReactNode } from "react";
import { useState } from "react";

/**
 * uses config defined in rainbowKitConfig.tsx
 * {props.children} --> all web site code will included here
 * @param props 
 * @returns 
 */
export function Providers(props: {children: ReactNode}){
    const [queryclient] = useState(()=> new QueryClient())
    return (
        <WagmiProvider config={config}>     
            <QueryClientProvider client={queryclient}>
                <RainbowKitProvider>
                    {props.children}            
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}