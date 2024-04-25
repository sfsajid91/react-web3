import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import InstallWallet from '@/components/wallet/InstallWallet';
import WalletDialog from '@/components/wallet/WalletDialog';
import useWallet from '@/hooks/useWallet';
import { formatAddress } from '@/utils/formatAddress';
import { useState } from 'react';

export default function NavBar() {
    const { address, isConnected } = useAppSelector((state) => state.web3);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<
        'installWallet' | 'disconnectWallet'
    >('installWallet');

    const { walletConnect } = useWallet();

    const handleConnect = async () => {
        if (!window.ethereum) {
            setDialogType('installWallet');
            return setDialogOpen(true);
        }

        if (isConnected) {
            setDialogType('disconnectWallet');
            return setDialogOpen(true);
        }

        await walletConnect();
    };

    return (
        <nav className="flex items-center justify-between bg-white px-8 py-4 shadow md:px-20">
            <h4 className="text-xl font-bold uppercase text-gray-700">LOGO</h4>

            <Button onClick={handleConnect} className="rounded-full">
                {isConnected ? formatAddress(address) : 'Connect Wallet'}
            </Button>

            {dialogType === 'installWallet' && (
                <InstallWallet open={dialogOpen} setOpen={setDialogOpen} />
            )}

            {dialogType === 'disconnectWallet' && (
                <WalletDialog open={dialogOpen} setOpen={setDialogOpen} />
            )}
        </nav>
    );
}
