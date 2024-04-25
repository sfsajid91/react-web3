import { useAppSelector } from '@/app/hooks';
import useWallet from '@/hooks/useWallet';
import { useEffect, useState } from 'react';

import type { TX } from '@/types/transactions';
import Transaction from './Transaction';
import TransactionSkeleton from './TransactionSkeleton';

export default function Transactions() {
    const [transactions, setTransactions] = useState<TX[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { address } = useAppSelector((state) => state.web3);
    const { transactionContract } = useWallet();

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!transactionContract) return;
            try {
                setLoading(true);
                setError(null);
                const txs = await transactionContract.getAllTransactions();

                const filteredTxs = txs.filter(
                    (tx) => tx.sender === address || tx.receiver === address,
                );

                const parsedTxs = filteredTxs
                    .map((tx) => {
                        return {
                            sender: tx.sender,
                            amount: tx.amount.toString(),
                            timestamp: tx.timestamp,
                            message: tx.message,
                            keyword: tx.keyword,
                            receiver: tx.receiver,
                        };
                    })
                    .reverse()
                    .slice(0, 4);

                const TransferEvent = transactionContract.getEvent('Transfer');

                transactionContract.on(
                    TransferEvent,
                    (sender, receiver, amount, message, timestamp, keyword) => {
                        if (sender !== address && receiver !== address) return;
                        setTransactions((prev) => {
                            return [
                                {
                                    sender,
                                    receiver,
                                    amount: amount.toString(),
                                    message,
                                    keyword,
                                    timestamp,
                                },
                                ...prev.slice(0, 3),
                            ];
                        });
                    },
                );
                setTransactions(parsedTxs);
            } catch (error) {
                setError('Something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();

        // cleanup
        return () => {
            if (transactionContract) {
                transactionContract.removeAllListeners();
            }
        };
    }, [address, transactionContract]);

    return (
        <section className="space-y-4 py-4">
            <h3 className="text-center text-2xl font-semibold">
                Your Recent Transactions
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
                {loading && (
                    <>
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                    </>
                )}

                {!loading &&
                    transactions.map((transaction) => {
                        return (
                            <Transaction
                                key={transaction.timestamp}
                                {...transaction}
                            />
                        );
                    })}

                {error && <p className="text-center text-red-500">{error}</p>}
            </div>
        </section>
    );
}
