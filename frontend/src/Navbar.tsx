import Container from 'react-bootstrap/Container'
import { Col, Navbar as NB, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from './redux/store'
import Login from './components/navbar/Login'
import Colors from './constants/color'

export default function Navbar() {
	const account = useAppSelector((state) => state.user.account)
	
	const dispatch = useAppDispatch()

	return (
		<NB
			className="navbar w-100"
			style={{
				backgroundColor: Colors.DarkBlue,
				height :80,
			}}
		>
			<Container className='h-100'>
				<Row className='h-100' style={{ width: '100%' }}>
					<Col className='h-100' style={{ display: 'flex', alignItems: 'center' }}>
						<NB.Brand className='h-100' style={{ color: 'white' }} href="/">
							<img src='/public/logo2.svg' className='h-100'></img>
						</NB.Brand>
					</Col>
					<Col
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						<Login account={account} dispatch={dispatch} ></Login>
					</Col>
	
				</Row>
			</Container>
		</NB>
	)
}
