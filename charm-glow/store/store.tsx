import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './action/auth/authSlice';
import logger from 'redux-logger'
import thunk from 'redux-thunk'; // Import Redux Thunk
import coounterSlice from './action/counter/coounterSlice';
import { persistStore } from 'redux-persist';

import productsSlice from './action/products/productsSlice';
import customersSlice from './action/customers/customersSlice';
import dashboardSlice from './action/dashboard/dashboardSlice';
import homeSlice from './action/home/homeSlice';
import orderSlice from './action/order/orderSlice';
import adminOrderSlice from './action/order/adminOrderSlice';
const store = configureStore({
    reducer: {
        auth: authSlice,
        counter: coounterSlice,
        products: productsSlice,
        customers: customersSlice,
        dashboardAdmin: dashboardSlice,
        home: homeSlice,
        orders: orderSlice,
        adminorders: adminOrderSlice,
        // Add other reducers if you have more slices
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            // }).concat(thunk, logger), // Add the logger middleware to the middleware array
        }).concat(thunk),
})

// Create a persisted store
const persistor = persistStore(store);

export { store, persistor };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch