import { useAppDispatch } from '@/app/hooks';
import { CHAIN_ID, CONTRACT_ADDRESS } from '@/constants';
import { connectWallet, disconnectWallet } from '@/features/web3/web3Slice';
import WalletError from '@/utils/WalletError';
import type { Provider, Signer } from 'ethers';
import { BrowserProvider, formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { Transactions } from '../../../smart_contract/typechain-types/Transactions.ts';
import { Transactions__factory } from '../../../smart_contract/typechain-types/factories/Transactions__factory.ts';

const useWallet = () => {
    const [provider, setProvider] = useState<Provider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [loading, setLoading] = useState(true);
    const [transactionContract, setContract] = useState<Transactions | null>(
        null,
    );

    const dispatch = useAppDispatch();

    const requestAccountAccess = async () => {
        try {
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        } catch (_error) {
            throw new WalletError('User denied account access');
        }
    };

    const switchToNetwork = async (chainId: string) => {
        try {
            const hexChainId = parseInt(chainId).toString(16);

            // Add 0x prefix
            const formattedChainId = `0x${hexChainId}`;

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: formattedChainId }],
            });
        } catch (error) {
            throw new WalletError('Failed to switch network');
        }
    };

    const walletConnect = async (hasAccountAccess = false) => {
        if (provider) return null;

        try {
            if (!window.ethereum) {
                throw new WalletError('No wallet found');
            }

            // Request account access if not already granted
            if (!hasAccountAccess) {
                await requestAccountAccess();
            }

            const ethProvider = new BrowserProvider(window.ethereum);
            setProvider(ethProvider);
            const network = await ethProvider.getNetwork();
            if (network.chainId.toString() !== CHAIN_ID) {
                await switchToNetwork(CHAIN_ID);
            }
            const signer = await ethProvider.getSigner();
            setSigner(signer);

            const address = await signer.getAddress();
            const ethBalance = await ethProvider.getBalance(address);
            const balance = Number(formatEther(ethBalance)).toFixed(2);
            const contract = Transactions__factory.connect(
                CONTRACT_ADDRESS,
                signer,
            );

            setContract(contract);

            const walletData = JSON.stringify({ hasAccountAccess: true });
            localStorage.setItem('walletData', walletData);

            dispatch(
                connectWallet({
                    address,
                    balance,
                }),
            );
        } catch (error) {
            if (error instanceof WalletError) {
                toast.error(error.message);
            } else {
                toast.error('Failed to connect wallet');
            }
            localStorage.removeItem('walletData');
        }
    };

    const logoutWallet = () => {
        localStorage.removeItem('walletData');
        dispatch(disconnectWallet());
    };

    useEffect(() => {
        if (!window.ethereum) {
            return;
        }

        const walletData = localStorage.getItem('walletData');

        const main = async () => {
            setLoading(true);
            try {
                if (walletData) {
                    const { hasAccountAccess } = JSON.parse(walletData);

                    await walletConnect(hasAccountAccess);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        main();

        window.ethereum.on('chainChanged', async (chainId) => {
            try {
                if (parseInt(chainId).toString() !== CHAIN_ID) {
                    // await switchToNetwork(CHAIN_ID);
                    logoutWallet();
                    await walletConnect();
                }
            } catch (error) {
                console.error(error);
            }
        });

        return () => {
            if (provider) {
                provider.removeAllListeners();
            }

            window.ethereum.removeAllListeners();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        provider,
        signer,
        walletConnect,
        logoutWallet,
        switchToNetwork,
        loading,
        transactionContract,
    };
};

export default useWallet;
