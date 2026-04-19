import { createConfig, http } from "wagmi";
import { avalanche } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

export const wagmiConfig = createConfig({
  chains: [avalanche],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [avalanche.id]: http(),
  },
});