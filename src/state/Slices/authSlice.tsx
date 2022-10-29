import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import axios from '../../helpers/axiosHelper';
import Status from '../../enums/statusEnum';

interface AuthState {
	token: string;
	status: Status;
	error: string;
}

const initialState: AuthState = {
	token: localStorage.getItem('TOKEN') || '',
	status: Status.IDLE,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.token = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.status = Status.LOADING;
				state.error = '';
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.status = Status.COMPLETED;
				state.error = '';
				if (action.payload) {
					state.token = action.payload;
				}
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.status = Status.FAILED;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				} else {
					state.error = 'Something went wrong...';
				}
			});
	},
});

interface userLoginProps {
	username: string;
	password: string;
	navigate: NavigateFunction;
}

export const userLogin = createAsyncThunk(
	'auth/userLogin',
	async ({ username, password, navigate }: userLoginProps, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;

		try {
			const {
				data: { token },
			} = await axios.post<{ token: string }>('/user/login', {
				username,
				password,
			});
			localStorage.setItem('TOKEN', token);
			navigate('/');
			return token;
		} catch (error: any) {
			if (error && error.response) {
				const { data } = error.response;
				return rejectWithValue(data);
			}
		}
	}
);

export const { logout, addError } = authSlice.actions;

export default authSlice.reducer;
