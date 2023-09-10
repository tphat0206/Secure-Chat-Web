import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Account, User } from '../../constants/types'

const initialState: any = {
	group: undefined
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		setGroup: (state, action: PayloadAction<string>) => {
			state.group = action.payload
		},
        removeGroup: (state) => {
            state.group = undefined
        },
	},
})

export const { setGroup, removeGroup} = chatSlice.actions
export default chatSlice.reducer
