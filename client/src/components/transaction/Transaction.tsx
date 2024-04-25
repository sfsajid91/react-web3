import type { TX } from '@/types/transactions';

import { useAppSelector } from '@/app/hooks';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { EXPLORER_URL } from '@/constants';
import useFetch from '@/hooks/useFetch';
import { formatEther } from 'ethers';

import moment from 'moment';

export default function Transaction({
    timestamp,
    receiver,
    keyword,
    amount,
    message,
    sender,
}: TX) {
    const { address } = useAppSelector((state) => state.web3);
    const date = new Date(Number(timestamp) * 1000);
    const gifUrl = useFetch({ keyword });
    return (
        <Card className="max-w-72">
            <CardHeader className="p-2">
                <img
                    src={gifUrl}
                    alt={keyword}
                    className="h-auto min-h-72 w-full rounded-md object-cover shadow-lg 2xl:h-96"
                />
            </CardHeader>
            <CardContent className="text-sm">
                <p>
                    <span className="font-bold">Receiver:</span>{' '}
                    <a
                        href={`${EXPLORER_URL}/address/${receiver}`}
                        target="_blank"
                        className="break-all underline transition-colors duration-300 hover:text-blue-500"
                    >
                        {receiver === address ? 'You' : receiver}
                    </a>
                </p>

                <p>
                    <span className="font-bold">Sender:</span>{' '}
                    <a
                        href={`${EXPLORER_URL}/address/${sender}`}
                        target="_blank"
                        className="break-all underline transition-colors duration-300 hover:text-blue-500"
                    >
                        {sender === address ? 'You' : sender}
                    </a>
                </p>

                <p className="break-all">
                    <span className="font-bold">Amount:</span>{' '}
                    {formatEther(amount)} ETH
                </p>
                <p>
                    <span className="font-bold">Message:</span> {message}
                </p>
            </CardContent>
            <CardFooter className="text-sm">
                <Badge className="ml-auto">{moment(date).fromNow()}</Badge>
            </CardFooter>
        </Card>
    );
}
