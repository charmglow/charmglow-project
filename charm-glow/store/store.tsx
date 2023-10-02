import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './action/auth/authSlice';
import logger from 'redux-logger'
import thunk from 'redux-thunk'; // Import Redux Thunk
import coounterSlice from './action/counter/coounterSlice';
import { persistStore } from 'redux-persist';


const store = configureStore({
    reducer: {
        auth: authSlice,
        counter: coounterSlice
        // Add other reducers if you have more slices
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, logger), // Add the logger middleware to the middleware array

})

// Create a persisted store
const persistor = persistStore(store);

export { store, persistor };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch