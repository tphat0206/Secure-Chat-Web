import { Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import LOCAL_STORAGE_KEYS from '../../constants/local_storage'
import { removeAccount, removeToken } from '../../redux/user/slice'
let linkStyle = {
	display: 'flex',
	alignItems: 'center',
	color: 'white',
}
export default function isLogin({ account, dispatch }: any) {
	const navigate = useNavigate()
	return (
        <>
        <style type="text/css">
				{`
            .btn-login {
			height:3em;
            color: white;
			text-align:left;
            }
            .btn-login:hover {
                color: yellow;
            }
    `}
			</style>
		<Nav>
			{account ? (
				<DropdownButton
					align={{ lg: 'end' }}
					title="Menu"
					id="dropdown-menu-align-responsive-1"
					variant="login"
				>
					<Dropdown.Item
						onClick={() => {
							localStorage.removeItem(
								LOCAL_STORAGE_KEYS.TOKEN_KEY
							)
							dispatch(removeToken())
							dispatch(removeAccount())
							navigate('/')
						}}
					>
						Log out
					</Dropdown.Item>
					<div className="dropdown-divider"></div>
					<Dropdown.Item onClick={() => navigate(`/user/profile`)}> Profile </Dropdown.Item>
				</DropdownButton>
			) : (
				<>
					<Nav.Link
						to="/signin"
						as={NavLink}
						style={linkStyle}
						className="d-flex align-items-center"
					>
						Login
					</Nav.Link>
					<Nav.Link
						to="/signup"
						as={NavLink}
						style={linkStyle}
						className="d-flex align-items-center"
					>
						Sign up
					</Nav.Link>
				</>
			)}
		</Nav>
        </>
	)
}
