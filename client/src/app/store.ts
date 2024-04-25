import web3Reducer from '@/features/web3/web3Slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        web3: web3Reducer,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
