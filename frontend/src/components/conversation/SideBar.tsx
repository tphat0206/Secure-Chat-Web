import { Button, Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
	return (
			<div className="col col-sm-3 bg-sidebar border-end border-4">
				<Container>
					<Row className='justify-content-between my-3'>
						<Col>
						<h2>Chats</h2>
						</Col>
						<Col>
						<Button>
							New conversation
						</Button>
						</Col>
						</Row>
				</Container>
				
			</div>
	)
}
