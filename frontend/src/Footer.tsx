import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { ButtonGroup } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'

let linkStyle = {
	display: 'flex',
	alignItems: 'center',
	color: 'white',
}

export default function Footer() {
	return (
		<Container
			fluid
			style={{
				height: 250,
				background: '#002333',
				color: 'white',
				padding: 0,
				paddingTop: 60,
			}}
		>
			<Row
				style={{
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: '8%',
					paddingBottom: '2%',
				}}
			>
				<Col className="d-inline-flex">
					<ul
						style={{
							marginBottom: 0,
						}}
					>
						<li>
							<Nav.Link
								to="/aboutus"
								end
								as={NavLink}
								style={linkStyle}
							>
								About us
							</Nav.Link>
						</li>
						<li>
							<Nav.Link
								to="/contactus"
								end
								as={NavLink}
								style={linkStyle}
							>
								Contact us
							</Nav.Link>
						</li>
						<li>
							<Nav.Link
								to="/teachonmeshare"
								end
								as={NavLink}
								style={linkStyle}
							>
								Teach on meShare
							</Nav.Link>
						</li>
					</ul>
				</Col>
				<Col>
					<ul
						style={{
							marginBottom: 0,
						}}
					>
						<li>
							<Nav.Link
								to="/teamplans"
								end
								as={NavLink}
								style={linkStyle}
							>
								Team plans
							</Nav.Link>
						</li>
						<li>
							<Nav.Link
								to="/freecourse"
								end
								as={NavLink}
								style={linkStyle}
							>
								Free course
							</Nav.Link>
						</li>
					</ul>
				</Col>
				<Col>
					<DropdownButton
						as={ButtonGroup}
						title="English"
						variant="light"
						style={{
							width: '40%',
						}}
					>
						<Dropdown.Item eventKey="1">Vietnamese</Dropdown.Item>
						<Dropdown.Item eventKey="2">France</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
			<Row id="rectangle"></Row>
			<Row
				style={{
					marginTop: '1%',
					marginLeft: '5%',
				}}
			>
				<Col xs={2}>Messafe, Inc, 2023</Col>
				<Col xs={1}>
					<Nav.Link
						to="/help"
						end
						as={NavLink}
						style={{ marginRight: '3%' }}
					>
						Help
					</Nav.Link>
				</Col>
				<Col xs={1}>
					<Nav.Link
						to="/privacy"
						end
						as={NavLink}
						style={{ marginRight: '3%' }}
					>
						Privacy
					</Nav.Link>
				</Col>
				<Col xs={5}>
					<Nav.Link
						to="/terms"
						end
						as={NavLink}
						style={{ marginRight: '3%' }}
					>
						Terms
					</Nav.Link>
				</Col>
				<Col xs={1}>
					<Nav.Link to="/facebook" end as={NavLink}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="26"
							height="26"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
						</svg>
					</Nav.Link>
				</Col>
				<Col xs={1}>
					<Nav.Link
						to="/"
						end
						as={NavLink}
						style={{height:30}}
					>
						<img src='logo2.svg' className='h-100'></img>
					</Nav.Link>
				</Col>
			</Row>
		</Container>
	)
}
