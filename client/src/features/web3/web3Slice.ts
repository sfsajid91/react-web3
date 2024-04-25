import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Web3State = {
    address: string;
    isConnected: boolean;
    loading: boolean;
    balance?: string;
};

const initialState: Web3State = {
    address: '',
    isConnected: false,
    loading: true,
    balance: '0.00',
};

type ConnectWalletPayload = {
    address: string;
    balance: string;
};

const webSlice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        connectWallet: (state, action: PayloadAction<ConnectWalletPayload>) => {
            state.address = action.payload.address;
            state.balance = action.payload.balance;
            state.isConnected = true;
            state.loading = false;
        },

        disconnectWallet: (state) => {
            state.balance = '0.00';
            state.address = '';
            state.isConnected = false;
        },

        setBalance: (state, action: PayloadAction<string>) => {
            state.balance = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { connectWallet, disconnectWallet, setLoading, setBalance } =
    webSlice.actions;

export default webSlice.reducer;
