import ContractABI from '@/utils/TransactionsAbi.json';

export const CONTRACT_ABI = ContractABI;
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;
export const CHAIN_ID = (import.meta.env.VITE_CHAIN_ID as string) || '1';
export const EXPLORER_URL = import.meta.env.VITE_EXPLORER_URL as string;
export const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY as string;
