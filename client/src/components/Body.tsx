import { useAppSelector } from '@/app/hooks';
import MessageForm from '@/components/MessageForm';
import Transactions from '@/components/transaction/Transactions';
import useWallet from '@/hooks/useWallet';
import { motion } from 'framer-motion';

export default function Body() {
    const { loading } = useWallet();
    const { isConnected } = useAppSelector((state) => state.web3);

    if (loading) {
        return (
            <main className="flex h-[calc(100dvh-10rem)] items-center justify-center">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main className="overflow-hidden px-8 py-4 md:px-20">
            {isConnected && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-2 text-wrap"
                    >
                        <MessageForm />
                    </motion.div>
                    <Transactions />
                </>
            )}

            {!isConnected && (
                <motion.h4
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Please connect your wallet to use this dApp
                </motion.h4>
            )}
        </main>
    );
}
