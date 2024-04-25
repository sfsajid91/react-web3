import { type Eip1193Provider, type Provider } from 'ethers';
// import ethereum type from ethers

declare global {
    interface Window {
        ethereum: Eip1193Provider & Provider;
    }
}
