// Added by Alvin: Reusable contract loader for cleaner blockchain interaction

import Web3 from "web3";
import EventContract from "../abis/Event.json";

export const loadEventContract = async () => {
  // Connect to MetaMask provider
  const web3 = new Web3(window.ethereum);

  // Get network ID (e.g., 5777 for Ganache, 11155111 for Sepolia)
  const networkId = await web3.eth.net.getId();

  // Get deployed contract info
  const deployedNetwork = EventContract.networks[networkId];

  if (!deployedNetwork) {
    throw new Error("Event contract not deployed on this network");
  }

  // Create contract instance
  const contract = new web3.eth.Contract(
    EventContract.abi,
    deployedNetwork.address
  );

  return contract;
};
