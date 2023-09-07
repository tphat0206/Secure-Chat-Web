import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'

let styleButton = {
	marginBottom: 10,
	width: '100%',
	borderRadius: 20,
}

export default function SignInSocialAccount() {
	return (
		<Container>
			<Nav.Link
				to="/forgetpassword"
				end
				as={NavLink}
				style={{
					fontSize: 14,
					marginBottom: 20,
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				I forgot my password. Click here to reset
			</Nav.Link>
			<Button style={styleButton}>Continue with Facebook</Button>
			<Button style={styleButton}>Continue with Google</Button>
		</Container>
	)
}
