import Body from '@/components/Body';
import NavBar from '@/components/NavBar';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App() {
    useEffect(() => {
        console.log(
            '%cHello, Do not paste anything here unless you know what you are doing.',
            'color: red; background: white; font-size: 16px; font-weight: bold;',
        );
    }, []);

    return (
        <>
            <NavBar />
            <Body />
            {/* <Block /> */}
            <Toaster position="bottom-center" />
            <div className="fixed bottom-2 right-4 z-20 w-20 ">
                <img src="/giphy.gif" alt="Giphy" className="rounded" />
            </div>
        </>
    );
}
