import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Account, User } from '../../constants/types'

const initialState: User = {
	token: undefined,
	account: undefined,
}

export const userSlice = createSlice({
	name: 'account',
	initialState: initialState,
	reducers: {
		setAccount: (state, action: PayloadAction<Account>) => {
			state.account = action.payload
		},
		removeAccount: (state) => {
			state.account = undefined
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
		removeToken: (state) => {
			state.token = undefined
		},
	},
})

export const { setAccount, removeAccount, setToken, removeToken } =
	userSlice.actions
export default userSlice.reducer
