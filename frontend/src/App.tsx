import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import client from './client/axios'
import APIS from './constants/api'
import LOCAL_STORAGE_KEYS from './constants/local_storage'
import { Account } from './constants/types'
import { useAppDispatch, useAppSelector } from './redux/store'
import { setToken, setAccount, removeToken } from './redux/user/slice'
import { ConversationPage, HomePage, NotFoundPage, SignInPage, SignUpPage } from './pages'
import UserPage from './pages/UserPage'
import BoxChat from './components/conversation/ChatBox'

function AuthenticatedApp() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route element={<UserPage/>}>
				<Route path="/conversation/:conversation_id" element={<BoxChat/>} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

function UnAuthenticatedApp() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="signin" element={<SignInPage />} />
			<Route path="signup" element={<SignUpPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

function App() {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.user)
	const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY)

	useEffect(() => {
		if (user.account || !token) return
		client
			.get<Account>(APIS.GET_ACCOUNT, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((response:any) => {
				dispatch(setToken(token))
				dispatch(setAccount(response.data))
				client.defaults.headers.common.Authorization = `Token ${token}`
			})
			.catch(() => {
				dispatch(removeToken())
			})
	}, [user.token])

	return user.account ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

export default App
