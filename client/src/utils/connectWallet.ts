import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

export const connectWallet = async () => {
    if (window?.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        await signer.signMessage('Login to dApp');
        const address = await signer.getAddress();
        // get chainId to check if it's the correct network
        const { chainId, name } = await provider.getNetwork();
        console.log('chainId:', chainId, 'name:', name);
        return { signer, address, provider };
    } else {
        toast.error('Please install MetaMask to use this dApp');
        return null;
    }
};
