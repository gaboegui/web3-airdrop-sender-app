"use client"

import { useEffect, useState } from "react";
import HomeContent from "@/components/HomeContent";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show loading state during initial render to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <HomeContent />
        </div>
      ) : (
        <div>
          Please connect to a Wallet !!
        </div>
      )
      }
    </div>
  );
}
