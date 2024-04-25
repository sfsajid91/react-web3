import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type DialogProps = {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
};

export default function InstallWallet({ open, setOpen }: DialogProps) {
    const handleDialog = (isOpen: boolean) => setOpen(isOpen);

    return (
        <Dialog onOpenChange={handleDialog} open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Install Metamask
                    </DialogTitle>
                    <DialogDescription>
                        To use this application, you need to install Metamask
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <img
                        src="/MetaMask_Fox.png"
                        alt=""
                        className="w-2/3 mx-auto mt-1"
                    />
                </div>
                <DialogFooter className="sm:items-center md:justify-center">
                    <Button asChild>
                        <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Install
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
