import { Outlet, Route, Routes, useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import SideBar from '../components/conversation/SideBar'
import Navbar from '../Navbar'


export default function UserPage() {
	const account = useAppSelector((state) => state.user.account)
	const user_uuid = account?.uuid
	return (
		<div className='vh-100 d-flex flex-column'>
			<Navbar />
			<div
				className="container-fluid d-flex flex-row justify-content-between p-0"
				style={{ flex: 1 }}
			>
				<SideBar/>
				<Outlet />
			</div>
		</div>
	)
}
