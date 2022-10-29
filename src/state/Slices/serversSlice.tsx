import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosHelper';
import Server from '../../types/Server';
import Status from '../../enums/statusEnum';

interface ServersState {
	servers: Server[];
	status: Status;
	error: string;
}

const initialState: ServersState = {
	servers: [],
	status: Status.IDLE,
	error: '',
};

export const serversSlice = createSlice({
	name: 'servers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getServers.pending, (state, action) => {
				if (action.payload) {
					state.status = Status.LOADING;
					state.error = '';
				}
			})
			.addCase(getServers.fulfilled, (state, action) => {
				if (action.payload) {
					state.servers = action.payload;
					state.status = Status.COMPLETED;
				}
			})
			.addCase(getServers.rejected, (state, action) => {
				state.status = Status.FAILED;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				} else {
					state.error = 'Something went wrong...';
				}
			});
	},
});

export const getServers = createAsyncThunk('servers/getServers', async (data, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;

	try {
		const { data } = await axios.get<Server[]>('/servers');

		const servers = data.sort((a, b) => {
			if (a.distance === b.distance) {
				if (a.name < b.name) {
					return -1;
				}

				if (a.name > b.name) {
					return 1;
				}

				return 0;
			}

			return a.distance - b.distance;
		});

		return servers;
	} catch (error: any) {
		if (error && error.response) {
			const { data } = error.response;
			return rejectWithValue(data);
		}
	}
});

export default serversSlice.reducer;
