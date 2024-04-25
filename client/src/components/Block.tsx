import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function Block() {
    const [block, setBlock] = useState<number | null>(null);
    useEffect(() => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const fetchBlock = async () => {
            if (window?.ethereum) {
                const blockNumber = await provider.getBlockNumber();
                setBlock(blockNumber);
            }
        };

        const interval = setInterval(fetchBlock, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <h4 className="text-2xl">Current Block Number {block}</h4>
            </div>
        </>
    );
}
