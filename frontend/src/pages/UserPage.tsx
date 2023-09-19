import { Outlet } from 'react-router-dom'
import SideBar from '../components/conversation/SideBar'
import Navbar from '../Navbar'


export default function UserPage() {
	return (
		<div 
			className='vh-100 d-flex flex-column'
		>
			<Navbar />
			<div
				className="container-fluid d-flex flex-row justify-content-between p-0"
				style={{ flex: 1, overflowY:'auto', overflowX: 'hidden'}}
			>
				<SideBar/>
				<Outlet />
			</div>
		</div>
	)
}
