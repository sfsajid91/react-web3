import { useAppSelector } from '@/app/hooks';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { EXPLORER_URL } from '@/constants';

import useWallet from '@/hooks/useWallet';
import { formatAddress } from '@/utils/formatAddress';
import { ClipboardIcon, LogOutIcon } from 'lucide-react';

type DialogProps = {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
};

export default function WalletDialog({ open, setOpen }: DialogProps) {
    const { address, balance } = useAppSelector((state) => state.web3);
    const handleDialog = (isOpen: boolean) => setOpen(isOpen);

    const { logoutWallet } = useWallet();

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
    };

    const viewEtherscan = () => {
        const explorer = EXPLORER_URL || 'https://etherscan.io';
        window.open(`${explorer}/address/${address}`);
    };

    const handleLogout = () => {
        logoutWallet();
        setOpen(false);
    };

    return (
        <Dialog onOpenChange={handleDialog} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Account</DialogTitle>
                </DialogHeader>
                <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-800 to-blue-400 p-4">
                    <div className="z-20 flex w-fit items-center rounded-2xl bg-slate-800/80 px-2 py-1 text-sm text-white">
                        <img
                            src="/MetaMask_Fox.png"
                            alt="Metamask Logo"
                            className="mr-2 size-6"
                        />
                        <h4>{formatAddress(address)}</h4>
                    </div>

                    <div className="z-20">
                        <h6 className="text-sm text-gray-300">Balance</h6>
                        <h5 className="text-xl font-bold text-white">
                            {balance} $ETH
                        </h5>
                    </div>
                    <div className="z-20 flex gap-4 pb-4 pt-12">
                        <button
                            title="Copy Address"
                            className="rounded-full border p-2 text-white transition duration-300 hover:bg-slate-400/50"
                            onClick={copyAddress}
                        >
                            <ClipboardIcon className="text-2xl" />
                        </button>

                        <button
                            title="View on Etherscan"
                            className="rounded-full border p-2 text-white transition duration-300 hover:bg-slate-400/50"
                            onClick={viewEtherscan}
                        >
                            <img
                                src="/etherscan-logo.svg"
                                alt="Etherscan logo"
                                className="w-6"
                            />
                        </button>

                        <button
                            title="Logout"
                            className="ml-auto rounded-full border p-2 text-white transition duration-300 hover:bg-slate-400/50"
                            onClick={handleLogout}
                        >
                            <LogOutIcon className="text-2xl" />
                        </button>
                    </div>

                    <img
                        src="/ethereum-logo.svg"
                        className="absolute left-1/3 w-52 opacity-50"
                        alt="Ethereum Logo"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
