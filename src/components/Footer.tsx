import { FaGithub, FaLinkedin, FaCode, FaEthereum, FaUser } from "react-icons/fa";

export function Footer() {
  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <div className="text-sm text-gray-300 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <FaCode className="text-blue-400" />
          <a
            href="https://github.com/gaboegui/foundry-airdrop-sender"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-xs"
          >
            Airdrop Contract
          </a>
          <FaEthereum className="text-purple-400" />
          <a
            href="https://sepolia.etherscan.io/address/0x08caa548a302c465e28432449c9de03ea091af48#code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-xs"
          >
            Deployed on Sepolia
          </a>
        </div>
        <div className="flex items-center justify-center gap-3">
          <FaUser className="text-green-400" />
          <span className="text-gray-400 text-xs">Developer: Gabriel Eguiguren P.</span>
          <a
            href="https://www.linkedin.com/in/gabrieleguiguren/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/gaboegui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  )
}