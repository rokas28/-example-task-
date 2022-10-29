import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import serversReducer from './Slices/serversSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		servers: serversReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
