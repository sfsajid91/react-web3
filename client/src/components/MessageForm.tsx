import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseEther } from 'ethers';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useWallet from '@/hooks/useWallet.tsx';
import WalletError from '@/utils/WalletError.ts';
import { useState } from 'react';

const formSchema = z.object({
    receiver: z.string().refine((value) => /^0x[a-fA-F0-9]{40}$/.test(value), {
        message: 'Invalid Ethereum address',
    }),
    amount: z.string().refine((value) => parseFloat(value) > 0, {
        message: 'Amount must be greater than 0',
    }),
    message: z.string().min(5, 'Message must be at least 5 characters'),
    keyword: z.string().min(3, 'Keyword must be at least 3 characters'),
});

export default function MessageForm() {
    const { address } = useAppSelector((state) => state.web3);
    const { signer, provider, transactionContract } = useWallet();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: '',
            message: '',
            keyword: '',
            amount: '0',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            if (!provider || !signer || !transactionContract) {
                throw new Error('No provider found');
            }
            const { receiver, amount, keyword, message } = values;
            const balance = await provider.getBalance(address);
            const parsedAmount = parseEther(amount);

            if (balance < parsedAmount) {
                throw new WalletError('Insufficient balance');
            }
            const sendAmount = await signer.sendTransaction({
                to: receiver,
                value: parsedAmount,
            });

            sendAmount.wait();

            const tx = await transactionContract.addToBlockchain(
                receiver,
                parsedAmount,
                message,
                keyword,
            );
            await tx.wait();

            form.reset();
        } catch (error) {
            const errorMessage =
                error instanceof WalletError
                    ? error.message
                    : 'Something went wrong';
            form.setError('amount', { message: errorMessage });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md space-y-4 p-6">
            <CardHeader>
                <CardTitle>Send Ethereum</CardTitle>
                <CardDescription>Send Ethereum with message.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="receiver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0x0123456789012345678901234567890123456789"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0.001"
                                            type="number"
                                            step={0.001}
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Hello Jhon"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Keyword</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="keyword (Gif)"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            loading={loading}
                            className="w-full"
                            type="submit"
                        >
                            Send Message
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
