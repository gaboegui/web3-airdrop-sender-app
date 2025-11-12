"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">AirDrop Sender App</h1>
        <a
          href="https://github.com/gaboegui/web3-airdrop-sender-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          <FaGithub size={24} />
        </a>
      </div>
      <ConnectButton />
    </header>
  );
}